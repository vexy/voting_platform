// SPDX-License-Identifier: LGPL-3.0
pragma solidity ^0.8.4;

import "./Question.sol";
import "./QuestionFrame.sol";

contract MainPlatform {
    address platformOwner;
    
    uint constant totalPoints = 1_000_000;
    uint constant questionPostCost = 100;
    uint constant voteCost = 1;

    uint currentIndex;
    QuestionFrame[] allQuestions;

    uint _totalUsers;
    mapping(address  => uint) userPoints;

    // Modifiers
    modifier ownerOnly(address _address) {
        require(msg.sender == _address, "Method execution allowed to owner only.");
        _;
    }

    modifier validAddress() {
        require(msg.sender != address(0), "Valid address required.");
        _;
    }

    modifier registeredUsersOnly() {
        require(userPoints[msg.sender] != 0, "Registered users only.");
        _;
    }

    modifier positiveBalance() {
        require(userPoints[msg.sender] > 0, "Insuficcient platform points.");
        _;
    }

    // this modifier checks both user validity and remaining funds (cost of action)
    modifier pointsDeducible(uint points) {
        require(userPoints[msg.sender] > points, "Insuficcient action points remaining.");
        _;
        userPoints[msg.sender] -= points;   //deduce specified amount of points
    }

    modifier validQuestionIndex(uint id) {
        require(id >= 0 && id < currentIndex, "Invalid question ID.");
        _;
    }

    constructor(address _owner) validAddress ownerOnly(_owner) {
        platformOwner = _owner;  // set owner of the platform
        currentIndex = 0;
        register();    // register first user, wooohoo !! :))
    }

    function register() public {
        require(userPoints[msg.sender] == 0, "Already registered.");

        // accomodate new user with vote points
        userPoints[msg.sender] = totalPoints;
        _totalUsers += 1;
    }

    function addQuestion(string calldata title, string[] calldata labels) 
    validAddress registeredUsersOnly
    positiveBalance pointsDeducible(questionPostCost)
    public
    returns (uint)
    {
        // setup new question frame
        QuestionFrame newQuestion = new QuestionFrame(title, labels);

        // add to all available questions
        allQuestions.push(newQuestion);
        currentIndex += 1;
        return currentIndex;    // this is sort of question ID for the front
    }

    ///@notice Lists all the questions on the platform
    function getAllQuestions() public view returns(QuestionFrame[] memory) {
        return allQuestions;
    }

    ///@notice Used to check if caller (address) is registered at the platform
    function isRegisteredUser() public view returns (bool) {
        return userPoints[msg.sender] != 0;
    }

//@ -- Scoring and scoring intel

    function vote(uint questionID, uint voteOption)
    validAddress validQuestionIndex(questionID)
    registeredUsersOnly positiveBalance pointsDeducible(voteCost)
    public {
        // perform voting for a given question
        allQuestions[questionID].accept(voteOption);
    }

    function scoresFor(uint questionID)
    validAddress validQuestionIndex(questionID)
    public view
    returns(string[] memory, uint[] memory) {
        return allQuestions[questionID].scoreTable();
    }

//@ -- Stats (add more later)

    function totalQuestions() public view returns (uint) {
        return currentIndex;
    }

    function totalUsers() public view returns (uint) {
        return _totalUsers;
    }

    function userBalance(address _address) validAddress registeredUsersOnly public view returns(uint) {
        return userPoints[_address];
    }

    function owner() public view returns (address) {
        return platformOwner;
    }
}