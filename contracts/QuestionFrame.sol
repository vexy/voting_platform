//SPDX-License-Identifier: BSD-2
pragma solidity ^0.8.4;

import "./Question.sol";

/// @title Extension of Question contract with additional features
struct ExpandedQuestion {
    address owner;
    string title;
    string description;

    // reference to a Question contract
    Question questions;

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

    bool internal locked; // used as modifier flag

    constructor(string memory title, string[] memory labels) {
        questionFrame.owner = msg.sender;
        questionFrame.title = title;
        questionFrame.questions = new Question(labels);
        questionFrame.none = 0;
        questionFrame.malformed = 0;
        questionFrame.ju_gospode_boze = 0;
    }

    modifier protectedExecution() {
        require(!voters[msg.sender], "Already performed action");
        require(!locked, "No reentrancy while the method is executing");
        locked = true;
        _;
        voters[msg.sender] = true;
        locked = false;
    }

    function accept(uint element) public protectedExecution {
        questionFrame.questions.accept(element);
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
    function noneCount() public view returns (uint) {
        return questionFrame.none;
    }

    function malformedCount() public view returns (uint) {
        return questionFrame.malformed;
    }

    function reportCount() public view returns (uint) {
        return questionFrame.ju_gospode_boze;
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