"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const BackendController_1 = require("./BackendController");
const APIKEY = "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";
let activeEditor;
let decorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: 'purple'
});
let highlightMode = false;
const loadingSymbol = `
    <html>
    <head>
        <style>
            .spinner {
                border: 4px solid rgba(0, 0, 0, 0.1);
                border-radius: 50%;
                border-top: 4px solid #3498db;
                width: 20px;
                height: 20px;
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    </head>
    <body>
        <div class="spinner"></div>
    </body>
    </html>
`;
function highlightScope() {
    activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
        const editor_document = activeEditor.document;
        let backend = new BackendController_1.BackendController(editor_document.uri.fsPath, APIKEY);
        const position = activeEditor.selection.active;
        backend.onHover(position).then(response => {
            if (highlightMode) {
                activeEditor.setDecorations(decorationType, response);
            }
            else {
                activeEditor.setDecorations(decorationType, []);
            }
        });
    }
}
function activate(context) {
    console.log('Congratulations, your extension "easyprint" is now active!');
    let changeable = false;
    let keybindingHighlight = vscode.commands.registerCommand('easyprint.keybindingHighlight', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selected = editor.selection;
            const text = editor.document.getText(selected);
            const editor_document = editor.document;
            let backend = new BackendController_1.BackendController(editor_document.fileName, APIKEY);
            const startLine = selected.start;
            const endLine = selected.end;
            console.log(startLine);
            console.log(endLine);
            if (startLine.isBefore(endLine)) {
                changeable = true;
            }
            else {
                changeable = false;
            }
            const range = new vscode.Range(startLine, endLine);
            const edit = new vscode.WorkspaceEdit();
            if (changeable) {
                backend.onHighlight(text).then(response => {
                    edit.replace(editor.document.uri, range, response);
                    vscode.workspace.applyEdit(edit);
                    vscode.window.showInformationMessage(response);
                });
            }
            console.log("dummy dummy");
        }
    });
    vscode.window.onDidChangeTextEditorSelection(event => {
        if (highlightMode) {
            highlightScope();
        }
        else {
            changeable = false;
            console.log("Not entered!!!");
        }
    }, null, context.subscriptions);
    let keybindingHover = vscode.commands.registerCommand('easyprint.keybindingHover', () => {
        highlightMode = !highlightMode;
        highlightScope();
    });
    let keybindingCommentRequest = vscode.commands.registerCommand('easyprint.keybindingCommentRequest', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selected = editor.selection;
            const editor_document = editor.document;
            let backend = new BackendController_1.BackendController(editor_document.fileName, APIKEY);
            const start = selected.start;
            const end = selected.end;
            if (start.isBefore(end)) {
                const range = new vscode.Range(start, end);
                backend.onHighlightComment(editor_document.getText(selected)).then(response => {
                    const edit = new vscode.WorkspaceEdit();
                    edit.replace(editor.document.uri, range, response);
                    vscode.workspace.applyEdit(edit);
                    vscode.window.showInformationMessage("Selected code replaced with AI-generated comment");
                });
            }
        }
    });
    let keybindingDelete = vscode.commands.registerCommand('easyprint.keybindingDelete', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selected = editor.selection;
            const editor_document = editor.document;
            editor.edit(editBuilder => {
                let backend = new BackendController_1.BackendController(editor_document.fileName, APIKEY);
                let lineNumbers = backend.deleteComments();
                const start = selected.start.line;
                const end = selected.end.line;
                if (start === end) {
                    lineNumbers = lineNumbers;
                }
                else {
                    lineNumbers = lineNumbers.filter(lineNumber => lineNumber >= start && lineNumber <= end);
                }
                lineNumbers.sort((a, b) => b - a);
                lineNumbers.forEach(lineNumber => {
                    if (lineNumber < editor.document.lineCount) {
                        const line = editor.document.lineAt(lineNumber);
                        editBuilder.delete(line.rangeIncludingLineBreak);
                    }
                });
            }).then(success => {
                if (success) {
                    vscode.window.showInformationMessage('Lines deleted successfully.');
                }
                else {
                    vscode.window.showErrorMessage('Failed to delete lines.');
                }
            });
        }
    });
    context.subscriptions.push(keybindingHover);
    context.subscriptions.push(keybindingHighlight);
    context.subscriptions.push(keybindingCommentRequest);
    context.subscriptions.push(keybindingDelete);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map