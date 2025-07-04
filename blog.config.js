// 注: process.env.XX是Vercel的环境变量，配置方式见：https://docs.tangly1024.com/article/how-to-config-notion-next#c4768010ae7d44609b744e79e2f9959a

const BLOG = {
  // Important page_id！！！Duplicate Template from  https://www.notion.so/tanghh/02ab3b8678004aa69e9e415905ef32a5
  NOTION_PAGE_ID:
    process.env.NOTION_PAGE_ID ||
    '226b7f1db9f8805e9512f076fcdc8567,en:7c1d570661754c8fbc568e00a01fd70e',
  THEME: process.env.NEXT_PUBLIC_THEME || 'nobelium', // 当前主题，在themes文件夹下可找到所有支持的主题；主题名称就是文件夹名，例如 example,fukasawa,gitbook,heo,hexo,landing,matery,medium,next,nobelium,plog,simple
  LANG: process.env.NEXT_PUBLIC_LANG || 'zh-CN', // e.g 'zh-CN','en-US'  see /lib/lang.js for more.
  SINCE: process.env.NEXT_PUBLIC_SINCE || 2019, // e.g if leave this empty, current year will be used.

  PSEUDO_STATIC: process.env.NEXT_PUBLIC_PSEUDO_STATIC || false, // 伪静态路径，开启后所有文章URL都以 .html 结尾。
  NEXT_REVALIDATE_SECOND: process.env.NEXT_PUBLIC_REVALIDATE_SECOND || 5, // 更新缓存间隔 单位(秒)；即每个页面有5秒的纯静态期、此期间无论多少次访问都不会抓取notion数据；调大该值有助于节省Vercel资源、同时提升访问速率，但也会使文章更新有延迟。
  APPEARANCE: process.env.NEXT_PUBLIC_APPEARANCE || 'light', // ['light', 'dark', 'auto'], // light 日间模式 ， dark夜间模式， auto根据时间和主题自动夜间模式
  APPEARANCE_DARK_TIME: process.env.NEXT_PUBLIC_APPEARANCE_DARK_TIME || [18, 6], // 夜间模式起至时间，false时关闭根据时间自动切换夜间模式

  AUTHOR: process.env.NEXT_PUBLIC_AUTHOR || 'huoranger', // 您的昵称 例如 tangly1024
  BIO: process.env.NEXT_PUBLIC_BIO || '人生唯一确定的就是不确定的人生', // 作者简介
  LINK: process.env.NEXT_PUBLIC_LINK || 'https://acheng.vip', // 网站地址
  KEYWORDS: process.env.NEXT_PUBLIC_KEYWORD || 'Notion, 博客', // 网站关键词 英文逗号隔开
  BLOG_FAVICON: process.env.NEXT_PUBLIC_FAVICON || '/favicon.ico', // blog favicon 配置, 默认使用 /public/favicon.ico，支持在线图片，如 https://img.imesong.com/favicon.png
  BEI_AN: process.env.NEXT_PUBLIC_BEI_AN || '', // 备案号 闽ICP备XXXXXX
  BEI_AN_LINK: process.env.NEXT_PUBLIC_BEI_AN_LINK || 'https://beian.miit.gov.cn/', // 备案查询链接，如果用了萌备等备案请在这里填写

  // RSS订阅
  ENABLE_RSS: process.env.NEXT_PUBLIC_ENABLE_RSS || true, // 是否开启RSS订阅功能

  // 其它复杂配置
  // 原配置文件过长，且并非所有人都会用到，故此将配置拆分到/conf/目录下, 按需找到对应文件并修改即可
  ...require('./conf/comment.config'), // 评论插件
  ...require('./conf/contact.config'), // 作者联系方式配置
  ...require('./conf/post.config'), // 文章与列表配置
  ...require('./conf/analytics.config'), // 站点访问统计
  ...require('./conf/image.config'), // 网站图片相关配置
  ...require('./conf/font.config'), // 网站字体
  ...require('./conf/right-click-menu'), // 自定义右键菜单相关配置
  ...require('./conf/code.config'), // 网站代码块样式
  ...require('./conf/animation.config'), // 动效美化效果
  ...require('./conf/widget.config'), // 悬浮在网页上的挂件，聊天客服、宠物挂件、音乐播放器等
  ...require('./conf/ad.config'), // 广告营收插件
  ...require('./conf/plugin.config'), // 其他第三方插件 algolia全文索引

  // 高级用法
  ...require('./conf/layout-map.config'), // 路由与布局映射自定义，例如自定义特定路由的页面布局
  ...require('./conf/notion.config'), // 读取notion数据库相关的扩展配置，例如自定义表头
  ...require('./conf/dev.config'), // 开发、调试时需要关注的配置

  // 自定义外部脚本，外部样式
  CUSTOM_EXTERNAL_JS: [''], // e.g. ['http://xx.com/script.js','http://xx.com/script.js']
  CUSTOM_EXTERNAL_CSS: [''], // e.g. ['http://xx.com/style.css','http://xx.com/style.css']

  // 自定义菜单
  CUSTOM_MENU: process.env.NEXT_PUBLIC_CUSTOM_MENU || true, // 支持Menu类型的菜单，替代了3.12版本前的Page类型

  // 文章列表相关设置
  CAN_COPY: process.env.NEXT_PUBLIC_CAN_COPY || true, // 是否允许复制页面内容 默认允许，如果设置为false、则全栈禁止复制内容。

  // 侧栏布局 是否反转(左变右,右变左) 已支持主题: hexo next medium fukasawa example
  LAYOUT_SIDEBAR_REVERSE:
    process.env.NEXT_PUBLIC_LAYOUT_SIDEBAR_REVERSE || false,

  // 欢迎语打字效果,Hexo,Matery主题支持, 英文逗号隔开多个欢迎语。
  GREETING_WORDS:
    process.env.NEXT_PUBLIC_GREETING_WORDS ||
    'Hi，我是一个程序员, Hi，我是一个打工人,Hi，我是一个干饭人,欢迎来到我的博客🎉',

  // uuid重定向至 slug
  UUID_REDIRECT: process.env.UUID_REDIRECT || false,
  THEME_SWITCH: process.env.NEXT_PUBLIC_THEME_SWITCH || true, // 是否显示切换主题按钮
  // START ************网站字体*****************
  // ['font-serif','font-sans'] 两种可选，分别是衬线和无衬线: 参考 https://www.jianshu.com/p/55e410bd2115
  // 后面空格隔开的 font-light 是字体粗细，留空是默认粗细；参考 https://www.tailwindcss.cn/docs/font-weight
  FONT_STYLE: process.env.NEXT_PUBLIC_FONT_STYLE || 'font-sans font-light',

  // 字体CSS 例如 https://npm.elemecdn.com/lxgw-wenkai-webfont@1.6.0/style.css
  // 如果需要引入第三方字体，可以在此添加URL
  FONT_URL: [
    // 'https://npm.elemecdn.com/lxgw-wenkai-webfont@1.6.0/style.css',
    'https://fonts.googleapis.com/css?family=Bitter&display=swap',
    'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300&display=swap',
    'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300&display=swap'
  ],

  // 无衬线字体 例如'"LXGW WenKai"' , 如果字体有包含空格，需要用 "双 引 号" 包起来。
  FONT_SANS: [
    // '"LXGW WenKai"',
    '"PingFang SC"',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Hiragino Sans GB"',
    '"Microsoft YaHei"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    '"Segoe UI"',
    '"Noto Sans SC"',
    'HarmonyOS_Regular',
    '"Helvetica Neue"',
    'Helvetica',
    '"Source Han Sans SC"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"'
  ],


  // 衬线字体 例如'"LXGW WenKai"'
  FONT_SERIF: [
    // '"LXGW WenKai"',
    'Bitter',
    '"Noto Serif SC"',
    'SimSun',
    '"Times New Roman"',
    'Times',
    'serif',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    '"Apple Color Emoji"'
  ],
  FONT_AWESOME: process.env.NEXT_PUBLIC_FONT_AWESOME_PATH || 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css', // font-awesome 字体图标地址; 可选 /css/all.min.css ， https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/font-awesome/6.0.0/css/all.min.css

}

module.exports = BLOG
