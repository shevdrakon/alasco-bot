import { Command } from "../types";

const helpCommand: Command = async (ctx) => {
  const body = `
  I'm here and happy to help! :)
  - **@alasco-bot to-notion** - creates a notion page for that pr.
  `;

  await Promise.all([
    ctx.api.gitHub.issues.createComment(body),
    ctx.api.gitHub.reactions.createForIssueComment("+1"),
  ]);
};

helpCommand.ableToProcess = (ctx) => {
  if (ctx.eventName !== "issue_comment") return false;

  const comment = ctx.payload.comment?.body;
  return comment.startsWith(`@alasco-bot help`);
};

export default helpCommand;
