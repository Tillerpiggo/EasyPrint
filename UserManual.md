# High Level Description

This product is meant to be used as an easy debugging tool for software developers, no matter the language they are programming in. The product will modify source code comments, add and remove specific print statements, and allow users to track the value of different variables throughout the code. This easy tool is meant to perform the menial/repetitive work and allow the software developer to maintain their thoughts on the functionality of their code. 

Note: Our current version requires to have an OpenAI API key in order to use the extension. The API key needs to pasted in the extension.ts file.

Major Features:
Generate and add print statements to code
Generate and add descriptive comments to code
Remove the added print statements
VSCode compatibility (as extension; can highlight code to add/remove)
Track specific variables using print statements after variable is changed

# How to Install the Software
- Clone the repository
- cd into the directory where you installed the respository
- run 'npm install' to install the dependencies

# How to Run the Software
- Open the extension.ts file and paste in your OpenAI's API key in the file.
- Hit 'fn + F5' buttons to start the extension
- A new window pops up where you can use the extension to start debugging your code

# How to Use the Software
- Go to the line where you want to add a print statement
- Hit 'cmd + shift + h' in Mac or 'ctrl + alt + h' to generate print statements which are then added to the code

# How to Report a Bug
- To report a bug, use the "issues" tab in github
- The format for reporting the bug is provided in: BugReports/bugReportFormat.md file.

# Known Bugs / Pending Features
- Indentation: When adding print statements, the indentation is not proper. This may lead to errors in languages like python, etc. 
- CodeParser: Still working on getting the final version of CodeParser. The current version is able to get the first and last lines of a code block. We want to eventually return the codeblock plus a set of lines where the print statements are to be added.
- Adding comments is a feature that we are still currently working on. The current status includs: writing prompts to get the AI to generate appropriately for the concerned code block.
- Deletion of code added by the tool is also something that we are currently working on.
