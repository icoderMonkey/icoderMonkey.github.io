# TypeScript 环境搭建

![Static Badge](https://img.shields.io/badge/nodejs-v20.11.4-blue)

## 全局安装

```bash
npm install -g typescript
```

## 项目安装

```bash
npm install --save-dev typescript
```

## 版本

```bash
tsc -v
```

**tsc** 是随着 **TypeScript** 官方提供的编译器，可以将 **TypeScript** 脚本编译成 **JavaScript** 脚本，会随着 **typescript** 一并进行安装。

## 初始化

随便创建一个空目录，我这里直接是 _ts_ 目录，接着执行以下命令来初始化一个新的项目

```bash
cd ts
npm init -y
```

在项目中安装 _typescript_ 和 _@type/node_，_@types/node_ 为 **NodeJs** 提供了一组 **TypeScript** 类型定义，可以帮助我们在编写 **TypeScript** 代码时获得更好的代码补全、静态类型检查和代码提示。

```bash
npm install typescript @types/node -D
```

创建 _main.ts_ 文件并写入以下内容

```typescript
const firstName = "Coder";
const lastName = "Monkey";
const fullName = firstName + lastName;
console.log(fullName); // CoderMonkey
```

当前目录结构如下所示

```md
.
├── node_modules
├── index.ts
├── package-lock.json
└── package.json
```

终端执行 _node index.ts_ 会打印出最终结果：CoderMonkey

```bash
node index.ts
```

如果说我想将这段 _ts_ 代码放在浏览器中去执行，应当怎么做呢？我们都知道浏览器中是不可以直接执行 **TypeScript** 代码的，因为它只能执行**JavsScript** 脚本，所以我们可以使用编译器 **tsc** 来将项目中的 _ts_ 脚本统一编译为 _js_ 脚本，这样我就可以直接在 _html_ 中去引入这个 _js_ 脚本并正常执行了

```bash
tsc index.ts
```

在命令行中执行以上代码会在 _ts_ 目录中生成 _index.js_，目录结构如下

```md
.
├── node_modules
├── index.js
├── index.ts
├── package-lock.json
└── package.json
```

点开 _index.js_ 可以发现，除了声明的关键字从 _const_ 变成了 _var_ 之外，其他的好像并没有什么区别，那是因为 _tsc_ 作为编译器，其本身也是可以高度定制化的，目前我们没有添加额外的参数或配置文件，所以编译器应用了默认的配置，至于其他更多的配置，后面会持续说明。

至此，一个简易的 _ts_ 项目就已经搭建完成了。

:tada: :tada: :tada:
