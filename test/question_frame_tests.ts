import { ethers } from "hardhat";
import { expect } from "chai";
import type { QuestionFrame } from "../typechain-types";

describe("Testing Suite :: [QuestionFrame contract]", async function () {
    let frame: QuestionFrame;

    // create dummy question and setup base contract
    beforeEach(async function () {
        const [ baseSigner ] = await ethers.getSigners();
        const dummyQuestion = ["New title", ["Yes", "No", "Maybe"]];
        frame = await ethers.deployContract("QuestionFrame", dummyQuestion, baseSigner);
    });

    async function getSigner(signerID: number) {
        return (await ethers.getSigners())[signerID];
    }

    context("Initialization", async function() {
        it("Can initialize properly", async function () {
            const hash = await frame.questionHash();
            const votersCount = await frame.votersCount();
            const hasVoted = await frame.hasVoted();

            expect(hash).to.equal("0x2b4e0243f84b0f82ddfd77fd25a6d1dcb2dbe05cafa154877e1b34fc145be8a0");
            expect(votersCount).to.equal(0);
            expect(hasVoted).to.equal(false);
        });

        it("Can produce PlatformQuestion", async function() {
            const platformQuestion = await frame.constructPlatformQuestion();
    
            expect(platformQuestion.questionHash).to.equal(await frame.questionHash());
            expect(platformQuestion.question.title).to.equal("New title");
            expect(platformQuestion.question.options[0]).to.equal("Yes");
            expect(platformQuestion.question.options[1]).to.equal("No");
            expect(platformQuestion.question.options[2]).to.equal("Maybe");
            expect(platformQuestion.question.scores[0]).to.equal(0);
            expect(platformQuestion.question.scores[1]).to.equal(0);
            expect(platformQuestion.question.scores[2]).to.equal(0);
            expect(platformQuestion.question.extras[0]).to.equal(0);
            expect(platformQuestion.question.extras[1]).to.equal(0);
            expect(platformQuestion.question.extras[2]).to.equal(0);
            expect(platformQuestion.totalVoters).to.equal(0);
            expect(platformQuestion.hasVoted).to.equal(false);
        });
    })

    context("Scoring mechanics", async function() {
        it("Can accept score", async function() {
            await frame.score(0);
            const response = await frame.constructPlatformQuestion();

            expect(response.question.scores[0]).to.equal(1);
            expect(response.question.scores[1]).to.equal(0);
            expect(response.question.scores[2]).to.equal(0);
            expect(response.question.extras[0]).to.equal(0);
            expect(response.question.extras[1]).to.equal(0);
            expect(response.question.extras[2]).to.equal(0);
            expect(response.totalVoters).to.equal(1);
            expect(response.hasVoted).to.equal(true);
        });

        it("Can accept extra score", async function() {
            await frame.extra(0);
            const response = await frame.constructPlatformQuestion();

            expect(response.question.scores[0]).to.equal(0);
            expect(response.question.scores[1]).to.equal(0);
            expect(response.question.scores[2]).to.equal(0);
            expect(response.question.extras[0]).to.equal(1);
            expect(response.question.extras[1]).to.equal(0);
            expect(response.question.extras[2]).to.equal(0);
            expect(response.totalVoters).to.equal(1);
            expect(response.hasVoted).to.equal(true);
        });
    })

    context("Double vote prevention", async function() {
        it("Does not accept double votes", async function() {
            try {
                // try to vote twice for the same question
                await frame.score(0);
                await frame.score(0);
                expect.fail("Should not allow double votes.");
            } catch { } // everything is fine, just pass the test
        });

        it("Does not accept double extra votes", async function() {
            try {
                // try to vote extra for the same question
                await frame.extra(0);
                await frame.extra(0);
                expect.fail("Should not allow double extra votes");
            } catch { } 
        });

        it("Does not accept additional vote", async function() {
            try {
                // try to vote twice using different options
                await frame.score(0);
                await frame.score(1);
                expect.fail("Should not allow double votes.");
            } catch { } // everything is fine, just pass the test
        });

        it("Does not accept double additional extra vote", async function() {
            try {
                // try to extra vote twice using different options
                await frame.extra(0);
                await frame.extra(1);
                expect.fail("Should not allow double votes.");
            } catch { } // everything is fine, just pass the test
        });
    })

    context("Proper 'hasVoted' dynamics", async function() {
        it("Owner 'hasVoted' changes accordingly", async function() {
            const initialState = await frame.constructPlatformQuestion();

            expect(initialState.question.scores[0]).to.equal(0);
            expect(initialState.question.scores[1]).to.equal(0);
            expect(initialState.question.scores[2]).to.equal(0);
            expect(initialState.question.extras[0]).to.equal(0);
            expect(initialState.question.extras[1]).to.equal(0);
            expect(initialState.question.extras[2]).to.equal(0);
            expect(initialState.totalVoters).to.equal(0);
            expect(initialState.hasVoted).to.equal(false);

            // perform scoring and observe change
            await frame.score(0);
            const response = await frame.constructPlatformQuestion();

            expect(response.question.scores[0]).to.equal(1);
            expect(response.question.scores[1]).to.equal(0);
            expect(response.question.scores[2]).to.equal(0);
            expect(response.question.extras[0]).to.equal(0);
            expect(response.question.extras[1]).to.equal(0);
            expect(response.question.extras[2]).to.equal(0);
            expect(response.totalVoters).to.equal(1);
            expect(response.hasVoted).to.equal(true);
        });

        it("Owner's 'hasVoted' state changes after user's vote", async function() {
            // connect as user1 and observe status
            const user1 = await getSigner(1);
            let user1Resp = await frame.connect(user1).constructPlatformQuestion();
            //
            expect(user1Resp.question.scores[0]).to.equal(0);
            expect(user1Resp.question.scores[1]).to.equal(0);
            expect(user1Resp.question.scores[2]).to.equal(0);
            expect(user1Resp.question.extras[0]).to.equal(0);
            expect(user1Resp.question.extras[1]).to.equal(0);
            expect(user1Resp.question.extras[2]).to.equal(0);
            expect(user1Resp.totalVoters).to.equal(0);
            expect(user1Resp.hasVoted).to.equal(false);

            // get initial owner's state
            let ownerResponse = await frame.constructPlatformQuestion();
            //
            expect(ownerResponse.question.scores[0]).to.equal(0);
            expect(ownerResponse.question.scores[1]).to.equal(0);
            expect(ownerResponse.question.scores[2]).to.equal(0);
            expect(ownerResponse.question.extras[0]).to.equal(0);
            expect(ownerResponse.question.extras[1]).to.equal(0);
            expect(ownerResponse.question.extras[2]).to.equal(0);
            expect(ownerResponse.totalVoters).to.equal(0);
            expect(ownerResponse.hasVoted).to.equal(false);

            // now perform additional vote as user1 (pick option 1, not 0 this time)
            await frame.connect(user1).score(1);
            user1Resp = await frame.connect(user1).constructPlatformQuestion();
            //
            expect(user1Resp.question.scores[0]).to.equal(0);
            expect(user1Resp.question.scores[1]).to.equal(1);
            expect(user1Resp.question.scores[2]).to.equal(0);
            expect(user1Resp.question.extras[0]).to.equal(0);
            expect(user1Resp.question.extras[1]).to.equal(0);
            expect(user1Resp.question.extras[2]).to.equal(0);
            expect(user1Resp.totalVoters).to.equal(1);
            expect(user1Resp.hasVoted).to.equal(true);

            // check owner again
            ownerResponse = await frame.constructPlatformQuestion();
            //
            expect(ownerResponse.question.scores[0]).to.equal(0);
            expect(ownerResponse.question.scores[1]).to.equal(1);
            expect(ownerResponse.question.scores[2]).to.equal(0);
            expect(ownerResponse.question.extras[0]).to.equal(0);
            expect(ownerResponse.question.extras[1]).to.equal(0);
            expect(ownerResponse.question.extras[2]).to.equal(0);
            expect(ownerResponse.totalVoters).to.equal(1);
            expect(ownerResponse.hasVoted).to.equal(false);
        });

        it("User 'hasVoted' stays 'false' after someone's vote", async function() {
            const user1 = await getSigner(1);
            let user1Resp = await frame.connect(user1).constructPlatformQuestion();

            expect(user1Resp.question.scores[0]).to.equal(0);
            expect(user1Resp.question.scores[1]).to.equal(0);
            expect(user1Resp.question.scores[2]).to.equal(0);
            expect(user1Resp.question.extras[0]).to.equal(0);
            expect(user1Resp.question.extras[1]).to.equal(0);
            expect(user1Resp.question.extras[2]).to.equal(0);
            expect(user1Resp.totalVoters).to.equal(0);
            expect(user1Resp.hasVoted).to.equal(false);

            // perform scoring and observe change (as owner)
            await frame.score(0);
            const response = await frame.constructPlatformQuestion();

            expect(response.question.scores[0]).to.equal(1);
            expect(response.question.scores[1]).to.equal(0);
            expect(response.question.scores[2]).to.equal(0);
            expect(response.question.extras[0]).to.equal(0);
            expect(response.question.extras[1]).to.equal(0);
            expect(response.question.extras[2]).to.equal(0);
            expect(response.totalVoters).to.equal(1);
            expect(response.hasVoted).to.equal(true);

            // now connect as user1 and observe status
            user1Resp = await frame.connect(user1).constructPlatformQuestion();

            expect(user1Resp.question.scores[0]).to.equal(1);
            expect(user1Resp.question.scores[1]).to.equal(0);
            expect(user1Resp.question.scores[2]).to.equal(0);
            expect(user1Resp.question.extras[0]).to.equal(0);
            expect(user1Resp.question.extras[1]).to.equal(0);
            expect(user1Resp.question.extras[2]).to.equal(0);
            expect(user1Resp.totalVoters).to.equal(1);
            expect(user1Resp.hasVoted).to.equal(false);
        });

        it("User 'hasVoted' remains persistant", async function() {
            // connect as user1 and observe status
            const user1 = await getSigner(1);
            let user1Resp = await frame.connect(user1).constructPlatformQuestion();

            expect(user1Resp.question.scores[0]).to.equal(0);
            expect(user1Resp.question.scores[1]).to.equal(0);
            expect(user1Resp.question.scores[2]).to.equal(0);
            expect(user1Resp.question.extras[0]).to.equal(0);
            expect(user1Resp.question.extras[1]).to.equal(0);
            expect(user1Resp.question.extras[2]).to.equal(0);
            expect(user1Resp.totalVoters).to.equal(0);
            expect(user1Resp.hasVoted).to.equal(false);

            // perform scoring and observe change (as owner)
            await frame.score(0);
            const response = await frame.constructPlatformQuestion();

            expect(response.question.scores[0]).to.equal(1);
            expect(response.question.scores[1]).to.equal(0);
            expect(response.question.scores[2]).to.equal(0);
            expect(response.question.extras[0]).to.equal(0);
            expect(response.question.extras[1]).to.equal(0);
            expect(response.question.extras[2]).to.equal(0);
            expect(response.totalVoters).to.equal(1);
            expect(response.hasVoted).to.equal(true);

            // now check state of user1 
            user1Resp = await frame.connect(user1).constructPlatformQuestion();
            //
            expect(user1Resp.question.scores[0]).to.equal(1);
            expect(user1Resp.question.scores[1]).to.equal(0);
            expect(user1Resp.question.scores[2]).to.equal(0);
            expect(user1Resp.question.extras[0]).to.equal(0);
            expect(user1Resp.question.extras[1]).to.equal(0);
            expect(user1Resp.question.extras[2]).to.equal(0);
            expect(user1Resp.totalVoters).to.equal(1);
            expect(user1Resp.hasVoted).to.equal(false);
        });

        it("User's 'hasVoted' state changes after owner vote", async function() {
            // connect as user1 and observe status
            const user1 = await getSigner(1);
            let user1Resp = await frame.connect(user1).constructPlatformQuestion();
            //
            expect(user1Resp.question.scores[0]).to.equal(0);
            expect(user1Resp.question.scores[1]).to.equal(0);
            expect(user1Resp.question.scores[2]).to.equal(0);
            expect(user1Resp.question.extras[0]).to.equal(0);
            expect(user1Resp.question.extras[1]).to.equal(0);
            expect(user1Resp.question.extras[2]).to.equal(0);
            expect(user1Resp.totalVoters).to.equal(0);
            expect(user1Resp.hasVoted).to.equal(false);

            // perform scoring and observe change (as owner)
            await frame.score(0);
            const response = await frame.constructPlatformQuestion();
            //
            expect(response.question.scores[0]).to.equal(1);
            expect(response.question.scores[1]).to.equal(0);
            expect(response.question.scores[2]).to.equal(0);
            expect(response.question.extras[0]).to.equal(0);
            expect(response.question.extras[1]).to.equal(0);
            expect(response.question.extras[2]).to.equal(0);
            expect(response.totalVoters).to.equal(1);
            expect(response.hasVoted).to.equal(true);

            // now perform additional vote as user1 (pick option 1, not 0 this time)
            await frame.connect(user1).score(1);
            user1Resp = await frame.connect(user1).constructPlatformQuestion();
            //
            expect(user1Resp.question.scores[0]).to.equal(1);
            expect(user1Resp.question.scores[1]).to.equal(1);
            expect(user1Resp.question.scores[2]).to.equal(0);
            expect(user1Resp.question.extras[0]).to.equal(0);
            expect(user1Resp.question.extras[1]).to.equal(0);
            expect(user1Resp.question.extras[2]).to.equal(0);
            expect(user1Resp.totalVoters).to.equal(2);
            expect(user1Resp.hasVoted).to.equal(true);
        });

        it("Three users 'hasVoted' test", async function() {
            const user1 = await getSigner(1);
            const user2 = await getSigner(2);
            const user3 = await getSigner(3);

            let user1Resp = await frame.connect(user1).constructPlatformQuestion();
            let user2Resp = await frame.connect(user2).constructPlatformQuestion();
            let user3Resp = await frame.connect(user3).constructPlatformQuestion();
            //
            expect(user1Resp.question.scores[0]).to.equal(0);
            expect(user1Resp.question.scores[1]).to.equal(0);
            expect(user1Resp.question.scores[2]).to.equal(0);
            expect(user1Resp.question.extras[0]).to.equal(0);
            expect(user1Resp.question.extras[1]).to.equal(0);
            expect(user1Resp.question.extras[2]).to.equal(0);
            expect(user1Resp.totalVoters).to.equal(0);
            expect(user1Resp.hasVoted).to.equal(false);
            //
            expect(user2Resp.question.scores[0]).to.equal(0);
            expect(user2Resp.question.scores[1]).to.equal(0);
            expect(user2Resp.question.scores[2]).to.equal(0);
            expect(user2Resp.question.extras[0]).to.equal(0);
            expect(user2Resp.question.extras[1]).to.equal(0);
            expect(user2Resp.question.extras[2]).to.equal(0);
            expect(user2Resp.totalVoters).to.equal(0);
            expect(user2Resp.hasVoted).to.equal(false);
            //
            expect(user3Resp.question.scores[1]).to.equal(0);
            expect(user3Resp.question.scores[2]).to.equal(0);
            expect(user3Resp.question.extras[0]).to.equal(0);
            expect(user3Resp.question.extras[1]).to.equal(0);
            expect(user3Resp.question.extras[2]).to.equal(0);
            expect(user3Resp.totalVoters).to.equal(0);
            expect(user3Resp.hasVoted).to.equal(false);

            // now vote as owner and repeat tests
            await frame.score(0);
            const response = await frame.constructPlatformQuestion();
            //
            expect(response.question.scores[0]).to.equal(1);
            expect(response.question.scores[1]).to.equal(0);
            expect(response.question.scores[2]).to.equal(0);
            expect(response.question.extras[0]).to.equal(0);
            expect(response.question.extras[1]).to.equal(0);
            expect(response.question.extras[2]).to.equal(0);
            expect(response.totalVoters).to.equal(1);
            expect(response.hasVoted).to.equal(true);

            // now check all three users once again
            user1Resp = await frame.connect(user1).constructPlatformQuestion();
            user2Resp = await frame.connect(user2).constructPlatformQuestion();
            user3Resp = await frame.connect(user3).constructPlatformQuestion();
            //
            expect(user1Resp.question.scores[0]).to.equal(1);
            expect(user1Resp.question.scores[1]).to.equal(0);
            expect(user1Resp.question.scores[2]).to.equal(0);
            expect(user1Resp.question.extras[0]).to.equal(0);
            expect(user1Resp.question.extras[1]).to.equal(0);
            expect(user1Resp.question.extras[2]).to.equal(0);
            expect(user1Resp.totalVoters).to.equal(1);
            expect(user1Resp.hasVoted).to.equal(false);
            //
            expect(user2Resp.question.scores[0]).to.equal(1);
            expect(user2Resp.question.scores[1]).to.equal(0);
            expect(user2Resp.question.scores[2]).to.equal(0);
            expect(user2Resp.question.extras[0]).to.equal(0);
            expect(user2Resp.question.extras[1]).to.equal(0);
            expect(user2Resp.question.extras[2]).to.equal(0);
            expect(user2Resp.totalVoters).to.equal(1);
            expect(user2Resp.hasVoted).to.equal(false);
            //
            expect(user3Resp.question.scores[0]).to.equal(1);
            expect(user3Resp.question.scores[1]).to.equal(0);
            expect(user3Resp.question.scores[2]).to.equal(0);
            expect(user3Resp.question.extras[0]).to.equal(0);
            expect(user3Resp.question.extras[1]).to.equal(0);
            expect(user3Resp.question.extras[2]).to.equal(0);
            expect(user3Resp.totalVoters).to.equal(1);
            expect(user3Resp.hasVoted).to.equal(false);
        });
    });

    context("Voters count dynamics", async function() {
        it("Owner can see voters increase", async function() {
            const initialState = await frame.constructPlatformQuestion();

            expect(initialState.totalVoters).to.equal(0);
            expect(initialState.hasVoted).to.equal(false);

            // perform scoring and observe change
            await frame.score(0);
            const response = await frame.constructPlatformQuestion();

            expect(response.totalVoters).to.equal(1);
            expect(response.hasVoted).to.equal(true);
        });

        it("User can see voters increase", async function() {
            const initialState = await frame.constructPlatformQuestion();
            //
            expect(initialState.totalVoters).to.equal(0);
            expect(initialState.hasVoted).to.equal(false);

            // perform scoring and observe change
            await frame.score(0);
            const response = await frame.constructPlatformQuestion();
            //
            expect(response.totalVoters).to.equal(1);
            expect(response.hasVoted).to.equal(true);

            const user1 = await getSigner(1);
            const user1Resp = await frame.connect(user1).constructPlatformQuestion();
            //
            expect(user1Resp.totalVoters).to.equal(1);
            expect(user1Resp.hasVoted).to.equal(false);
        });

        it("Users can observe voting of other users", async function() {
            const user1 = await getSigner(1);
            const user2 = await getSigner(2);

            // perform scoring (as owner) and observe change
            await frame.score(0);
            let ownerResp = await frame.constructPlatformQuestion();
            let user1Resp = await frame.connect(user1).constructPlatformQuestion();
            let user2Resp = await frame.connect(user1).constructPlatformQuestion();
            //
            expect(ownerResp.totalVoters).to.equal(1);
            expect(ownerResp.hasVoted).to.equal(true);
            //
            expect(user1Resp.totalVoters).to.equal(1);
            expect(user1Resp.hasVoted).to.equal(false);
            //
            expect(user2Resp.totalVoters).to.equal(1);
            expect(user2Resp.hasVoted).to.equal(false);

            // perform vote as user2 and observe changes
            await frame.connect(user2).score(1);    // pick different option this time
            ownerResp = await frame.constructPlatformQuestion();
            user1Resp = await frame.connect(user1).constructPlatformQuestion();
            user2Resp = await frame.connect(user2).constructPlatformQuestion();
            //
            expect(ownerResp.totalVoters).to.equal(2);
            expect(ownerResp.hasVoted).to.equal(true);
            expect(ownerResp.question.scores[0]).to.equal(1);
            expect(ownerResp.question.scores[1]).to.equal(1);
            //
            expect(user1Resp.totalVoters).to.equal(2);
            expect(user1Resp.hasVoted).to.equal(false);
            expect(user1Resp.question.scores[0]).to.equal(1);
            expect(user1Resp.question.scores[1]).to.equal(1);
            //
            expect(user2Resp.question.scores[0]).to.equal(1);
            expect(user2Resp.question.scores[1]).to.equal(1);
            expect(user2Resp.totalVoters).to.equal(2);
            expect(user2Resp.hasVoted).to.equal(true);
        })
    });
});