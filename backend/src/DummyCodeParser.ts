import { fileTypeDict } from "./FileType";
import * as vscode from "vscode";
const Parser = require('web-tree-sitter');

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
		(async () => {
			await Parser.init();
			const parser = new Parser();
			// const absolute = path.join(context.extensionPath, 'tree-sitter-javascript.wasm')
			// const wasm = path.relative(process.cwd(), absolute)
			// const lang = await Parser.Language.load(wasm);
			
			const lang = await Parser.Language.load('Users/macha/easyprint/backend/tree-sitter-javascript.wasm')
			parser.setLanguage(lang);
			const tree = parser.parse('let z = 5;');
			console.log("syntax tree: ", tree.rootNode.toString());
		})();
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