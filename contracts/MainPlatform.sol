// SPDX-License-Identifier: LGPL-3.0
pragma solidity ^0.8.4;

import "./Question.sol";
import "./QuestionFrame.sol";

/// To be used for easier external comunication
struct QuestionInfo {
    uint id;
    address owner;
    string title;
    string description;
    string[] labels;
    uint[] scores;
    uint[3] extras;
    uint totalVoters;
    bool hasVoted;
}

contract MainPlatform {
    address platformOwner;
    
    //TODO: Move to PlatformConfig
    uint constant totalPoints = 1_000_000;
    uint constant questionPostCost = 100;
    uint constant voteCost = 1;

    uint currentIndex;
    QuestionFrame[] platformQuestions;

    uint _totalUsers;
    mapping(address  => uint) userPoints;

//@ -- Modifiers
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

//@ -- CONSTRUCTOR
    constructor(address _owner) validAddress ownerOnly(_owner) {
        platformOwner = _owner;  // set owner of the platform
        currentIndex = 0;
        register();    // register first user, wooohoo !! :))
    }

//@ -- PUBLIC API
    function register() public {
        require(userPoints[msg.sender] == 0, "Already registered.");

        // accomodate new user with vote points
        userPoints[msg.sender] = totalPoints;
        _totalUsers += 1;
    }

    ///@notice Used to check if caller (address) is registered at the platform
    function isRegisteredUser() validAddress public view returns (bool) {
        return userPoints[msg.sender] != 0;
    }

    function addQuestion(string calldata title, string[] calldata labels) 
    validAddress registeredUsersOnly
    positiveBalance pointsDeducible(questionPostCost)
    public
    returns (uint)
    {
        // setup new question frame
        QuestionFrame newQuestion = new QuestionFrame(msg.sender, title, labels);

        // add to all available questions
        platformQuestions.push(newQuestion);
        currentIndex += 1;
        return currentIndex;    // this is sort of question ID for the front
    }

    ///@notice Lists all the question of the platform (output: QuestionInfo[])
    function getPlatformQuestions() public view
    returns (QuestionInfo[] memory){
        QuestionInfo[] memory output = new QuestionInfo[](platformQuestions.length);

        //cycle through all questions and format output
        for(uint i = 0; i < platformQuestions.length; i++ ) {
            output[i] = fabricateQuestionInfo(i);
        }

        return output;
    }

    function getQuestionInfo(uint questionID) public view
    validAddress validQuestionIndex(questionID) registeredUsersOnly
    returns(QuestionInfo memory) {
        return fabricateQuestionInfo(questionID);
    }

    // private helper function
    function fabricateQuestionInfo(uint _id) private view
    returns(QuestionInfo memory) {
        return QuestionInfo(
            _id,  //as ID of the question
            platformQuestions[_id].getOwner(),
            platformQuestions[_id].getTitle(),
            platformQuestions[_id].getDescription(),
            platformQuestions[_id].getLabels(),
            platformQuestions[_id].getScores(),
            platformQuestions[_id].getExtras(),
            platformQuestions[_id].totalVoters(),
            platformQuestions[_id].hasVoted()
        );
    }

//@ -- Scoring and extras reporting

    function vote(uint questionID, uint voteOption)
    validAddress validQuestionIndex(questionID)
    registeredUsersOnly positiveBalance pointsDeducible(voteCost)
    public {
        // perform voting for a given question
        platformQuestions[questionID].accept(voteOption);
    }

    function extraVote(uint questionID, uint extraOption)
    validAddress validQuestionIndex(questionID)
    registeredUsersOnly // pointsDeducible ?
    public {
        require(extraOption < 3, "Illegal 'extra option' argument. Must be between 0 and 2.");
        if (extraOption == 0) {
            platformQuestions[questionID].none();
        } else {
            if (extraOption == 1) {
                platformQuestions[questionID].malformed();
            } else {
                platformQuestions[questionID].report();
            }
        }
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

    function editDescription(uint questionID, string calldata newDescription)
    validAddress registeredUsersOnly validQuestionIndex(questionID)
    payable public {
        platformQuestions[questionID].editDescription(newDescription);
    }
}