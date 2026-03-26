import fs from "fs-extra";
import Parser from "rss-parser";
import { members } from "../../members";
import { PostItem, Member } from "../types";
export default {};

const DEFAULT_FEED_FETCH_TIMEOUT_MS = 20000;

function getFeedFetchTimeoutMs() {
  const value = Number(process.env.FEED_FETCH_TIMEOUT_MS);
  return Number.isFinite(value) && value > 0
    ? value
    : DEFAULT_FEED_FETCH_TIMEOUT_MS;
}

type FeedItem = {
  title: string;
  link: string;
  contentSnippet?: string;
  isoDate?: string;
  dateMiliSeconds: number;
};

const feedFetchTimeoutMs = getFeedFetchTimeoutMs();
const parser = new Parser({
  timeout: feedFetchTimeoutMs,
  headers: {
    "User-Agent": "team-blog-hub-feed-builder/1.0",
  },
  requestOptions: {
    agent: false,
  },
});
let allPostItems: PostItem[] = [];

async function fetchFeedItems(url: string) {
  const startedAt = Date.now();
  console.log(`[feed] start url=${url} timeoutMs=${feedFetchTimeoutMs}`);

  try {
    const feed = await parser.parseURL(url);
    if (!feed?.items?.length) {
      console.log(
        `[feed] success url=${url} durationMs=${Date.now() - startedAt} items=0`
      );
      return [];
    }

    const items = feed.items
      .map(({ title, contentSnippet, link, isoDate }) => {
        return {
          title,
          contentSnippet: contentSnippet?.replace(/\n/g, ""),
          link,
          isoDate,
          dateMiliSeconds: isoDate ? new Date(isoDate).getTime() : 0,
        };
      })
      .filter(({ title, link }) => title && link) as FeedItem[];

    console.log(
      `[feed] success url=${url} durationMs=${Date.now() - startedAt} items=${items.length}`
    );

    return items;
  } catch (error) {
    console.error(
      `[feed] failed url=${url} durationMs=${Date.now() - startedAt}`
    );
    throw error;
  }
}

async function getFeedItemsFromSources(sources: undefined | string[]) {
  if (!sources?.length) return [];
  let feedItems: FeedItem[] = [];
  for (const url of sources) {
    const items = await fetchFeedItems(url);
    if (items) feedItems = [...feedItems, ...items];
  }
  return feedItems;
}

async function getMemberFeedItems(member: Member): Promise<PostItem[]> {
  const { id, sources, name, includeUrlRegex, excludeUrlRegex } = member;
  const feedItems = await getFeedItemsFromSources(sources);
  if (!feedItems) return [];

  let postItems = feedItems.map((item) => {
    return {
      ...item,
      authorName: name,
      authorId: id,
    };
  });
  // remove items which not matches includeUrlRegex
  if (includeUrlRegex) {
    postItems = postItems.filter((item) => {
      return item.link.match(new RegExp(includeUrlRegex));
    });
  }
  // remove items which matches excludeUrlRegex
  if (excludeUrlRegex) {
    postItems = postItems.filter((item) => {
      return !item.link.match(new RegExp(excludeUrlRegex));
    });
  }

  return postItems;
}

(async function () {
  for (const member of members) {
    const items = await getMemberFeedItems(member);
    if (items) allPostItems = [...allPostItems, ...items];
  }
  allPostItems.sort((a, b) => b.dateMiliSeconds - a.dateMiliSeconds);
  fs.ensureDirSync(".contents");
  fs.writeJsonSync(".contents/posts.json", allPostItems);
})().catch((error) => {
  console.error("[feed] build failed", error);
  process.exitCode = 1;
});
