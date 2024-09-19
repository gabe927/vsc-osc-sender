import * as vscode from 'vscode';
import * as osc from 'osc';

export function activate(context: vscode.ExtensionContext) {
    // Set up the OSC UDP port
    let udpPort = new osc.UDPPort({
        localAddress: "0.0.0.0",
        localPort: 57121, // local port, can be any available port
    });

    udpPort.open();

    // Function to send OSC messages
    const sendOSCMessage = () => {
        // Retrieve the latest user-defined settings
        const config = vscode.workspace.getConfiguration('oscSender');
        const remoteAddress = config.get<string>('remoteAddress') || '127.0.0.1';
        const remotePort = config.get<number>('remotePort') || 1266;

        // Use the `inspect` method to check the actual user-defined settings without merging defaults
        const messagesConfig = config.inspect<{ [key: string]: any[] }>('messages');
        const messages = messagesConfig?.workspaceValue || messagesConfig?.globalValue || {};

        udpPort.options.remoteAddress = remoteAddress;
        udpPort.options.remotePort = remotePort;

        // Check if messages exist
        if (messages && Object.keys(messages).length > 0) {
            // Iterate over the keys in the messages object
            for (const path in messages) {
                if (messages.hasOwnProperty(path)) {
                    const args = messages[path];  // Arguments for each OSC path

                    // Send OSC message
                    udpPort.send({
                        address: path,
                        args: args
                    });

                    // Provide feedback to the user
                    vscode.window.showInformationMessage(`OSC Message Sent to ${remoteAddress}:${remotePort} with path ${path} and args ${JSON.stringify(args)}`);
                }
            }
        } else {
            vscode.window.showWarningMessage('No OSC messages found in the configuration. Check your settings.json file!');
        }
    };

    // Register the command
    const disposable = vscode.commands.registerCommand('oscSender.sendOSC', sendOSCMessage);
    context.subscriptions.push(disposable);

    // Listen for configuration changes
    const configChangeDisposable = vscode.workspace.onDidChangeConfiguration((event) => {
        if (event.affectsConfiguration('oscSender')) {
            vscode.window.showInformationMessage('OSC Sender settings updated.');
        }
    });
    context.subscriptions.push(configChangeDisposable);
}

export function deactivate() {}
