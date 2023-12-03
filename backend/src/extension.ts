// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { BackendController } from './BackendController';
import { InputParser } from './InputParser'
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
	let keybindingHighlight = vscode.commands.registerCommand('easyprint.keybindingHighlight', async () => {
        const editor = vscode.window.activeTextEditor;
        

        if (editor) {
            const inputParser = new InputParser()
            
            const selected = editor.selection;
            // get line numbers of start and end of the selection
            let startLine = selected.start.line;
            let endLine = selected.end.line;

            if (!selected.start.isBefore(selected.end)) {
                return;
            }
        
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
            const promptType = inputParser.determinePromptType(text)
            /*
            // send the text to the backend controller
            let backend = new BackendController(editor_document.fileName, APIKEY)
            const startLine = selected.start;
            const endLine = selected.end;
            
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
            */
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
            const editor_document = editor.document;
        
            // Send request to backend with request for comment
            let backend = new BackendController(editor_document.fileName, APIKEY)
            
            const start = selected.start;
            const end = selected.end;
            // Get the range of the selected text
            if (start.isBefore(end)){
            const range = new vscode.Range(start, end);
        
            backend.onHighlightComment(editor_document.getText(selected)).then(response => {
                //console.log(response);
        
                // Create a new edit to replace the selected text
                const edit = new vscode.WorkspaceEdit();
                edit.replace(editor.document.uri, range, response);
        
                // Apply the edit
                vscode.workspace.applyEdit(edit);
        
                // Optionally, display a message
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
