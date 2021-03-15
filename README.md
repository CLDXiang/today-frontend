# fdxk.info

fdxk.info 是一款服务复旦大学生的 Web 应用，主要面向移动端。

目前 fdxk.info 处于内部开发状态，功能构想为

* 课表
* 评课
* 匿名树洞

目前很多高校都有类似的应用，我们从中借鉴了很多

* 新加坡国立大学 [NUSMOD](https://nusmods.com/)
* 中科大 [icourse.club](https://icourse.club/) 是一个民间评课平台，气氛非常活跃
* 北大 [pkuhelper](https://pkuhelper.pku.edu.cn/hole/) 树洞非常有人气，已经获得官方支持，需要登录查看
* 北大 [品质校园](https://courses.pinzhixiaoyuan.com/) 同为民间匿名评课平台，从 pkuhelper 引流，暂时不是非常活跃，访问速度感人

## 开发技术栈

前端

* Vue3
* TypeScript
* PWA
* TailwindCSS
* Ant Design Vue（正在逐步移除）

* TypeScript
* Nest.js
* MySQL

## 如何开始

### 前置需求

需要有 Node.js 14+ 运行环境

需要安装 yarn，在 Node 已安装的情况下，可以通过

```sh
npm install -g yarn
```

安装 yarn

### 配置环境变量并安装依赖

需要用 `.env.local` 文件指定本地开发时连接的后端地址，如果需要连接线上服务，只需要拷贝 `.env.production` 文件后重命名为 `.env.local` 即可

第一次运行前或 `package.json` 中依赖包被修改后，需要运行以下命令来更新项目依赖：

```sh
yarn
```

### 进入开发模式

如果要进行开发，请使用 VSCode 来编辑代码，并确保安装所有工作区推荐的插件：`.vscode/extensions.json`

运行以下命令进入开发模式：

```sh
yarn dev
```

### 发布

该项目已配置完整的 CICD 流，PR 合入 master 分支后会自动发布到线上

## 开源准备

- [ ] 选取开源协议
- [ ] 课程数据 JSON 文件交给后端，并且清除 Git 中所有巨大文件的 history
- [ ] 重写 README，着重关注贡献流程指南
- [ ] 整理 Issues 和 PR tags
- [ ] 整理 branches
- [ ] 代码安全性审查
