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