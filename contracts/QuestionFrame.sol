// SPDX-License-Identifier: LGPL-3.0
pragma solidity <0.9;

import "./Helpers.sol";
import "./Question.sol";

contract QuestionFrame is Question {
    bytes32 internal _questionHash;
    
    mapping (address => bool) votersList;
    uint totalVoters;

    constructor(string memory _title, string[] memory _options) Question(_title, _options) {
        _questionHash = computeMessageHash(_title, _options);
        totalVoters = 0;
    }

    function computeMessageHash(string memory _t, string[] memory _opt) private pure returns (bytes32) {
        // flatten all question options into single string
        string memory allOptions;
        for(uint i = 0; i < _opt.length; i++) {
            allOptions = string(abi.encode(allOptions, "#", _opt[i]));
        }
        // computed hash of given parameters
        bytes memory hashedInput = abi.encode(_t, allOptions);

        return keccak256(hashedInput);
    }

    modifier updatesVoters() {
        _;
        
        // update voter entries
        votersList[msg.sender] = true;
        totalVoters += 1;
    }

    modifier noDoubleVotes() {
        require(votersList[msg.sender] == false, "Already voted. No double votes allowed.");
        _;
    }

    function score(uint vote_option) noDoubleVotes updatesVoters public override {
        super.score(vote_option);
    }

    function extra(EXTRAS extra_option) noDoubleVotes updatesVoters public override {
        super.extra(extra_option);
    }

//@@ ---    Getters     ---

    function questionHash() public view returns (bytes32) {
        return _questionHash;
    }

    function votersCount() public view returns (uint) {
        return totalVoters;
    }

    function hasVoted() public view returns (bool) {
        return votersList[msg.sender];
    }

    function constructPlatformQuestion() public view returns(PlatformQuestion memory) {
        return PlatformQuestion(
            questionHash(),
            constructMetaModel(),
            votersCount(),
            hasVoted()
        );
    }
}