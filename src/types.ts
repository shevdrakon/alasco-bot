import type { WebhookPayload } from "@actions/github/lib/interfaces";

import { GitHubClient } from "./api/gitHubClient";

export interface Context {
  eventName: string;
  payload: WebhookPayload;
  api: {
    gitHub: GitHubClient;
    // notion: null;
  }
};

export interface Command {
  (ctx: Context): Promise<void> | void;
  ableToProcess: (ctx: Context) => boolean;
}
