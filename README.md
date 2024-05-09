# goToInclude
# JinjaDjangoNavigator 

A Visual Studio Code extension designed to streamline your development workflow when working with Jinja and Django templating engines. 


## Usage 

*Directly go to {% include "includes/this-template.html" %}*

Select whole line from `{` to `}` and either rightclick on `Go to included file` or use the keybinding `ctrl+alt+i`


## Customizing Shortcut

You can customize the shortcut for 'Go to Included File' by adding the following to your `keybindings.json` and replacing `ctrl+alt+i` with your preferred key combination:

```json
{
  "key": "ctrl+alt+i",
  "command": "extension.gotoInclude",
  "when": "editorTextFocus"
}


