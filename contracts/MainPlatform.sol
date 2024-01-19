// SPDX-License-Identifier: LGPL-3.0
pragma solidity <0.9;

import "./Helpers.sol";
import "./QuestionFrame.sol";

contract MainPlatform {
    PlatformConfig internal config;
    address internal platformOwner;

    // mapping of questionHashes to QuestionFrame 
    bytes32[] allQuestionHashes;
    mapping(bytes32 => QuestionFrame) questions;
    //
    mapping(bytes32 => bool) validHashes;   //lookup helper mapping

    uint usersCount;
    mapping(address => uint) userPoints;

//@@ ---    Modifiers   ---

    modifier validAddress() {
        require(msg.sender != address(0), "Valid address required.");
        _;
    }

    modifier validQuestionHash(bytes32 questionHash) {
        require(validHashes[questionHash] == true, "Invalid question hash.");
        _;
    }

    modifier registeredUsersOnly() {
        require(
            userPoints[msg.sender] > 0,
            "Registered users only."
        );
        _;
    }

    modifier nonRegisteredUsersOnly() {
        require(userPoints[msg.sender] == 0, "Already registered.");
        _;
    }

    modifier positiveBalance() {
        require(userPoints[msg.sender] <= config.TOTAL_POINTS(), "Insuficcient platform points.");
        _;
    }

    /// Checks both user validity and remaining funds (cost of action)
    modifier pointsDeducible(uint points) {
        require(userPoints[msg.sender] > points, "Insuficcient action points remaining.");
        _;
        // deduce specified amount of points
        userPoints[msg.sender] -= points;
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

        // finally, register owner as a first user. wooohoo !! :))
        register();    
    }

    /* --------------- PUBLIC API --------------- */
    function register() public reEntryProtected validAddress nonRegisteredUsersOnly {
        userPoints[msg.sender] = config.TOTAL_POINTS();
        usersCount += 1;
    }

    /* --------------- QUESTIONS --------------- */
    function addQuestion(string calldata title, string[] calldata options) 
    reEntryProtected validAddress registeredUsersOnly
    positiveBalance pointsDeducible(config.POST_COST())
    public
    returns (bytes32)
    {
        // create new question frame with given parameters
        QuestionFrame newQuestion = new QuestionFrame(title, options);

        // compute question hash
        bytes32 questionHash = newQuestion.questionHash();

        // update storage pointers
        questions[questionHash] = newQuestion;
        allQuestionHashes.push(questionHash);
        //
        validHashes[questionHash] = true;

        // return newly created question hash as external reference
        return questionHash;
    }

    function getQuestionInfo(bytes32 questionID) public view
    validAddress registeredUsersOnly validQuestionHash(questionID)
    returns(PlatformQuestion memory) {
        // bytes32 b32_questionHash = bytes32(abi.encodePacked(questionID));
        return questions[questionID].constructPlatformQuestion();
    }


    function getAllQuestions() public view
    validAddress registeredUsersOnly
    returns (PlatformQuestion[] memory)
    {
        PlatformQuestion[] memory output = new PlatformQuestion[](allQuestionHashes.length);

        // cycle through all questions and format output
        for(uint i = 0; i < allQuestionHashes.length; i++ ) {
            // string memory str_questionHash = string(allQuestionHashes[i]);
            output[i] = getQuestionInfo(allQuestionHashes[i]);
        }

        return output;
    }

    /* --------------- SCORING WORKS --------------- */
    function vote(bytes32 questionHash, uint voteOption)
    validAddress registeredUsersOnly positiveBalance
    pointsDeducible(config.VOTE_COST())
    reEntryProtected
    public {
        // bytes32 b32_questionHash = bytes32(abi.encodePacked(questionID));
        questions[questionHash].score(voteOption);
    }

    function voteExtra(bytes32 questionHash, EXTRAS extraOption)
    validAddress registeredUsersOnly positiveBalance
    reEntryProtected // pointsDeducible(config.VOTE_COST()) ??
    public { // acceptExtra adds another modifier to check enum inputs
        questions[questionHash].extra(extraOption);
    }


//@@ ---    Stats   ---
    function totalQuestions() public view returns (uint) {
        return allQuestionHashes.length;
    }

    function totalUsers() public view returns (uint) {
        return usersCount;
    }

    function pointsBalance() validAddress registeredUsersOnly public view returns (uint) {
        return userPoints[msg.sender];
    }

    function owner() public view returns (address) {
        return platformOwner;
    }

    /// @notice Used to check if caller (address) is registered at the platform
    function isRegisteredUser() validAddress public view returns (bool) {
        return userPoints[msg.sender] != 0;
    }
}