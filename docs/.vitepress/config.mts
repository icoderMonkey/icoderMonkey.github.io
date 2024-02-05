import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "CoderMonkey",
  description: "Learning Roadmaps",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  themeConfig: {
    logo: "/sakuragi.png",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "主页", link: "/" },
      { text: "TypeScript", link: "/notes/typescript/intro" },
      // {
      //   text: "学习笔记",
      //   items: [{ text: "typescript", link: "/notes/typescript/intro" }],
      // },
    ],

    sidebar: [
      {
        text: "TypeScript",
        items: [
          { text: "介绍", link: "/notes/typescript/intro" },
          { text: "环境搭建", link: "/notes/typescript/setup" },
          { text: "编译器及配置文件", link: "/notes/typescript/tsc" },
          { text: "类型基础", link: "/notes/typescript/base" },
          { text: "数组", link: "/notes/typescript/array" },
          { text: "元组", link: "/notes/typescript/tuple" },
          { text: "函数", link: "/notes/typescript/function" },
          { text: "对象", link: "/notes/typescript/object" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/icoderMonkey" }],

    search: {
      provider: "local",
    },

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2023-present CoderMonkey",
    },
  },

  lastUpdated: true,

  markdown: {
    lineNumbers: true,
  },
});
