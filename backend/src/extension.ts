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

// HTML for the spinning/loading symbol
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

    let changeable = false
	let keybindingHighlight = vscode.commands.registerCommand('easyprint.keybindingHighlight', () => {
        const editor = vscode.window.activeTextEditor;
        

        if (editor) {
            const selected = editor.selection;
            // get text and store it in a variable
            const text = editor.document.getText(selected);
            // get the document that is open in the editor
            const editor_document = editor.document;

            // send the text to the backend controller
            let backend = new BackendController(editor_document.fileName, APIKEY)
            const startLine = selected.start;
            const endLine = selected.end;
            console.log(startLine)
            console.log(endLine)
            if (startLine.isBefore(endLine)){
                changeable = true
            }else{
                changeable = false
            }
            const range = new vscode.Range(startLine, endLine);
            const edit = new vscode.WorkspaceEdit();
            if(changeable){
            backend.onHighlight(text).then(response => {
                edit.replace(editor.document.uri, range, response)
                vscode.workspace.applyEdit(edit)
                vscode.window.showInformationMessage(response)
            });
        }
            console.log("dummy dummy");

            // const statement = text.split(/\s+/);
            // let i = 0;

            // function printTokenByToken() {
            //     if (i < statement.length) {
            //         edit.replace(editor.document.uri, range, statement[i]);
            //         i++;
            //         setTimeout(printTokenByToken, 500);
            //     } else {
            //         vscode.workspace.applyEdit(edit);
            //         vscode.window.showInformationMessage('printed word by word');
            //     }
            // }
            // printTokenByToken();

        }
    });

    vscode.window.onDidChangeTextEditorSelection(event => {
        if (highlightMode) {
            highlightScope();
        } else {
            changeable = false
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

    let keybindingDelete = vscode.commands.registerCommand('easyprint.keybindingDelete', () => {    
        const editor = vscode.window.activeTextEditor;

        if (editor) {

            const selected = editor.selection;
            const editor_document = editor.document;

            editor.edit(editBuilder => {
            // Sort line numbers in descending order to avoid issues with changing line indices
            let backend = new BackendController(editor_document.fileName, APIKEY);
            let lineNumbers = backend.deleteComments();
            const start = selected.start.line
            const end = selected.end.line
            if (start === end){
                lineNumbers = lineNumbers
            }else{
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
                } else {
                    vscode.window.showErrorMessage('Failed to delete lines.');
                }
            });
    }});

    context.subscriptions.push(keybindingHover);
    context.subscriptions.push(keybindingHighlight);
	context.subscriptions.push(keybindingCommentRequest);
    context.subscriptions.push(keybindingDelete);
}

// This method is called when your extension is deactivated
export function deactivate() {}
