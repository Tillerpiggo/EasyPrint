interface Point {
    row: number;
    col: number;
}
export interface FileParser {
    getScopeAtPosition(point: Point): string;
    getCodeAtLines(start: number, end: number): string;
    getLastDescendant(node: any): any;
}
declare class DummyCodeParser implements FileParser {
    private code;
    constructor(code: string);
    getScopeAtPosition(point: any): string;
    getCodeAtLines(start: number, end: number): string;
    getLastDescendant(node: any): any;
}
export default DummyCodeParser;
