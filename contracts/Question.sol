// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract PlatformQuestion {
    string public title;
    string _description;
    address _owner;     // will be used as general question identifier

    // Add later:
    // uint _createdAt;
    // uint _closesAt;

    struct QuestionOption {
        string title;
        uint voteCount;
    }

    // public mapping of uint:QuestionOption pair
    mapping(uint => QuestionOption) public options;

    // total voters count
    uint public totalVotesCount;

    // basic events
    event QuestionVoted(uint indexed optionIndex);
    // event QuestionClosed;   // add later

    constructor(
        string memory questionTitle,
        string memory description,
        string[] memory allOptions,
        address owner)
    {
        // guard against faulty inputs:
        require(bytes(title).length > 0);
        require(allOptions.length <= 5);

        // copy basic question parameters
        title = questionTitle;
        _description = description;
        _owner = owner;

        // initially:
        totalVotesCount = 0;

        // cycle through all passed options and create new question options struct
        for(uint8 idx = 0; idx < allOptions.length; idx++) {
            options[idx] = QuestionOption(allOptions[idx], 0);
        }
    }

    function voteFor(uint optionId) public {
        // basic bounds check
        require(optionId > 0 && optionId < 5);

        options[optionId].voteCount += 1;
        totalVotesCount += 1;

        emit QuestionVoted(optionId);   //rework later
    }
}