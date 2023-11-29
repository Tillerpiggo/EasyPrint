# EasyPrint
- version v1.2
- Operational functions
   - Print generation of single variable - By highlighting the variable you wish to generate a print statement for and use the macro CTRL+ALT+H a print Statement will be added to your code for the variable.
   - Add comments to single line of code or large blocks of code - By highlighting the code and using the macro CTRL+ALT+E, comments will be added to your code.
   - Delete the added print statements - Easliy delete all of the added print statements by using the macro CTRL+ALT+D and all of the print statements will disappear.
   - Delete only some of the print statements you are no longer using- By highlight a block of code and using the macro CTRL+ALT+D and all of the print statements that were added in the highlight code will disappear.
## Idea
- This product is meant to be used as an easy debugging tool for software developers, no matter the language they are programming in. The product will modify source code comments and add and remove specific print statements. This easy tool is meant to perform the menial/repetitive work and allow the software developer to maintain their thoughts on the functionality of their code. 

## Goals
- Create a connectable VSCode extension to assist in debugging code by:
    * Generating and adding print statements to code
    * Highlight and "debuggable" code to enhance user experience (UI)
    * Removing the added print statements
    * Generating meaningful comments without having to write them all

## Repository Layout
- The repository mirrors our architecture, with our largest and most involved folder being the backend. In here, we have all relevant files for the backend controller (code modifier and code structure parser) and the print statement controller (response parser, prompt generator, and API controller). We also have a folder for UI related files (which will be closely involved with the VSCode extension itself).

## Set Up
 - First make sure npm is installed and up-to-date
 - Run "npm run compile"
 - Click fn+F5 (mac) or F5 (windows)
    - This will open a new window called the "Extension Development Host"
    - This is a new window of vscode that has the extension working
 - Highlight any piece of code and click cmd+shift+h (mac) or ctrl+alt+h (windows) to generate debugging print statements!
 - To delete the added statements click cmd+shift+d (mac) or ctrl+alt+d (windows) and the added statements will be deleted!
 - Need help commenting?  Highklight some code and click cmd+shift+e (mac) or ctrl+alt+e (windows) and meaningful comments will appear in your code!
