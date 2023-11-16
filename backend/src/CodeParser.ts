import * as fs from 'fs';
import * as vscode from "vscode";
import * as path from 'path';
import { fileTypeDict } from "./FileType";
const Parser = require("web-tree-sitter");

interface Point {
  row: number;
  column: number;
}

export interface FileParser {
    fileType: string;
    initializeParserAndTree(): Promise<void>;
    setParserLanguage(): Promise<void>;
    getScopeAtPosition(point: vscode.Position): number[];
    printTree(node: any, depth: number): void,
    getLineRanges(targetLine: number): number[],
    getNodeAtLine(node: any, targetLine: number): any,
    getCodeAtLines(start: number, end: number): string;
    getLastDescendant(node: any): any;
    getFileType(): string;
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

  getScopeAtPosition(vs_point: vscode.Position): number[] {
    this.printTree(this.tree.rootNode, 0);
    const point = {
      row: vs_point.line,
      column: vs_point.character
    };
    const line = this.getLineAtPosition(point);
    if (!line || /^\s*$/.test(line)) {
      return [];
    }
    return this.getLineRanges(point.row);
  }

  printTree(node: any, depth: number): void {
    console.log(`${'  '.repeat(depth)}${node.type} : ${node.startPosition.row + 1}`);
  
    for (const childNode of node.children) {
      this.printTree(childNode, depth + 1);
    }
  }

  getLineRanges(targetLine: number): number[] {
    let node: any;
    if (this.fileType === "Python") {
      node = this.getNodeAtLine(this.tree.rootNode, targetLine + 1);
    } else {
     node = this.getNodeAtLine(this.tree.rootNode, targetLine);
    }
    if (!node) { 
      return [targetLine, targetLine];
    }
    const lastNode = this.getLastDescendant(node);
    const end = lastNode.endPosition.row;
    return [targetLine, end];
  }

  getNodeAtLine(node: any, targetLine: number): any {
    if (!node || node.startPosition.row > targetLine) {
      return null;
    }
    if (node.startPosition.row === targetLine && (node.type === this.blockName || node.type === "class_declaration")) {
      return node;
    }
    for (let i = 0, childCount = node.childCount; i < childCount; i++) {
      const ret_node = this.getNodeAtLine(node.child(i), targetLine);
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
}

export default CodeParser;
