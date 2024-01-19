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
        text: "TypeScipt",
        items: [{ text: "介绍", link: "/notes/typescript/intro" }],
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
