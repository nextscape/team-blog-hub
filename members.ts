import { Member } from "@src/types";

export const members: Member[] = [
  {
    id: "ns_labo",
    name: "ネスケラボ",
    bio: "ネスケラボでは、社員が日頃どのようなことに興味をもっているのか、また、仕事を通してどのような面白いことに取り組んでいるのかを紹介します。",
    avatarSrc: "/avatars/nslab.png",
    sources: ["https://blog.nextscape.net/rss"],
    websiteUrl: "https://blog.nextscape.net/",
    twitterUsername: "nextscape",
  },
  {
    id: "ns_mr",
    name: "With MR Blog",
    bio: "HoloLens チームのブログです。",
    avatarSrc: "/avatars/hololens2.png",
    sources: ["https://withmr.nextscape.net/feed"],
    websiteUrl: "https://withmr.nextscape.net/blog",
  },
  {
    id: "ns_st",
    name: "Streaming Tech Blog",
    bio: "動画配信の基礎から最新情報までお届けするブログです。",
    avatarSrc: "/avatars/streaming.png",
    sources: ["https://media-streaming.nextscape.net/feed"],
    websiteUrl: "https://media-streaming.nextscape.net",
  },
  {
    id: "ns_thara",
    name: "Toshiyuki Hara",
    bio: "Microsoft MVP for Microsoft Azure",
    avatarSrc: "/avatars/thara.jpg",
    sources: ["https://gooner.hateblo.jp/rss"],
    websiteUrl: "https://gooner.hateblo.jp/",
    githubUsername: "thara0402",
    twitterUsername: "TonyTonyKun",
    excludeUrlRegex: "personal",
  },
  {
    id: "ns_app",
    name: "スマホ&TV",
    bio: "スマートフォン&TVアプリチームのブログです。",
    avatarSrc: "/avatars/app1.jpg",
    sources: ["https://qiita.com/NEXTSCAPE_App_T/feed"],
    websiteUrl: "https://qiita.com/NEXTSCAPE_App_T",
  }
];
