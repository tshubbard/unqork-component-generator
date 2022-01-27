import * as vscode from 'vscode';

import generateComponent from './gen'

function validateCompName(name: string) {
    if (!name) {
		return 'Component name cannot be empty'
	}
	if (!name.match(/^[A-Z]/)) {
        return 'Component name must start with a uppercase letter'
    }
    if (!name.match(/^[0-9a-zA-Z]+$/)) {
        return 'Component name cannot have non-alphanumeric characters'
    }
    return null;
}

export function activate(context: vscode.ExtensionContext, fsPath: string) {
	let disposable = vscode.commands.registerCommand('unqork-component-generator.createUnqorkComponent', genFiles);
	context.subscriptions.push(disposable)
}

const genFiles = ({ fsPath }) => {
	const compNameOptions = {
        prompt: `Your Unqork component will be created at ${fsPath}`,
        placeHolder: 'Enter Component Name',
        validateInput: validateCompName,
        ignoreFocusOut: true
    }
	const addFiles = [
		'Yes, Add CSS File',
		'No, Do not add CSS File'
	]
    const addFilesOptions = {
        canPickMany: false,
        placeHolder: 'Add CSS File?',
        ignoreFocusOut: true
    };

	vscode.window.showQuickPick(addFiles, addFilesOptions).then(addFileSelection => {
		vscode.window.showInputBox(compNameOptions).then(compName => {
			console.log('compName: ', compName)
			if (typeof compName === 'string') {
				const addCss = !!(addFileSelection && addFileSelection.substring(0, 3) === 'Yes')
				try {
					generateComponent({
						componentName: compName,
						fsPath,
						addCss
					})
				} catch (err) {
					vscode.window.showErrorMessage(`Could not create the component: ${err}`);
				}
			}
		})
	})

}
// this method is called when your extension is deactivated
export function deactivate() {}
