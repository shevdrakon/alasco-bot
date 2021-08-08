import { getOctokit, context } from "@actions/github";

type Reactions =
  | "+1"
  | "-1"
  | "laugh"
  | "confused"
  | "heart"
  | "hooray"
  | "rocket"
  | "eyes";

export interface GitHubClient {
  reactions: {
    createForIssueComment: (content: Reactions) => Promise<{ data: { id: number; } }>;
    deleteForIssueComment: (reactionId: number) => Promise<any>;
  },
  issues: {
    createComment: (body: string) => Promise<any>;
  }
}

export const createGitHubClient = (githubToken: string, ctx: typeof context): GitHubClient => {
  const client = getOctokit(githubToken);

  const repo = ctx.payload.repository?.name;
  if (!repo) throw new Error(`Unable to get repo name.`);

  const owner = ctx.payload.repository?.owner.login;
  if (!owner) throw new Error(`Unable to get owner login.`);

  const reactions = {
    createForIssueComment: (content: Reactions) => {
      const commentId = ctx.payload.comment?.id;
      if (!commentId) throw new Error(`Unable to get comment Id.`);

      return client.rest.reactions.createForIssueComment({
        owner,
        repo,
        comment_id: commentId,
        content,
      });
    },

    deleteForIssueComment: (reactionId: number) => {
      const commentId = ctx.payload.comment?.id;
      if (!commentId) throw new Error(`Unable to get comment Id.`);

      return client.rest.reactions.deleteForIssueComment({
        owner,
        repo,
        comment_id: commentId,
        reaction_id: reactionId
      });
    }
  };

  const issues = {
    createComment: (body: string) => {
      const issueNumber = ctx.payload.issue?.number;
      if (!issueNumber) throw new Error(`Unable to get issue number.`);

      return client.rest.issues.createComment({
        owner,
        repo,
        issue_number: issueNumber,
        body
      });
    }
  };

  return {
    reactions,
    issues,
  };
};
