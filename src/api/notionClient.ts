import { context } from "@actions/github";
import { Client } from "@notionhq/client";

export interface NotionClient {

}

export const createNotionClient = (notionToken: string, ctx: typeof context): NotionClient => {
  const client = new Client({auth: notionToken});

  return {};
};
