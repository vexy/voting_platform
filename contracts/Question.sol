// SPDX-License-Identifier: LGPL-3.0
pragma solidity ^0.8.9;

import "./Helpers.sol";

contract Question {
    address owner;
    string title;
    string description;
    string[] labels;
    uint[] scores;
    uint[3] extras;      // expressed through cutom ENUM

    /** --------------------------------------- */
    constructor(address _owner, string memory _title, string[] memory questionLabels) {
        owner = _owner;
        title = _title;

        // copy all labels and set initial score value
        for(uint8 idx = 0; idx < questionLabels.length; idx++) {
            labels.push(questionLabels[idx]);
            scores.push(0);
        }
    }

    // Checks if given parameter is in bouds of valid options
    modifier boundsExtendable(uint bound) {    
        require(bound < labels.length, "Non existing option. Try with different value");
        _;
    }

    // Checks if given parameter is in range of EXTRA enum values
    modifier enumExtendable(uint _extraInt) {
        require(_extraInt >= 0 && _extraInt < 3, "Parameter outside of range of valid options.");
        _;
    }

/*      ----- SCORING LOGIC ----- */
    function accept(uint element) public boundsExtendable(element) {
        scores[element] += 1; // increase score of this element
    }

    function acceptExtra(EXTRAS option) public enumExtendable(uint(option)) {
        if(option == EXTRAS.none) {
            extras[uint256(EXTRAS.none)] += 1;
        } else {
            if(option == EXTRAS.malformed) {
                extras[uint256(EXTRAS.malformed)] += 1;
            } else {
                extras[uint256(EXTRAS.ju_gospode_boze)] += 1;
            }
        }
    }

    /* ------------ QUESTION META OUTPUT ------------- */
    function produceQuestionMeta() public view
    returns (QuestionMeta memory) {
        return QuestionMeta(
            owner,
            title,
            description,
            labels,
            scores,
            extras
        );
    }

    function editDescription(string calldata _newDescription) public {
        description = _newDescription;
    }
}