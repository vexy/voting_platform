// SPDX-License-Identifier: LGPL-3.0
pragma solidity ^0.8.4;

contract Question {
    // contains total score for each question element
    uint[] scores;
    // contains array of question labels
    string[] labels;     //TODO: turn into bytes later

    constructor(string[] memory questionLabels) {
        // copy all labels and set initial score value
        for(uint8 idx = 0; idx < questionLabels.length; idx++) {
            labels.push(questionLabels[idx]);
            scores.push(0);
        }
    }

    modifier boundsExtendable(uint bound) {
        // basic bounds check
        require(bound < labels.length, "Voting element outside of the questions bound");
        _;
    }

    function accept(uint element) public boundsExtendable(element) {
        scores[element] += 1; // increase score of this element
    }

    function score(uint element) public view boundsExtendable(element) returns (uint) {
        return scores[element];
    }

    /**
        Question label getters and setters
     */
    function getLabels() public view returns(string[] memory) {
        return labels;
    }

    function editLabel(uint element, string calldata newLabel) public boundsExtendable(element) {
        labels[element] = newLabel;
    }
}