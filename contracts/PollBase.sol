// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8;

contract PollBase {
    string name;
    string public description = "Very simple poll";

    constructor(string memory _name) {
        name = _name;
    }

    function greet() view public returns (string memory) {
        return description;
    }

    function publicName() view public returns (string memory) {
        return name;
    }
}