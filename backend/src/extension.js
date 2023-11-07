"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
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
    console.log("Wow ur at keybinding");
    let keybinding = vscode.commands.registerCommand('easyprint.keybinding', () => {
        vscode.window.showInformationMessage("OMG This is a keybinding that's fire");
    });
    context.subscriptions.push(disposable);
    context.subscriptions.push(keybinding);

    let keybindingHighlight = vscode.commands.registerCommand('easyprint.keybindingHighlight', () => {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const selected = editor.selection;
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

    context.subscriptions.push(keybindingHighlight);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map