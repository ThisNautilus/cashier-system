# cashier-system

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

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 项目实践过程：
#### 1.准备工作：
- Vue CLI3的安装与Vue CLI3稍有差别，具体见：https://cli.vuejs.org/zh/guide/
- 创建项目存放的母文件夹，并在当前路径下打开命令行， 输入`vue create cashier-system`,cashier-system为项目名称
- 进入模板配置，如果之前配置过模板，可直接选已经配置的模板，如果没有则需要进行配置（可参考：https://www.bilibili.com/video/av57586224/）：
    - `Manually select feature` 手动选择
    - `Babel Router Vuex CSS_Pre-processor Linter/Formatter Unit_Testing`
    - `Use history mode for router?  Y`
    - `Sass/Scss或者Less`  选择CSS预处理器
    - `Standard` 选择代码检测规范
    - `Lint on save` 代码检测时间
    - `Jest`单元测试
    - `In dedicated config files` 各自存放配置文件
    - 保存预设配置模板，并命名
- 等待安装完成即可。
#### 2.修改index.html中的标题和css样式
#### 3.Post.vue组件
- 创建Post.vue组件作为入口文件
- 在router.js中修改Post.vue的路由地址
#### 4.在Iconfont中选择合适的图标，为左侧导航栏进行准备
- 在线引用需要在index.html的head部分引入，要在链接前加：http:
- 在线引用的图标如果为彩色，使用时无法正常显示
#### 5.收银系统左侧导航栏：
- 创建单独的子组件`leftNav`并放入公共组件文件夹common中
- 设置布局和样式
- 在`App.vue`根组件中引入
    - `import leftNav from '@/components/common/leftNav.vue'`
    - `components:{leftNav}`
    - `<leftNav></leftNav>`
