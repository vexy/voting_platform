// SPDX-License-Identifier: LGPL-3.0
pragma solidity <0.9;

/**
    Name of last case represents a famous replica
    of the Serbian actress 🇷🇸 Svetlana (Ceca) Bojkovic 🇷🇸
    🙌 🙌 🙌
*/
enum EXTRAS {
    none,           // 0
    malformed,      // 1
    ju_gospode_boze // 2
}

// Basic question model abstraction
struct QuestionModel {
    string title;
    string[] options;
    uint[] scores;
    uint[3] extras;
}

struct PlatformQuestion {
    bytes32 questionHash;
    QuestionModel question;
    uint totalVoters;
    bool hasVoted;
}

contract PlatformConfig {
    uint constant public TOTAL_POINTS = 1_000_000;
    uint constant public POST_COST = 100;
    uint constant public VOTE_COST = 1;
}