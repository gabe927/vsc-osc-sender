# OSC Sender for VSCode

**OSC Sender** is a Visual Studio Code extension that allows you to send OSC (Open Sound Control) messages to remote devices directly from your editor. It's original purpose was to create a workflow for grandMA3 plugin developers, but it's not just limited to that! Any hardware/software that receives OSC can be controlled right from your editor!

## Features

- Send custom OSC messages to any IP address/hostname and port.
- Configure multiple OSC messages with custom paths and arguments.
- Trigger messages easily with a command or custom keyboard shortcut.

## Usage

1. Open the command palette (`Ctrl+Shift+P`).
2. Search for "Send OSC Message" and run the command.

### Keyboard Shortcuts

By default, the extension is bound to the keyboard shortcut `Ctrl+Alt+S`. You can modify this in your keybindings:

1. Open the **Keyboard Shortcuts** view (`Ctrl+K Ctrl+S`).
2. Search for `Send OSC Message`.
3. Change the keybinding to your preferred shortcut.

## Extension Settings

This extension contributes the following settings:

- `oscSender.remoteAddress`: IP address or hostname of the OSC destination (default: `127.0.0.1` aka localhost).
- `oscSender.remotePort`: Port of the OSC destination (default: `8080`).
- `oscSender.messages`: Define the OSC messages as key-value pairs, where the key is the OSC path and the value is an array of arguments.

#### Example `settings.json` Configuration:

```json
{
  "oscSender.remoteAddress": "192.168.1.100",
  "oscSender.remotePort": 8080,
  "oscSender.messages": {
    "/cmd1": ["argument1", "argument2"],
    "/cmd2": [123, true, 45.67]
  }
}
```