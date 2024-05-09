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
const path = __importStar(require("path"));
function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.gotoInclude', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage("No active editor");
            return;
        }
        const selection = editor.selection;
        const text = editor.document.getText(selection);
        if (!text) {
            vscode.window.showInformationMessage("No text selected");
            return;
        }
        const filePath = extractFilePath(text);
        if (!filePath) {
            vscode.window.showInformationMessage("No valid file path found");
            return;
        }
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showInformationMessage("No open workspace");
            return;
        }
        const fullFilePath = path.join(workspaceFolders[0].uri.fsPath, filePath);
        vscode.workspace.openTextDocument(fullFilePath)
            .then(doc => vscode.window.showTextDocument(doc), err => {
            vscode.window.showErrorMessage(`Failed to open file: ${fullFilePath}`);
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function extractFilePath(text) {
    const match = text.match(/"([^"]+)"/);
    return match ? match[1] : null;
}
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map