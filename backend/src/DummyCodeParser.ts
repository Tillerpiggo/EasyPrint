import { fileTypeDict } from "./FileType";
import * as vscode from "vscode";

export interface Point {
  row: number;
  col: number;
}

export interface FileParser {
  getScopeAtPosition(point: vscode.Position): number[];
  getCodeAtLines(start: number, end: number): string;
  getLastDescendant(node: any): any;
  getFileType(): string;
}

class DummyCodeParser implements FileParser {
  private code: string;

  constructor(code: string) {
    this.code = code;
  }

  // Get the smallest node that includes a given point
  getScopeAtPosition(point: any): number[] {
    // Always return the same code, regardless of the point
    return point.row;
  }

  // Get the code between two line numbers
  getCodeAtLines(start: number, end: number): string {
    // Always return the same code, regardless of the start and end
    return this.code;
  }

  // Get the "bottom-right-most" descendant of a given node
  getLastDescendant(node: any): any {
    // Always return the same code, regardless of the node
    return this.code;
  }

  // Get the file type from the extension
  getFileType(): string {
    const fileExtension = this.code.split('.').pop() ?? "";
    // Use the dictionary to determine the file type from extension
    return fileTypeDict[fileExtension] ?? "Unknown";
  }
}

export default DummyCodeParser