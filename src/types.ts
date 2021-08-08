import type { WebhookPayload } from "@actions/github/lib/interfaces";

import { GitHubClient } from "./api/gitHubClient";
import { NotionClient } from "./api/notionClient";

export interface Context {
  eventName: string;
  payload: WebhookPayload;
  api: {
    gitHub: GitHubClient;
    notion: NotionClient;
  }
};

export interface Command {
  (ctx: Context): Promise<void> | void;
  ableToProcess: (ctx: Context) => boolean;
}
