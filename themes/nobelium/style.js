/* eslint-disable react/no-unknown-property */
/**
 * 此处样式只对当前主题生效
 * 此处不支持tailwindCSS的 @apply 语法
 * @returns
 */
const Style = () => {
  return <style jsx global>{`
    body {
      font-family: "glyph-correction", "I.MingCP", Amstelvar;
    }

    .iconfont {
      font-family: "iconfont" !important;
      font-size: 16px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
  }

    // logo 名字
    .header-name {
      font-family: 'Lato', sans-serif;
      font-weight: bold;
      line-height: 1
    }
    
    // 底色
    .dark body{
      background-color: black;
    }
    // 阅读更多
    .read-more {
    }
    .icon-right:before {
        content: "\e63b";
    }

    li .nav:hover::after{
        background: #000;
    }
    // 菜单选中样式
   li.actived .nav:after {
        background: #f12349;
   }
    li.actived .nav:after, li .nav:hover::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: -0.5rem;
        width: 4px;
        height: 4px;
        border-radius: 10px;
        margin: 0 auto;
        opacity: 1;
    }

  `}</style>
}

export { Style }
