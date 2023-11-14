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
    let keybindingHighlight = vscode.commands.registerCommand('easyprint.keybindingHighlight', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selected = editor.selection;
            const text = editor.document.getText(selected);
            const editor_document = editor.document;
            let backend = new BackendController_1.BackendController(editor_document.fileName, APIKEY);
            const startLine = selected.start;
            const endLine = selected.end;
            const range = new vscode.Range(startLine, endLine);
            const edit = new vscode.WorkspaceEdit();
            backend.onHighlight(text).then(response => {
                edit.replace(editor.document.uri, range, response);
                vscode.workspace.applyEdit(edit);
                vscode.window.showInformationMessage(response);
            });
            console.log("dummy dummy");
        }
    });
    vscode.window.onDidChangeTextEditorSelection(event => {
        console.log("highlight mode: ", highlightMode);
        if (highlightMode) {
            highlightScope();
        }
        else {
            console.log("Not entered!!!");
        }
    }, null, context.subscriptions);
    let keybindingHover = vscode.commands.registerCommand('easyprint.keybindingHover', () => {
        highlightMode = !highlightMode;
        highlightScope();
    });
    context.subscriptions.push(keybindingHover);
    context.subscriptions.push(keybindingHighlight);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map