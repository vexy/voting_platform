// SPDX-License-Identifier: LGPL-3.0
pragma solidity ^0.8.4;

import "./Question.sol";

contract MainPlatform {
    address platformOwner;

    uint currentIndex;
    mapping(uint => Question) allQuestions;

    constructor(address owner) {
        require(msg.sender == owner);

        platformOwner = owner;  // set owner of the platform
        currentIndex = 0;
    }

    function addQuestion(string[] memory labels)
    public {
        // create new question and add it to the mapping
        Question newQuestion = new Question(labels);
        allQuestions[currentIndex] = newQuestion;

        // increase index (!)
        currentIndex += 1;
    }

    function totalQuestions() public view returns (uint) {
        return currentIndex;
    }
}