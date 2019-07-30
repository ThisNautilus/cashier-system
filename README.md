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

#### 6.左侧结算栏和常用商品栏

左侧结算栏和常用商品栏都使用element-ui进行布局，所以安装之后，需要在main.js中导入element。由于vue-resource停止更新，使用axios从api获取数据。

- 左侧结算栏

  - 表头文字居中设置，需要将el-tabs的type设置“card”，然后设置行内样式为“header-align="center”“

#### 7.打包发布

需在打包发布前，手动创建vue.config.js配置文件：

> 运行前需先安装vconsole-webpack-plugin插件`npm install vconsole-webpack-plugin --save-dev`
>
> 再安装compression-webpack-plugin插件`npm install compression-webpack-plugin --save-dev`

```
const path = require('path');
const vConsolePlugin = require('vconsole-webpack-plugin'); // 引入 移动端模拟开发者工具 插件 （另：https://github.com/liriliri/eruda）
const CompressionPlugin = require('compression-webpack-plugin'); //Gzip
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; //Webpack包文件分析器
const baseUrl = process.env.NODE_ENV === "production" ? "/static/" : "/"; //font scss资源路径 不同环境切换控制

module.exports = {
	//基本路径
	//baseUrl: './',//vue-cli3.3以下版本使用
        publicPath:'./',//vue-cli3.3+新版本使用
	//输出文件目录
	outputDir: 'dist',
	// eslint-loader 是否在保存的时候检查
	lintOnSave: true,
	//放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
	assetsDir: 'static',
	//以多页模式构建应用程序。
	pages: undefined,
	//是否使用包含运行时编译器的 Vue 构建版本
	runtimeCompiler: false,
	//是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建，在适当的时候开启几个子进程去并发的执行压缩
	parallel: require('os').cpus().length > 1,
	//生产环境是否生成 sourceMap 文件，一般情况不建议打开
	productionSourceMap: false,
	// webpack配置
	//对内部的 webpack 配置进行更细粒度的修改 https://github.com/neutrinojs/webpack-chain see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
	chainWebpack: config => {
		/**
		 * 删除懒加载模块的prefetch，降低带宽压力
		 * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
		 * 而且预渲染时生成的prefetch标签是modern版本的，低版本浏览器是不需要的
		 */
		//config.plugins.delete('prefetch');
		//if(process.env.NODE_ENV === 'production') { // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
		//} else {// 为开发环境修改配置...
		//}
	},
	//调整 webpack 配置 https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F
	configureWebpack: config => {
		//生产and测试环境
		let pluginsPro = [
			new CompressionPlugin({ //文件开启Gzip，也可以通过服务端(如：nginx)(https://github.com/webpack-contrib/compression-webpack-plugin)
				filename: '[path].gz[query]',
				algorithm: 'gzip',
				test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$', ),
				threshold: 8192,
				minRatio: 0.8,
			}),
			//	Webpack包文件分析器(https://github.com/webpack-contrib/webpack-bundle-analyzer)
			new BundleAnalyzerPlugin(),
		];
		//开发环境
		let pluginsDev = [
			//移动端模拟开发者工具(https://github.com/diamont1001/vconsole-webpack-plugin  https://github.com/Tencent/vConsole)
			new vConsolePlugin({
				filter: [], // 需要过滤的入口文件
				enable: true // 发布代码前记得改回 false
			}),
		];
		if(process.env.NODE_ENV === 'production') { // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
			config.plugins = [...config.plugins, ...pluginsPro];
		} else {
			// 为开发环境修改配置...
			config.plugins = [...config.plugins, ...pluginsDev];
		}
	},
	css: {
		// 启用 CSS modules
		modules: false,
		// 是否使用css分离插件
		extract: true,
		// 开启 CSS source maps，一般不建议开启
		sourceMap: false,
		// css预设器配置项
		loaderOptions: {
			sass: {
				//设置css中引用文件的路径，引入通用使用的scss文件（如包含的@mixin）
				data: `
				$baseUrl: "/";
				@import '@/assets/scss/_common.scss';
				`
                                //data: `
                                //$baseUrl: "/";
                                //`
			}
		}
	},
	// webpack-dev-server 相关配置 https://webpack.js.org/configuration/dev-server/
	devServer: {
		// host: 'localhost',
		host: "0.0.0.0",
		port: 8000, // 端口号
		https: false, // https:{type:Boolean}
		open: true, //配置自动启动浏览器  http://172.16.1.12:7071/rest/mcdPhoneBar/ 
		hotOnly: true, // 热更新
		// proxy: 'http://localhost:8000'   // 配置跨域处理,只有一个代理
		proxy: { //配置自动启动浏览器
			"/rest/*": {
				target: "http://172.16.1.12:7071",
				changeOrigin: true,
				// ws: true,//websocket支持
				secure: false
			},
			"/pbsevice/*": {
				target: "http://172.16.1.12:2018",
				changeOrigin: true,
				//ws: true,//websocket支持
				secure: false
			},
		}
	},

	// 第三方插件配置 https://www.npmjs.com/package/vue-cli-plugin-style-resources-loader
	pluginOptions: {
		'style-resources-loader': {//https://github.com/yenshih/style-resources-loader
			preProcessor: 'scss',//声明类型
			'patterns': [
                                //path.resolve(__dirname, './src/assets/scss/_common.scss'), 
			],
                        //injector: 'append'
		}
	}
};
```

参考链接：https://juejin.im/post/5bd02f98e51d457a944b634f

如果需要预览打包后后果，需要将dist文件夹内的文件全部拷贝至服务器，再启动服务器来进行访问，直接双击打开，无效果。

