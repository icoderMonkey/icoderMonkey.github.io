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
      { text: "学习线路", link: "/roadmaps" },
      // { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "学习线路",
        items: [
          // { text: "学习线路", link: "/roadmaps" },
          // { text: "Markdown Examples", link: "/markdown-examples" },
          // { text: "Markdown Examples", link: "/markdown-examples" },
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
});
