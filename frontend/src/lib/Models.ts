export class QuestionInfo {
    public id: number;
    public owner: string;
    public title: string;
    public labels: string[];
    public scores: number[];
    public extras: number[];
    public totalVoters: number;
    public hasVoted: boolean;

    constructor(_id: number, _owner: string, _title: string, _labels: string[], _scores: number[], _extras: number[], _totalVoters: number, _hasVoted: boolean) {
        this.id = _id;
        this.owner = _owner;
        this.title = _title;
        this.labels = _labels;
        this.scores = _scores;
        this.extras = _extras;
        this.totalVoters = _totalVoters;
        this.hasVoted = _hasVoted;
    }
}