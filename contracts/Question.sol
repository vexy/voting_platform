// SPDX-License-Identifier: BSD-2
pragma solidity ^0.8.4;

contract Question {
    // contains mapping of [1..7] question elements to xy score
    mapping(uint => uint) elements;
    // Array question labels  //TODO: turn into bytes later
    string[] labels;

    // mapping of already voted addresses
    mapping(address => bool) hasVoted;

    constructor(string[] memory questionLabels) {
        // TODO: make sure to guard against faulty inputs
        require(questionLabels.length <= 10, "Not more than 10 question elements are allowed at this point.");

        // set all question elements to 0 score
        // and populate question labels
        for(uint8 idx = 0; idx < questionLabels.length; idx++) {
            elements[idx] = 0;
            labels.push(questionLabels[idx]);
        }

        // add 3 more options
        elements[6] = 0;    // inappopriate
        elements[7] = 0;    // non_of_above
        elements[8] = 0;    // report
    }

    function accept(uint element) public {
        // basic bounds check
        require(element < labels.length, "Voting element outside of the questions bound");
        elements[element] += 1; // increase score of this element
    }

    function score(uint element) public view returns (uint) {
        // basic bounds check
        require(element < labels.length, "Voting element outside of the questions bound");
        return elements[element];
    }


    /**
        TODO: Add labels update and other stuff
    */
    function getLabels() public view returns(string[] memory) {
        return labels;
    }

    function editLabel(uint element, string calldata newLabel) public {
        require(element < labels.length, "Illegal question label index");
        labels[element] = newLabel;
    }
}