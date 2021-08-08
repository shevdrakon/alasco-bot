import { context } from "@actions/github";
import { Client } from "@notionhq/client";

import commands from "./commands";
import invalidCommand from "./commands/invalidCommand";

import { createGitHubClient, createNotionClient } from "./api";
import { getEnvValue } from "./utils";
import { Context } from "./types";

const createContext = (): Context => {
  const githubToken = getEnvValue("github-token", {required: true});
  const notionToken = getEnvValue("notion-token", {required: true});

  return {
    eventName: context.eventName,
    payload: context.payload,
    api: {
      gitHub: createGitHubClient(githubToken, context),
      notion: createNotionClient(notionToken, context),
    },
  };
};

const ctx = createContext();

// console.log(JSON.stringify(ctx, null, 2));

const executedCommands = commands
  .filter(cmd => cmd.ableToProcess(ctx))
  .map(cmd => cmd(ctx));

if (!executedCommands.length) invalidCommand(ctx);
