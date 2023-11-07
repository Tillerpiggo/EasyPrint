interface Point {
  row: number;
  col: number;
}

export interface FileParser {
  getScopeAtPosition(point: Point): string;
  getCodeAtLines(start: number, end: number): string;
  getLastDescendant(node: any): any;
}

class DummyCodeParser implements FileParser {
  private code: string;

  constructor(code: string) {
    this.code = code;
  }

  // Get the smallest node that includes a given point
  getScopeAtPosition(point: any): string {
    // Always return the same code, regardless of the point
    return this.code;
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
}

export default DummyCodeParser