import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "CoderMonkey",
  description: "Learning Roadmaps",
  themeConfig: {
    logo: "/assets/img/sakuragi.png",

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
