# 🌟 EasyPrint - Print. Easily.

**Current Version:** v1.4 Final Release 

EasyPrint is an innovative tool for software developers, streamlining the debugging process across various programming languages. This VSCode extension empowers developers by automating the generation and management of print statements, allowing them to focus on their code's functionality.

### 🚀 Features

#### Adding Print Statements
- **Single Line:** Quickly add print statements to any single line of code. ✅
- **Variable-Specific Debugging:** Generate print statements for specific variables to track their values. ❌
- **Branch Debugging:** Generate print statements for an "if-else" structure to track useful values. ✅
- **Loop Debugging:** Generate print statements for an loop structures to track useful values. ✅
  

#### Removing Print Statements
- **Bulk Removal:** Remove all EasyPrint-generated print statements in a file with ease. ✅
- **Related Instances:** Selectively remove instances of related EasyPrint statements. ✅

#### Adding Comments
- **Single Line Comments:** Easily add comments to single lines of code. ✅
- **Block Comments:** Attach comments to entire code blocks for better clarity. ✅

### 💡 Idea
Our goal is to create an easy-to-use debugging tool that generates useful print statments and comments instantly, letting developers concentrate on their code's core logic and functionality.

### 🎯 Goals
- **VSCode Integration:** Create a connectable extension to enhance the debugging experience.
- **User Interface:** Intuitive UI for highlighting and interacting with "debuggable" code.
- **Efficiency:** Quick addition/removal of print statements and tracking of variable changes.

### 🏗️ Repository Layout
- **Backend:** Contains code modifier, parser, and print statement controller.
- **UI Files:** Dedicated to the VSCode extension's user interface.

### 🛠️ Set Up
1. Ensure npm is installed and up-to-date: `npm install`
2. Compile the extension: `npm run compile`
3. Launch the Extension Development Host:
   - For Mac: Press `fn+F5`
   - For Windows: Press `F5`
4. Use `cmd+shift+h` (Mac) or `ctrl+alt+h` (Windows) to generate debugging print statements in the code.
