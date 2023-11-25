import { IGithubFetcher } from "./IGithubFetcher";
import { RepositoryIssues } from "./RepositoryIssues";

export class GithubFetcher implements IGithubFetcher {
    async fetchIssues(owner: string, repository: string): Promise<RepositoryIssues> {
        const url = `https://api.github.com/repos/${owner}/${repository}/issues`;
        const jsonData: any = await (await fetch(url)).json();
        const issues: RepositoryIssues = [];

        for (const rawIssue of jsonData) {
            issues.push({
                number: parseInt(rawIssue.number),
                repository: `${owner}/${repository}`,
                url: rawIssue.html_url,
                labels: (rawIssue.labels ?? []).map((e: any) => e.description),
                state: rawIssue.state ?? "N/A",
                title: rawIssue.title ?? "N/A",
                author: {
                    name: rawIssue.user.login,
                    url: rawIssue.user.html_url,
                },
            });
        }

        return issues;
    }
}
