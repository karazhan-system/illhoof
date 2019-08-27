### 代号
Illhoof，卡拉赞Boss，特里斯坦.邪蹄

本服务会大量生成网站，就如同邪蹄会开启恶魔之门不断放出魔鬼一般

### 描述
站点自动化管理服务

### 说明
- admin
  - 后台管理源文件，Vue单页面应用，使用Element-ui组件库，编译到static目录
- api
  - api接口（controller方法直接放api文件里
- common
  - 通用目录（redis、数据库、枚举、路由、工具
- core
  - 核心功能（重要程度比通用目录高，比如进程啥的，感觉和common有点设计重复了，暂时没想太清楚，先这样
- middleware
  - 中间件（暂时没有
- model
  - Mongoose Model
- static
  - 静态文件
- app.config.js
  - 配置
- app.js
  - 入口

### 命令
- Admin开发模式
  - npm start
- Admin编译
  - npm run build
- 运行工程
  - node/nodemon app.js