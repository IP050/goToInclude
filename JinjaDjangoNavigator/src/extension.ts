import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
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

function extractFilePath(text: string): string | null {
  const match = text.match(/"([^"]+)"/);
  return match ? match[1] : null;
}

export function deactivate() {}
