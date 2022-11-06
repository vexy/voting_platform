// Simple data model holding questions
export class Question {
    public id: number
    public title: string
    public labels: string[]
    // public scores
    // TODO add later

    constructor(id: number, title: string) {
        this.id = id;
        this.title = title;
        this.labels = [];
    }
}

export class QuestionInfo {
    public title: string;
    public labels: string[];
    public scores: number[];
    public extras: number[];

    constructor(_title: string, _labels: string[], _scores: number[], _extras: number[]) {
        this.title = _title;
        this.labels = _labels;
        this.scores = _scores;
        this.extras = _extras;
    }
}