import * as fs from 'fs';
import * as vscode from "vscode";
import * as path from 'path';
import { fileTypeDict } from "./FileType";
import { blockTypesDict } from './BlockTypes';
const Parser = require("web-tree-sitter");

interface Point {
  row: number;
  column: number;
}

export interface FileParser {
    fileType: string;
    initializeParserAndTree(): Promise<void>;
    setParserLanguage(): Promise<void>;
    getScopeAtPosition(point: vscode.Position): [string | null, string | null, number[], number[]];
    printTree(node: any, depth: number): void,
    getNodeAtLine(node: any, targetLine: number, blockTypes: {[key: string]: ([string, {[key: string]: null}, number[]] | null)}, isBlock: boolean): any,
    getCodeAtLines(start: number, end: number): string;
    getLastDescendant(node: any): any;
    getFileType(): string;
    findEasyPrintLines(): number[];
  }

class CodeParser implements FileParser {
  private filePath: string;
  private parser: any;
  private tree: any;
  private sourceCode: string;
  private lang: any;
  private blockName: string;

  public fileType: string;

  constructor(filePath: string) {
    this.filePath = filePath
    this.fileType = this.getFileType();
    this.sourceCode = ''
    if (this.fileType === "Python" || this.fileType === "Java") {
      this.blockName = "block";
    } else {
      this.blockName = "statement_block"
    }
  }

  async initializeParserAndTree() {
    this.sourceCode = fs.readFileSync(this.filePath, 'utf-8');
    await Parser.init();
    this.parser = new Parser();
    await this.setParserLanguage();
    this.tree = this.parser.parse(this.sourceCode);
  }

  async setParserLanguage() {
    let wasmFilePath: string = '';
    const wasmDir = path.join(__dirname, '..', 'Parsers');
    if (this.fileType == "Python") {
      wasmFilePath = path.join(wasmDir, 'tree-sitter-python.wasm');
    } else if (this.fileType == "JavaScript") {
      wasmFilePath = path.join(wasmDir, 'tree-sitter-javascript.wasm');
    } else if (this.fileType == "Java") {
      wasmFilePath = path.join(wasmDir, 'tree-sitter-java.wasm');
    } else if (this.fileType == "TypeScript") {
      wasmFilePath = path.join(wasmDir, 'tree-sitter-typescript.wasm');
    }
    this.lang = await Parser.Language.load(wasmFilePath);
    this.parser.setLanguage(this.lang);
  }

  getScopeAtPosition(vs_point: vscode.Position): [string | null, string | null, number[], number[]] {
    // this.printTree(this.tree.rootNode, 0); // use it for debugging by viewing the tree
    const point = {
      row: vs_point.line,
      column: vs_point.character
    };
    const line = this.getLineAtPosition(point);
    if (!line || /^\s*$/.test(line)) {
      return [null, null, [], []];
    }
    const targetLine = point.row;

    let node: any;
    // if (this.fileType === "Python") {
    //   node = this.getNodeAtLine(this.tree.rootNode, targetLine + 1);
    // } else {
    //  node = this.getNodeAtLine(this.tree.rootNode, targetLine);
    // }
    node = this.getNodeAtLine(this.tree.rootNode, targetLine, blockTypesDict, false);
    if (!node) { 
      return [null, null, [], []];
    }
    const [promptType, blockType, lineUpdates]: [string, {[key: string]: null}, number[]] = blockTypesDict[node.type];
    const blockNode = this.getNodeAtLine(node.parent, targetLine, blockType, true);
    const startLine = blockNode.startPosition.row;
    const lastNode = this.getLastDescendant(blockNode);
    const endLine = lastNode.endPosition.row;
    const code: string = this.getCodeAtLines(startLine, endLine); 
    return [promptType, code, [startLine, endLine], [startLine + lineUpdates[0], endLine + lineUpdates[1]]];
  }

  printTree(node: any, depth: number): void {
    console.log(`${'        '.repeat(depth)}${node.type} : ${node.startPosition.row + 1}`);
  
    for (const childNode of node.children) {
      this.printTree(childNode, depth + 1);
    }
  }

  getNodeAtLine(node: any, targetLine: number, blockTypes: {[key: string]: ([string, {[key: string]: null}, number[]] | null)}, isBlock: boolean): any {
    if (!node || (!isBlock && node.startPosition.row > targetLine)) {
        return null;
    }
    if (node.startPosition.row >= targetLine && node.type in blockTypes) {
      return node;
    }
    for (let i = 0, childCount = node.childCount; i < childCount; i++) {
      const ret_node = this.getNodeAtLine(node.child(i), targetLine, blockTypes, isBlock);
      if (ret_node) {
        return ret_node;
      }
    }
  }

  getCodeAtLines(start: number, end: number): string {
    const lines = this.sourceCode.split('\n');
    const scopedLines = lines.slice(start, end + 1);
    return scopedLines.join('\n');
  }

  getLastDescendant(node: any): any {
    if (node.childCount === 0) {
      return node;
    } else {
      const lastChild = node.lastChild;
      return this.getLastDescendant(lastChild);
    }
  }

  getLineAtPosition(point: Point): string {
    const lines = this.sourceCode.split('\n');
    if (point.row >= 0 && point.row < lines.length) {
      return lines[point.row];
    }
    return '';
  }
  
  // Get the file type from the extension
  getFileType(): string {
    const fileExtension = this.filePath.split('.').pop() ?? "";
    // Use the dictionary to determine the file type from extension
    return fileTypeDict[fileExtension] ?? "Unknown";
  }
  
  findEasyPrintLines(): number[] {
    this.sourceCode = fs.readFileSync(this.filePath, 'utf-8');
    const lineNumbers: number[] = [];
    let searchString = "Added by EasyPrint"
    this.sourceCode.split('\n').forEach((line, index) => {
      if (line.includes(searchString)) {
        lineNumbers.push(index); // +1 because line numbers are 1-based in VS Code
      }
    });
    console.log(lineNumbers)
    return lineNumbers; 
  }
}

export default CodeParser;
