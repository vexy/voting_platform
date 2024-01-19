// SPDX-License-Identifier: LGPL-3.0
pragma solidity <0.9;
// TODO: change license later

import "./Helpers.sol";

contract Question {
    string title;
    string[] options;
    // score table mapping containing scores (votes) for certain label content
    mapping(uint => uint) scores;
    // extra options available to every question
    uint[3] extras;

    /// Creates a new Question with given parameters
    /// @param _title Title of the question
    /// @param _options Array of possible voting options 
    constructor(string memory _title, string[] memory _options) {
        title = _title;
        options = _options;
    }

//@@ ---    Modifiers   ---

    modifier legitOption(uint _option) {
        require(_option >= 0 && _option < options.length, "Non existing vote option. Try with different value");
        _;
    }

    modifier legitExtra(uint _extra) {
        require(_extra >= 0 && _extra < 3, "Non existing vote option. Try with different value");
        _;
    }

//@@  ====================

    function score(uint vote_option) legitOption(vote_option) public virtual {
        scores[vote_option] += 1;
    }

    function extra(EXTRAS extra_option) legitExtra(uint(extra_option)) public virtual {
        if(extra_option == EXTRAS.none) {
            extras[uint256(EXTRAS.none)] += 1;
        } else if (extra_option == EXTRAS.malformed) {
            extras[uint256(EXTRAS.malformed)] += 1;
        } else {
            extras[uint256(EXTRAS.ju_gospode_boze)] += 1;
        }
    }

    function constructMetaModel() public view returns (QuestionModel memory) {
        // create resulting scores array from current mapping
        uint[] memory results = new uint[](options.length);
        for(uint option_id = 0; option_id < options.length; option_id++) {
            results[option_id] = scores[option_id];
        }

        return QuestionModel(
            title,
            options,
            results,
            extras
        );
    }
}