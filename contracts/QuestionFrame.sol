// SPDX-License-Identifier: LGPL-3.0
pragma solidity <0.9;

import "./Helpers.sol";
import "./Question.sol";

contract QuestionFrame is Question {
    uint questionID;
    uint totalVoters;
    mapping (address => bool) votersList;

    modifier updatesVoters() {
        _;
        
        // update voter entries
        votersList[msg.sender] = true;
        totalVoters += 1;
    }

    modifier noDoubleVotes() {
        require(votersList[msg.sender] == false, "Already voted. No dobule votes allowed.");
        _;
    }

    constructor(uint _questionID, string memory _title, string[] memory _options) Question(_title, _options) {
        questionID = _questionID;
        totalVoters = 0;
    }

    function score(uint vote_option) noDoubleVotes updatesVoters public override {
        super.score(vote_option);
    }

    function extra(EXTRAS extra_option) updatesVoters public override {
        super.extra(extra_option);
    }

//@@ ---    Getters     ---

    function votersCount() public view returns (uint) {
        return totalVoters;
    }

    function hasVoted() public view returns (bool) {
        return votersList[msg.sender];
    }

    function constructPlatformQuestion() public view returns(PlatformQuestion memory) {
        return PlatformQuestion(
            questionID,
            constructMetaModel(),
            votersCount(),
            hasVoted()
        );
    }
}