/* eslint-disable react/no-unknown-property */
/**
 * 此处样式只对当前主题生效
 * 此处不支持tailwindCSS的 @apply 语法
 * @returns
 */
const Style = () => {
  return <style jsx global>{`
    :root {
      --theme-color: #f12349;
    }
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
        background: var(--theme-color);
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
    .post-title .menu-link:hover {
      background-size: 100% 2px;
      color: var(--theme-color);
      background-size: 100% 2px;
    }
  .post-title .menu-link{
        background-image: linear-gradient(var(--theme-color), var(--theme-color));
        background-repeat: no-repeat;
        background-position: bottom center;
        background-size: 0 2px;
        transition: background-size 100ms ease-in-out;
    }
        .pagination {
        }
        .pagination a {
        width:30px;
        height:30px;
        border-radius: 3px;
        line-height: 30px;
        font-size: 14px;
        }
        .pagination a:hover {
            background-color: rgb(240, 243, 248);
        }
          .pagination a.actived {
          color: rgb(255, 255, 255);
background-color: rgb(255, 55, 74);
        }
    .header {
        border-bottom-width: 1px;
        border-color: rgb(229 231 235 / var(--tw-border-opacity, 1));
        --tw-border-opacity: 0.5;}
.post-item {
    border-color: rgb(229 231 235 / var(--tw-border-opacity, 1));
    --tw-border-opacity: 0.5;
}
    hr.notion-hr {
            border: none;
      margin: 2.427em 0 1.5em;
      text-align: center;
      border-top:unset !important;
    }
    hr.notion-hr::after {
      content: "···";
      letter-spacing: 2em;
      padding-left: 2em;
      position: absolute;
  }
  `}</style>
}

export { Style }
