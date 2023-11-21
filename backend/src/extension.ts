// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { BackendController } from './BackendController';

const APIKEY= "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";
let activeEditor: any;
let decorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: 'purple'
});
let highlightMode = false;

function highlightScope() {
    activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
        const editor_document = activeEditor.document;
        let backend = new BackendController(editor_document.uri.fsPath, APIKEY);
        const position = activeEditor.selection.active;
        backend.onHover(position).then(response => {
            if (highlightMode) {
                activeEditor.setDecorations(decorationType, response);
            } else {
                activeEditor.setDecorations(decorationType, []);
            }
        });
    }
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "easyprint" is now active!');


	let keybindingHighlight = vscode.commands.registerCommand('easyprint.keybindingHighlight', async () => {
        const editor = vscode.window.activeTextEditor;
    
        if (editor) {
            const selected = editor.selection;
            // get line numbers of start and end of the selection
            let startLine = selected.start.line;
            let endLine = selected.end.line;
        
            // Create a new range that includes the entire lines
            let fullLineRange = new vscode.Range(
                startLine, 0,
                endLine, editor.document.lineAt(endLine).range.end.character
            );
        
            // Get the text of the entire lines
            let text = editor.document.getText(fullLineRange);
            // get the document that is open in the editor
            const editor_document = editor.document;
        
            // send the text to the backend controller
            let backend = new BackendController(editor_document.fileName, APIKEY)
        
            for await (const response of backend.onHighlight(text)) {
                const edit = new vscode.WorkspaceEdit();
        
                // Replace the full lines with the response
                edit.replace(editor.document.uri, fullLineRange, response)
                await vscode.workspace.applyEdit(edit)
        
                const responseLines = (response.match(/\n/g) || []).length;
                if (startLine + responseLines < editor.document.lineCount) {
                    // Update endLine to the end of the last line of the response
                    endLine = editor.document.lineAt(startLine + responseLines).range.end.line;
                }
        
                // Update the range
                fullLineRange = new vscode.Range(
                    startLine, 0,
                    endLine, editor.document.lineAt(endLine).range.end.character
                );
        
                vscode.window.showInformationMessage(response)
            };
        
            console.log("dummy dummy");
        }
    });

    vscode.window.onDidChangeTextEditorSelection(event => {
        if (highlightMode) {
            highlightScope();
        } else {
            console.log("Not entered!!!")
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
            const text = editor.document.getText(selected);
            const editor_document = editor.document;

            // Send request to backend with request for comment
            let backend = new BackendController(editor_document.fileName, APIKEY)
            const startLine = selected.start;
            const endLine = selected.end;

            const range = new vscode.Range(startLine, endLine);
            const edit = new vscode.WorkspaceEdit();
            backend.onHighlightComment(text).then(response => {
                edit.replace(editor.document.uri, range, response)
                vscode.workspace.applyEdit(edit)
                vscode.window.showInformationMessage(response)
            });
            console.log("reached");
        }
	});

    // let keybindingDelete = vscode.commands.registerCommand('easyprint.keybindingDelete', () => {


    // })

    context.subscriptions.push(keybindingHover);
    context.subscriptions.push(keybindingHighlight);
	context.subscriptions.push(keybindingCommentRequest);
}

// This method is called when your extension is deactivated
export function deactivate() {}
