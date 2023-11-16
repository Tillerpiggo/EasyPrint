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
- ADD MORE 


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
