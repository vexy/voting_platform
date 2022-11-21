//SPDX-License-Identifier: LGPL-3.0
pragma solidity ^0.8.4;

import "./Question.sol";

/// @title Extension of Question contract with additional features
struct ExpandedQuestion {
    address owner;
    string title;
    string description;
    Question question;  // reference to a Question contract
    uint[3] extras;     // additional, system-defined options, attached to each question
}

contract QuestionFrame {
    // wrapper around base question
    ExpandedQuestion questionFrame;

    mapping(address => bool) voters;
    uint internal votersCount;  // number of user that have voted on this question

    bool internal locked; // used to guard against re-entrancy

    enum EXTRAS {
        none,
        malformed,
        ju_gospode_boze
        /**
        Name of last variable represents a famous replica
        of the Serbian actress 🙌
        
        🇷🇸 Svetlana (Ceca) Bojkovic 🇷🇸
        */
    }

    constructor(address owner, string memory title, string[] memory labels) {
        questionFrame.owner = owner;
        questionFrame.title = title;
        questionFrame.question = new Question(labels);
        questionFrame.extras[uint(EXTRAS.none)] = 0;
        questionFrame.extras[uint(EXTRAS.malformed)] = 0;
        questionFrame.extras[uint(EXTRAS.ju_gospode_boze)] = 0;
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

/*      ---- SCORES AND EXTRAS SETTERS ----      */
    function accept(uint element) public protectedExecution {
        questionFrame.question.accept(element);
    }

    function none() public protectedExecution {
        questionFrame.extras[uint(EXTRAS.none)] += 1;
    }

    function malformed() public protectedExecution {
        questionFrame.extras[uint(EXTRAS.malformed)] += 1;
    }

    function report() public protectedExecution {
        questionFrame.extras[uint(EXTRAS.ju_gospode_boze)] += 1;
    }

/*      ---- SCORES AND EXTRAS GETTERS ----      */
    function score(uint element) public view returns (uint) {
        return questionFrame.question.score(element);
    }

    function noneCount() public view returns (uint) {
        return questionFrame.extras[uint(EXTRAS.none)];
    }

    function malformedCount() public view returns (uint) {
        return questionFrame.extras[uint(EXTRAS.malformed)];
    }

    function reportCount() public view returns (uint) {
        return questionFrame.extras[uint(EXTRAS.ju_gospode_boze)];
    }

    // AGGREGATES

    function getScores() public view returns (uint[] memory) {
        return questionFrame.question.getScores();
    }

    function getExtras() public view returns (uint[3] memory) {
        return questionFrame.extras;
    }

//@--       OTHER CRUD

    /*      ---- Title ----      */
    function editTitle(string calldata newTitle) public {
        questionFrame.title = newTitle;
    }

    function getTitle() public view returns (string memory) {
        return questionFrame.title;
    }

    /*      ---- Labels ----      */
    function getLabels() public view returns (string[] memory) {
        return questionFrame.question.getLabels();
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

    ///@dev `uint` variable representing total number of users that have interacted with contract (used contract features)
    ///@notice Total amount of users who have expressed their opinion on this question.
    function totalVoters() public view returns (uint) {
        return votersCount;
    }

    function hasVoted() public view returns (bool) {
        return voters[msg.sender];
    }
}