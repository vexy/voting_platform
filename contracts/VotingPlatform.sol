// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "./Question.sol";

contract VotingPlatform {
    string name;
    address _owner;

    uint public totalVoters;
    uint public totalQuestions;

    // mapping of all platform questions
    mapping(uint => PlatformQuestion) allQuestions;

    // basic platform events
    event NewQuestionAdded(string indexed title, address indexed owner);
    event QuestionVoted(uint questionId);

    constructor(string memory _name, address owner) {
        require(msg.sender == owner);

        name = _name;
        _owner = owner;

        //initially
        totalQuestions = 0;
        totalVoters = 0;
    }

    // basic getters:
    function platformName() public view returns (string memory) {
        return name;
    }

    function addQuestion(
        string memory title,
        string memory description,
        string[] memory options
    ) public {
        // try to make new PlatformQuestion object
        PlatformQuestion newQuestion = new PlatformQuestion(title, description, options, msg.sender);
        totalQuestions += 1; //increase number of total questions

        // add to platform storage
        allQuestions[totalQuestions] = newQuestion;

        emit NewQuestionAdded(title, msg.sender);  // rework later
    }

    // make payable later...
    function voteQuestionOption(uint questionID, uint answerID) public {
        allQuestions[questionID].voteFor(answerID);
    }
}