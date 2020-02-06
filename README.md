# fudan.today

fudan.today 是一款服务复旦大学生的网页应用，主要面向移动端。只需要使用现代化的浏览器打开，无需下载即可使用。

目前 fudan.today 处于内部开发状态，功能构想为

* 模拟选课，更友好的选课界面
* 课程评论，根据评论辅助选课
* 匿名树洞，分享表白或者吐槽

目前很多高校都有类似的应用，我们从中借鉴了很多

* 新加坡国立大学 [NUSMOD](https://nusmods.com/)
* 中科大 [icourse.club](https://icourse.club/) 是一个民间评课平台，气氛非常活跃
* 北大 [pkuhelper](https://pkuhelper.pku.edu.cn/hole/) 树洞非常有人气，已经获得官方支持，需要登录查看
* 北大 [品质校园](https://courses.pinzhixiaoyuan.com/) 同为民间匿名评课平台，从 pkuhelper 引流，暂时不是非常活跃，访问速度感人

## 开发技术栈

前端

* PWA
* Vue
* 目前 UI 框架为 Vuetify，计划逐渐迁移到由 tailwindcss 构建的原生 UI 组件

后端

repo 在 [api.fudan.today](https://github.com/ichn-hu/api.fudan.today)

* Typescript
* nestjs
* mysql

* [vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate) can be used to make vuex state persistant, as a proxy to `localStorage`

## For Developers

We would like to refer to the following boilerplate projects

* [beauty-vuejs-boilerplate](https://github.com/zmts/beauty-vuejs-boilerplate)
* [vue-spa-boilerplate](https://github.com/jishcem/vue-spa-boilerplate)

## Known examples

* nusmod
* [PKU Helper](https://ckcz123.com/applications/pkuhelper/)

## TODOs

* [ ] User profile (name, email, password, avatar)
* [ ] PWA support (could refer to nusmods)
* [ ] Course table and course selection simulation
* [ ] Course rate & comments
* [ ] Anonymous post and comments (shudong)

update:

1. Add master branch protection

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
