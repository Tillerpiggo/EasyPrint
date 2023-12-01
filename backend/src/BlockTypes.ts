export const blockTypesDict: {[key: string]: [string, string, number[]]} = {
    "for_statement": ["loop", "block", [1, -1]], // block
    "while_statement": ["loop", "block", [1, -1]], // block
    "do_statement": ["loop", "block", [1, -1]], // block
    "if": ["if-else", "block", [1, -1]], // block
    "else": ["if-else", "block", [1, -1]], // block
    "class_declaration": ["class", "class_body", [1, -1]], // class_body
    "constructor_declaration": ["function", "constructor_body", [1, -1]], // constructor_body
    "method_declaration": ["function", "block", [1, -1]], // block
    "switch_expression": ["switch_statement", "switch_block", [1, -1]], // switch_block
    "switch_block_statement_group": ["switch_case", "switch_block_statement_group", [1, -1]], // switch_block_statement_group
    "expression_statement": ["single line", "expression_statement", [1, 0]], // expression_statement
    "break_statement": ["single line", "break_statement", [1, 0]], // break_statement
    "continue_statement": ["single line", "continue_statement", [1, 0]], // continue_statement
    "while": ["single line", "while", [0, -1]], // while, 
    "local_variable_declaration": ["single statement", "local_variable_declaration", [1, 0]], // local_variable_declaration
    "field_declaration": ["single statement", "field_declaration", [1, 0]], // field_declaration
}
