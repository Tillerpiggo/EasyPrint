"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputParser = void 0;
var PromptType_1 = require("./PromptType");
var InputParser = /** @class */ (function () {
    function InputParser() {
    }
    InputParser.prototype.determinePromptType = function (input) {
        var conditionalKeywords = ['if', 'else if', 'else', 'switch', 'case'];
        var loopKeywords = ['for', 'while', 'do'];
        // Check if input contains both loops and conditionals
        if (loopKeywords.some(function (keyword) { return input.includes(keyword); }) && conditionalKeywords.some(function (keyword) { return input.includes(keyword); })) {
            return PromptType_1.PromptType.Combinational;
        }
        // Check if input contains loop keywords
        if (loopKeywords.some(function (keyword) { return input.includes(keyword); })) {
            return PromptType_1.PromptType.Loop;
        }
        // Check if input contains conditional keywords
        if (conditionalKeywords.some(function (keyword) { return input.includes(keyword); })) {
            return PromptType_1.PromptType.Conditional;
        }
        // If neither, assume it is a single line
        return PromptType_1.PromptType.SingleLine;
    };
    return InputParser;
}());
exports.InputParser = InputParser;
