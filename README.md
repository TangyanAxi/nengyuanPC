## 目录结构

```shell
.
├─ src
│   ├─assets # 静态资源目录
│   │   └─ style
│   │        └─main.scss # 公共样式
│   │
│   ├─components # 组件目录
│   │   ├─ BasicButton
│   │   │    ├─index.vue
│   │   │    └─prpos.ts
│   │   └─...
│   │ 
│   ├─enums # 枚举/常量
│   │   ├─ cacheEnum.ts
│   │   └─...
│   │ 
│   ├─pages # 页面
│   │   ├─ index
│   │   │    └─index.vue
│   │   └─...
│   │ 
│   ├─services # 接口相关
│   │   ├─ api # api  
│   │   │    ├─auth.ts
│   │   │    └─...
│   │   │
│   │   └─ model # 数据模型  
│   │        ├─authModel.d.ts
│   │        └─...
│   │ 
│   ├─settings # 设置
│   │   └─ encryptionSetting # 加密设置  
│   │
│   ├─state # 状态管理模式(pinia)
│   │   ├─ modules # 数据模块  
│   │   │    ├─auth.ts
│   │   │    └─...
│   │   │
│   │   └─ index.ts
│   │ 
│   ├─static # 静态公共文件
│   │   ├─ images # 图片  
│   │   │    ├─avatar.png
│   │   │    └─...
│   │   │
│   │   └─ ...
│   │   
│   ├─types # 类型文件
│   │   ├─ http.d.ts
│   │   └─ ...
│   │
│   └─utils # 工具类
│       ├─ catch # 缓存相关目录
│       ├─ http  # request相关目录
│       ├─ interceptors  # 拦截器相关目录
│       └─ ...
│
├─ .env
├─ .env.development
├─ .env.production
├─ .eslintignore
├─ .eslintrc.js
├─ .gitignore
├─ .prettierignore
├─ .prettierrc.js
├─ favicon.ico
├─ index.html
├─ package.json
├─ pnpm-lock.yaml
├─ README.md
├─ tree.txt
├─ tsconfig.json
└─ vite.config.ts

```

## 安装使用

- 安装依赖

```bash
pnpm install --shamefully-hoist
```

- 运行

```bash
# 其他端请查看 webpage.json script
pnpm dev:h5
```

- 打包

```bash
# 其他端请查看 webpage.json script
pnpm build:h5
```

## Git 提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中