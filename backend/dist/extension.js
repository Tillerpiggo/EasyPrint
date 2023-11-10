/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(__webpack_require__(1));
let activeEditor = vscode.window.activeTextEditor;
let decorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: 'purple'
});
let highlightMode = false;
function highlightCurrentLine() {
    if (!activeEditor) {
        return;
    }
    if (highlightMode) {
        const position = activeEditor.selection.active;
        const range = new vscode.Range(position.line, 0, position.line, activeEditor.document.lineAt(position.line).text.length);
        activeEditor.setDecorations(decorationType, [range]);
    }
    else {
        activeEditor.setDecorations(decorationType, []);
    }
}
function activate(context) {
    console.log('Congratulations, your extension "easyprint" is now active!');
    let disposable = vscode.commands.registerCommand('easyprint.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from easyprint!');
    });
    let keybinding = vscode.commands.registerCommand('easyprint.keybindingHover', () => {
        activeEditor = vscode.window.activeTextEditor;
        highlightMode = !highlightMode;
        highlightCurrentLine();
    });
    vscode.window.onDidChangeTextEditorSelection(event => {
        if (event.textEditor === activeEditor && highlightMode) {
            highlightCurrentLine();
        }
    }, null, context.subscriptions);
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
    context.subscriptions.push(disposable);
    context.subscriptions.push(keybinding);
    context.subscriptions.push(keybindingHighlight);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map