# How to obtain the source code
## To obtain the source code from the repository, since this will be an open source project, simple clone the repository to vs code using the version control repository cloning instructions provided by Github, follow the instructions in the README.md to add your OpenAI API key (not currently functional, but will be on later releases), and you will be able to run the program in test mode using the F5 button on the keyboard. 
# The layout of your directory structure
## For the main functionality and utilizing the backend functions, this is contained to the BackendController.ts and the extension.ts files. Otherwise, backend functionality is modular, and files are named according to the function they perform.
# How to build the software
## From the terminal, run the command npm run compile to compile the program. If you would like to perform functional tests, run the software by pressing F5 and selecting run extension from the dropdown in the search bar at the top. This will open a new window and you are now using EasyPrint.
# How to test the software
## To test the software, simply run the command F5 to start the extension, this will test that the program compiles and that the extension runs, from there you can perform user testing. For function testing, go to the terminal and type npm test. This will follow the testing script that is in place and will run all of the tests that are in the backend/src/test/suite directory.
# How to add new tests
## To add new tests, you can add a new file to the backend/src/test/suite directory with the file type as testfile.test.ts. The .test.ts extension tells the onboard test suite that the file is a test file and that it needs to run the tests when the suite is running. All tests are tested using the Jest test suite and will follow the Jest syntax for test functions. 
# How to build a release of the software
## To build any release of the software, we will only have the capability of running the newest software out. Simply run the “npm run compile” command from the terminal and this will build the software at its current state.
