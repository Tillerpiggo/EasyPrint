# High Level Description

EasyPrint makes it very fast to add print statements to your code by highlighting your code and clicking a key command.


## How to Install the Software
Follow these steps to install the software on your computer:

### 1. Install Visual Studio Code (VSCode)

 - If you don't already have Visual Studio Code (VSCode) installed on your computer, you can download it from the official website:

 - **Download Link:** [Visual Studio Code](https://code.visualstudio.com/download)

 - Ensure you select the appropriate version for your operating system (Windows, macOS, or Linux) and follow the installation instructions for your platform.

### 2. Clone the Repository in VSCode

 - Once you have VSCode installed, open it.
 - Create a new window of VSCode and click "Clone Git Repository" 
 - In the repository URL, paste: https://github.com/Tillerpiggo/EasyPrint.git (assuming you were granted access)

### 3. Install Dependencies

 - Now that you have the repository cloned locally, you need to install its dependencies using npm. Open a terminal within the VSCode project :
    - Click on the "Terminal" menu at the top of the VSCode window.
    - Select "New Terminal" to open a terminal session.
    - Run "npm install" in the terminal (in project directory)

# How to Run the Software
### 1. Attach Your API Key (optional)
 - Navigate through to backend/src/extension.ts
 - On line #6 - paste in your OpenAI API key: let "const APIKEY=<yourUserAPIKEY>"

### 2. Run the Extension
 - First, ensure you have opened the project in the with the base folder of VSCode being 'EasyPrint':
     - To ensure this, you should be able to add a new terminal, run the command "ls", and see the files: "BugReports, UserManuel.md, package.json, etc."
     - If this is not what you see, reopen the project in VSCode so that this is the case - the following step will not work unless this is done properly
 - To run the extension, either:
    - 1. Hit 'fn + F5' on mac or 'F5' on windows buttons to start the extension
    - OR
    - 2. (Assuming you've ran the extension once) Click the "Run Extension" button in the bottom bar and press enter
- A new window pops up where you can use the extension to start debugging your code:
    - This is where you'll be able to use the software

# How to Use the Software
## Adding Print Statements ('cmd + shift + h' in Mac or 'ctrl + alt + h' in Windows)
- Highlight a single line where you want to add a print statement
- Hit 'cmd + shift + h' in Mac or 'ctrl + alt + h' in Windows to generate print statements which are then added to the code:
    - A print statement will be added with the tag "Added by EasyPrint"
## Removing Print Statements ('cmd+shift+d' in Mac or 'ctrl+alt+d' in Windows)
- To remove all print statements added by EasyPrint in a file:
    - Open the desired file
    - Click  'cmd+shift+d' in Mac or 'ctrl+alt+d' in Windows to delete all EasyPrint print statements
## Commenting ('cmd+shift+e' in Mac or 'ctrl+alt+e' in Windows)
- Highlight a single line you want to add a comment for
- Hit 'cmd+shift+e' in Mac or 'ctrl+alt+e' in Windows to add the comment for the single line

# How to Report a Bug
- To report a bug, use the "issues" tab in github
	@@ -32,5 +63,4 @@ Track specific variables using print statements after variable is changed
# Known Bugs / Pending Features
- Indentation: When adding print statements, the indentation is not proper. This may lead to errors in languages like python, etc. 
- CodeParser: Still working on getting the final version of CodeParser. The current version is able to get the first and last lines of a code block. We want to eventually return the codeblock plus a set of lines where the print statements are to be added.
- Adding comments is a feature that we are still currently working on. The current status includs: writing prompts to get the AI to generate appropriately for the concerned code block.
