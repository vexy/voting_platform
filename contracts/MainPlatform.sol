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

    // this will also assume positive balance
    modifier registeredAndWithinBalance() {
        require(userPoints[msg.sender] > 0, "Registered users only.");
        _;
    }

    // this modifier checks both user validity and remaining funds (cost of action)
    modifier pointsDeducible(uint points) {
        require(userPoints[msg.sender] > points, "Insuficcient action points remaining.");
        _;
        userPoints[msg.sender] -= points;   //deduce specified amount of points
    }

    modifier validQuestionIndex(uint id) {
        require(id > 0 && id < currentIndex, "Invalid question ID.");
        _;
    }

    constructor(address owner) validAddress ownerOnly(owner) {
        platformOwner = owner;  // set owner of the platform
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
    validAddress registeredAndWithinBalance pointsDeducible(questionPostCost)
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

//@ -- Scoring and scoring intel

    function vote(uint questionID, uint voteOption)
    validQuestionIndex(questionID) validAddress
    registeredAndWithinBalance pointsDeducible(voteCost)
    public {
        // perform voting for a given question
        allQuestions[questionID].accept(voteOption);
    }

    function scoresFor(uint questionID)
    validAddress validQuestionIndex(questionID)
    public view
    returns(string[] memory, uint[] memory) {
        return allQuestions[questionID].formattedOutput();
    }


//@ -- Stats (add more later)

    function totalQuestions() public view returns (uint) {
        return currentIndex;
    }

    function totalUsers() public view returns (uint) {
        return _totalUsers;
    }
}