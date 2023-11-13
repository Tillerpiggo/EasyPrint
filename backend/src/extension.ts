// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { BackendController } from './BackendController';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "easyprint" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('easyprint.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the userk
		vscode.window.showInformationMessage('Hello World from easyprint!');
	});

	let keybinding = vscode.commands.registerCommand('easyprint.keybinding', () => {
		vscode.window.showInformationMessage("OMG This is a keybinding that's fire");
	});


	let keybindingHighlight = vscode.commands.registerCommand('easyprint.keybindingHighlight', () => {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const selected = editor.selection;
			// get text and store it in a variable
			const text = editor.document.getText(selected);

			// send the text to the backend controller
			const APIKEY= "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"
			let backend = new BackendController("filepath", APIKEY)
			backend.onHighlight(text).then(response => {
				vscode.window.showInformationMessage(response)
			});

			console.log("dummy dummy");
			


			const startLine = selected.start;
			const endLine = selected.end;

			const decorationType = vscode.window.createTextEditorDecorationType({
				backgroundColor: 'purple', 
			});

			const range = new vscode.Range(startLine, endLine);

			const decorations = [
				{ range, hoverMessage: 'highlighted section' },
			];

			editor.setDecorations(decorationType, decorations);
		}
	});

	// Splitting up Debugging vs. Commenting:
	// let keybindingComment = vscode.commands.registerCommand('easyprint.keybindingComment', () => {

	// });



	context.subscriptions.push(disposable);
	context.subscriptions.push(keybinding);
	context.subscriptions.push(keybindingHighlight);
}

// This method is called when your extension is deactivated
export function deactivate() {}
