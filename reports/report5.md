# Team Report

## Goals
- Develop more automated tests to add to our test suite
- Finish code parsers that creates groupings of code segments by conditionals and loops
- Make feature for removing print statements

## Progress
- Tests have been added to our test suite and they are all passing at this time
- Code parser has been developed and a file parser has been developed to determine which language is being used
- Created keybinding and started developing features to add meaningful comments to the code
- ADD MORE

## Plans
- Develop features to remove print statements
- Add more functionality to test and provide keybinding for delete

# Personal Reports

## Tyler Richardson

### Goals
- Continue to develop more automated tests to add to our test suite 
- Start adding features to generate print statements for loops and conditionals
- Create response parser that parser code out of response data from AI

### Progress
- Developed more automated tests for deterministic functions
- Developed the InputParser to check the copied code and determine which prompt is needed
- Started working on the response parser, but havve not been able to accomplish the task perfectly

### Plans
- Develop backend processes to remove the print statements
- Develop the data structure to store the print statements that we add in order to remove them if needed
  
## Macha Vidyaaranya
### Goals
- Finish the code parser to identify blocks and classify as loops, condition, single statement or variable tracking classes which forms the basis for generating the prompt
- Build automated tests for this feature and also for the feature for extracting a file's extension

### Progress
- Finished writing an initial version of codeparser that is able to take as input user action and highlight the lines where print statements are to be added

### Plans
- Finish the final version of codeparser.
- Write an output parser that is able to take the input from openAI API and modify the code on the VSCode UI.

## Tyler Gee

### Goals
- Refine prompts significantly (may require reshaping architecture)
- Finish Code Parser that creates groupings
- Help shape UI to accept/display code parser groupings
- Architect system for tracking, deleting, caching, and queuing print statements

### Progress
- Changed prompts to just generate print statements and to use gpt-3.5-turbo-1106 rather than text-davinci-003. Still needs refining but much better than before
- Worked with Macha to progress on Code Parser; got certain cases working
- Got highlighting UI to work using backend/code parser's highlighting

### Plans
- Architect system for tracking, deleting, caching, and queuing print statements
- Create refined prompts for different use cases
- Integrate API controller with stream to provide ChatGPT-like token-by-token interface


## Aishah Vakil

### Goals
- Add more UI functionality for more feedback loops on user side
- Fix commenting feature

### Progress
- Added prompts for commenting
- Set up commenting feature and added keybinding for it (not fully implemented on backend yet, just need to add comment syntax)
- Began working on loading, hovering highlight, and word by word appearance

### Plans
- Finish all UI stuff, loading, hovering, and word-by-word appearance and ensure
- Look more into VSCode extension documentation to make sure UI doesn't detract from user experience

## Akash Prasad

### Goals
- Work on highlighting groupings of text - such as multiple instances of the same variable
- Figure out some end-to-end way to create print statements for handling groupings
- Figure out how to remove print statements:
    - add "\\ Added by EasyPrint" to identify print statements
    - naively go through the file and remove those lines

### Progress 
- Created an on-hover function to highlight the current line the cursor is on
- Worked with Tyler and Macha to work end-to-end on the code parser sorting out the semantics of the file
- Changed AI to use gpt-turbo-3.5 to hopefully create better print statements

### Plans
- Figure out how to remove print statements:
    - add "\\ Added by EasyPrint" to identify print statements
    - naively go through the file and remove those lines
- Maybe help with token-by-token printing
- Perhaps adjust testing infrastructure with Tyler R
