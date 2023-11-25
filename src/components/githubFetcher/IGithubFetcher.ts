import { RepositoryIssues } from "./RepositoryIssues";

export interface IGithubFetcher {
    fetchIssues(owner: string, repository: string): Promise<RepositoryIssues>;
}
