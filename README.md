# EasyPrint

## Idea
- This product is meant to be used as an easy debugging tool for software developers, no matter the language they are programming in. The product will modify source code comments, add and remove specific print statements, and allow users to track the value of different variables throughout the code. This easy tool is meant to perform the menial/repetitive work and allow the software developer to maintain their thoughts on the functionality of their code. 

## Goals
- Create a connectable VSCode extension to assist in debugging code by:
    * Generating and adding print statements to code
    * Highlight and "debuggable" code to enhance user experience (UI)
    * Removing the added print statements
    * Tracking and printing changed variables in various control structures

## Repository Layout
- The repository mirrors our architecture, with our largest and most involved folder being the backend. In here, we have all relevant files for the backend controller (code modifier and code structure parser) and the print statement controller (response parser, prompt generator, and API controller). We also have a folder for UI related files (which will be closely involved with the VSCode extension itself).