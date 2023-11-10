const Parser = require('tree-sitter');
const JavaScript = require('tree-sitter-javascript');
import * as fs from 'fs';
import * as vscode from "vscode";

import { fileTypeDict } from "./FileType";

export interface FileParser {
    getScopeAtPosition(point: vscode.Position): number[];
    getCodeAtLines(start: number, end: number): string;
    getLastDescendant(node: any): any;
    getFileType(): string;
  }

class CodeParser implements FileParser {
  private tree: any; // The AST
  private sourceCode: string;
  private filePath: string;
  private fileType: string;

  constructor(filePath: string) {
    this.filePath = filePath
    this.fileType = this.getFileType();

    if (this.fileType == "Java"){
        const fileLanguage = require('tree-sitter-java');
    } else if (this.fileType == "Python"){
        const fileLanguage = require('tree-sitter-python');
    } else if (this.fileType == "JavaScript"){
        const fileLanguage = require('tree-sitter-javascript');
    }
    else if (this.fileType == "JavaScript"){
        const fileLanguage = require('tree-sitter-javascript');
    }


    const parser = new Parser();
    parser.setLanguage(JavaScript);
    this.sourceCode = fs.readFileSync(filePath, 'utf-8');
    this.tree = parser.parse(this.sourceCode);
  }

  getScopeAtPosition(point: vscode.Position): number[] {
    const line = this.getLineAtPosition(point);
    if (!line || /^\s*$/.test(line)) {
      return [];
    }

    const node = this.tree.rootNode.namedDescendantForPosition(point);
    console.log("node:" + node);

    const start = node.startPosition.row;

    // Get the last descendant of the node
    const lastNode = this.getLastDescendant(node);
    const end = lastNode.endPosition.row;

    return [start, end];
  }

  getCodeAtLines(start: number, end: number): string {
    const lines = this.sourceCode.split('\n');

    // Keep only lines within the range
    const scopedLines = lines.slice(start, end + 1);

    return scopedLines.join('\n');
  }

  getLastDescendant(node: any): any {
    if (node.childCount === 0) {
      return node;
    } else {
      // Get the last child of the node
      const lastChild = node.lastNamedChild;
      return this.getLastDescendant(lastChild);
    }
  }

  getLineAtPosition(point: any): string {
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
