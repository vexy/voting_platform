// SPDX-License-Identifier: LGPL-3.0
pragma solidity ^0.8.9;

import "./Helpers.sol";
import "./Question.sol";

contract MainPlatform {
    address internal platformOwner;
    PlatformConfig internal config;

    uint internal currentQuestionIdx;
    Question[] internal platformQuestions;

    uint internal totalUsers_;
    mapping(address  => uint) userPoints;
    
    // mappings to hold num of total voters and mapping of addresses performed vote
    mapping(uint => uint) questionTotalVoters;
    mapping(uint => mapping(address => bool)) answeredQuestions;

//@ -- Modifiers
    modifier validAddress() {
        require(msg.sender != address(0), "Valid address required.");
        _;
    }

    modifier registeredUsersOnly() {
        require(userPoints[msg.sender] != 0, "Registered users only.");
        _;
    }

    modifier nonRegisteredUsersOnly() {
        require(userPoints[msg.sender] == 0, "Already registered.");
        _;
    }

    modifier positiveBalance() {
        require(userPoints[msg.sender] > 0, "Insuficcient platform points.");
        _;
    }

    /// Checks both user validity and remaining funds (cost of action)
    modifier pointsDeducible(uint points) {
        require(userPoints[msg.sender] > points, "Insuficcient action points remaining.");
        _;
        userPoints[msg.sender] -= points;   //deduce specified amount of points
    }

    /// Checks if a given questionID is in valid questionID range
    modifier validQuestionIndex(uint _questionID) {
        require(_questionID >= 0 && _questionID < currentQuestionIdx, "Invalid question ID.");
        _;
    }

    /// Checks if current caller has already provided options
    /// and ensures no double vote is possible
    modifier doubleVoteProtected(uint _questionID) {
        // get true/false for given id and address
        bool hasVoted = answeredQuestions[_questionID][msg.sender];
        require(!hasVoted, "Already performed vote options");
        _;  //...vote procedure
        answeredQuestions[_questionID][msg.sender] = true;
    }

    // Basic re-entrancy protection
    bool internal locked = false;
    modifier reEntryProtected() {
        require(!locked, "Method aready executing. No re-entrancy allowed.");
        locked = true;
        _;
        locked = false;
    }

//@ -- PLATFORM CONSTRUCTOR
    constructor(address _owner) validAddress {
        require(msg.sender == _owner, "Method execution only allowed by the owner of the contract.");
        // setup initial parameters
        platformOwner = _owner;
        config = new PlatformConfig();
        currentQuestionIdx = 0;

        register();    // register first user, wooohoo !! :))
    }

    /* --------------- PUBLIC API --------------- */
    function register() public nonRegisteredUsersOnly reEntryProtected {
        // accomodate new user with vote points
        userPoints[msg.sender] = config.TOTAL_POINTS();
        totalUsers_ += 1;
    }

    ///@notice Used to check if caller (address) is registered at the platform
    function isRegisteredUser() validAddress public view returns (bool) {
        return userPoints[msg.sender] != 0;
    }

    /* --------------- QUESTIONS --------------- */
    function addQuestion(string calldata title, string[] calldata labels) 
    validAddress registeredUsersOnly
    positiveBalance pointsDeducible(config.POST_COST())
    public
    returns (uint)
    {
        // setup new question
        Question newQuestion = new Question(msg.sender, title, labels);

        // and add it to platform collection
        platformQuestions.push(newQuestion);
        currentQuestionIdx += 1;

        return currentQuestionIdx;    // this is sort of question ID for the front
    }

    function getQuestionInfo(uint questionID) public view
    validAddress validQuestionIndex(questionID) registeredUsersOnly
    returns(QuestionInfoOutput memory) {
        // calculate QuestionInfoOutput for given questionID
        QuestionInfoOutput memory _output = QuestionInfoOutput(
            questionID,
            platformQuestions[questionID].produceQuestionMeta(),
            questionTotalVoters[questionID],
            answeredQuestions[questionID][msg.sender]
        );
        return _output;
    }

    ///@notice Lists all the question of the platform (output: QuestionInfo[])
    function getAllQuestions() public view
    validAddress registeredUsersOnly
    returns (QuestionInfoOutput[] memory)
    {
        QuestionInfoOutput[] memory output = new QuestionInfoOutput[](platformQuestions.length);

        //cycle through all questions and format output
        for(uint i = 0; i < platformQuestions.length; i++ ) {
            output[i] = getQuestionInfo(i);
        }

        return output;
    }

    /* --------------- SCORING WORKS --------------- */
    function vote(uint questionID, uint voteOption)
    validAddress registeredUsersOnly positiveBalance
    validQuestionIndex(questionID) pointsDeducible(config.VOTE_COST())
    reEntryProtected doubleVoteProtected(questionID)
    public {
        platformQuestions[questionID].accept(voteOption);
        questionTotalVoters[questionID] += 1;
    }

    function voteExtra(uint questionID, EXTRAS extraOption)
    validAddress registeredUsersOnly positiveBalance
    validQuestionIndex(questionID) // pointsDeducible(config.VOTE_COST()) ??
    reEntryProtected doubleVoteProtected(questionID)
    public { // acceptExtra adds another modifier to check enum inputs
        platformQuestions[questionID].acceptExtra(extraOption);
        questionTotalVoters[questionID] += 1;
    }

    //@ -- Stats (add more later)

    function totalQuestions() public view returns (uint) {
        return currentQuestionIdx;
    }

    function totalUsers() public view returns (uint) {
        return totalUsers_;
    }

    function balanceOf(address _address) validAddress registeredUsersOnly public view returns (uint) {
        return userPoints[_address];
    }

    function owner() public view returns (address) {
        return platformOwner;
    }

    // function editDescription(string calldata _newDescription) public payable {

    // }
}