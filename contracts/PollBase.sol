// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8;

contract PollBase {
    string name;
    string description;
    address _baseOwner = msg.sender;

    // add contract options later

    constructor(string memory _name, string memory _description) {
        name = _name;
        description = _description;
    }

    // add more functions later
    function describe() view public returns (string memory) {
        return description;
    }
}