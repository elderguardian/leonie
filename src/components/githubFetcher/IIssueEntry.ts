export interface IIssueEntry {
    number: number,
    url: string;
    repository: string,
    title: string;
    author: {
        name: string;
        url: string;
    };
    state: string;
    labels: string[];
}