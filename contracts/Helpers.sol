// SPDX-License-Identifier: LGPL-3.0
pragma solidity ^0.8.9;

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

// Will be used for easier communication with external callers
struct QuestionMeta {
    address owner;
    string title;
    string description;
    string[] labels;
    uint[] scores;
    uint[3] extras;
}

struct QuestionInfoOutput {
    uint id;
    QuestionMeta question;
    uint totalVoters;
    bool hasVoted;
}

contract PlatformConfig {
    uint constant public TOTAL_POINTS = 1_000_000;
    uint constant public POST_COST = 100;
    uint constant public VOTE_COST = 1;
}