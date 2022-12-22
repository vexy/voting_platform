export class QuestionMeta {
    public owner: string;
    public title: string;
    public labels: string[];
    public scores: number[];
    public extras: number[];

    constructor(_owner: string, _title: string, _labels: string[], _scores: number[], _extras: number[]) {
        this.owner = _owner;
        this.title = _title;
        this.labels = _labels;
        this.scores = _scores;
        this.extras = _extras;
    }
}

export class QuestionInfoOutput {
    public id: number;
    public question: QuestionMeta;
    public totalVoters: number;
    public hasVoted: boolean;

    constructor(_id: number, _question: QuestionMeta, totalVoters: number, hasVoted: boolean) {
        this.id = _id;
        this.question = _question;
        this.totalVoters = totalVoters;
        this.hasVoted = hasVoted;
    }
}

export class PlatformMeta {
    public totalUsers: number;
    public totalQuestions: number;
    public isRegistered: boolean;

    // provider related
    public hasMetamask = false;
    public isConnected = false;

    constructor(
        _totalUsers: number,
        _totalQuestions: number,
        _isRegistered: boolean,
        _hasMetamask: boolean,
        _isConnected: boolean
    ){
        this.totalUsers = _totalUsers;
        this.totalQuestions = _totalQuestions;
        this.isRegistered = _isRegistered;
        this.hasMetamask = _hasMetamask;
        this.isConnected = _isConnected;
    }
}