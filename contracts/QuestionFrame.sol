//SPDX-License-Identifier: LGPL-3.0
pragma solidity ^0.8.4;

import "./Question.sol";

/// @title Extension of Question contract with additional features
struct ExpandedQuestion {
    address owner;
    string title;
    string description;

    // reference to a Question contract
    Question question;

    // additional, system-defined options, attached to each question
    uint none;
    uint malformed;
    uint ju_gospode_boze;
    /**
        Name of this variable represents a famous replica
        of the Serbian actress 🙌
        
        🇷🇸 Svetlana (Ceca) Bojkovic 🇷🇸
     */
}

contract QuestionFrame {
    ExpandedQuestion questionFrame;
    mapping(address => bool) voters;

    bool internal locked; // used to guard against re-entrancy
    uint internal votersCount;  // number of user that have voted on this question

    constructor(string memory title, string[] memory labels) {
        questionFrame.owner = msg.sender;
        questionFrame.title = title;
        questionFrame.question = new Question(labels);
        questionFrame.none = 0;
        questionFrame.malformed = 0;
        questionFrame.ju_gospode_boze = 0;
        votersCount = 0;
    }

    modifier protectedExecution() {
        require(!voters[msg.sender], "Already performed action");
        require(!locked, "No reentrancy while the method is executing");
        locked = true;
        _;
        voters[msg.sender] = true;
        votersCount += 1;
        locked = false;
    }

    function accept(uint element) public protectedExecution {
        questionFrame.question.accept(element);
    }

    function none() public protectedExecution {
        questionFrame.none += 1;
    }

    function malformed() public protectedExecution {
        questionFrame.malformed += 1;
    }

    function report() public protectedExecution {
        questionFrame.ju_gospode_boze += 1;
    }


    /*      ---- Question points getters ----      */
    function score(uint element) public view returns (uint) {
        return questionFrame.question.score(element);
    }

    function noneCount() public view returns (uint) {
        return questionFrame.none;
    }

    function malformedCount() public view returns (uint) {
        return questionFrame.malformed;
    }

    function reportCount() public view returns (uint) {
        return questionFrame.ju_gospode_boze;
    }

    ///@dev Tuple of string and uint arrays representing labels and scores
    ///@notice Returns a map of question labels and corresponding vote points
    function scoreTable() public view returns (string[] memory, uint[] memory) {
        return (questionFrame.question.getLabels(), questionFrame.question.getScores());
    }

    ///@dev `uint` variable representing total number of users that have interacted with contract (used contract features)
    ///@notice Total amount of users who have expressed their opinion on this question.
    function totalVoters() public view returns (uint) {
        return votersCount;
    }

//@--       BASIC CRUDs

    /*      ---- Title ----      */
    function editTitle(string calldata newTitle) public {
        questionFrame.title = newTitle;
    }

    function getTitle() public view returns (string memory) {
        return questionFrame.title;
    }

    /*      ---- Owner ----      */
    function getOwner() public view returns (address) {
        return questionFrame.owner;
    }

    /*      ---- Description ----      */
    function editDescription(string calldata newDescription) public {
        questionFrame.description = newDescription;
    }

    function getDescription() public view returns (string memory) {
        return questionFrame.description;
    }
}