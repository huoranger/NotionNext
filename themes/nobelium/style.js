/* eslint-disable react/no-unknown-property */
/**
 * 此处样式只对当前主题生效
 * 此处不支持tailwindCSS的 @apply 语法
 * @returns
 */
const Style = () => {
  return <style jsx global>{`
    :root[class*="light"]  {
      --theme-color: #f12349;
      --fg-color: hsl(240, 4%, 20%);
      --color-bg: hsl(231, 14%, 10%);
    }
    :root[class*="dark"]  {
      --theme-color: #f12349;
      --fg-color: hsl(69, 9%, 84%);
      --color-bg: hsl(231, 14%, 10%);
    }

    // 滚动条
    ::-webkit-scrollbar-thumb {
      background-color: #a8a8a8;
      background-clip: padding-box ！important;
      border: 3px solid transparent !important;
      border-radius: 5px;
  }

    body {
      font-family: "glyph-correction", "I.MingCP", Amstelvar, "Misans";
      color: var(--fg-color)
    }
    .dark body {
        color: hsl(69, 9%, 84%) !important;
    }
      .inner-html {
      width: 100%;
      }
      #notion-article p {
          margin: 1em 0;
        line-height: 2;
      }
    #notion-article h2 {
      font-size: 1.8em;
      margin: 1.618em 0 1em;
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

    // nav 多彩色
    #sticky-nav.nav-colorful {
      background: linear-gradient(90deg, rgba(247, 149, 51, 0.101961) 0, rgba(243, 112, 85, 0.101961) 15%, rgba(239, 78, 123, 0.101961) 30%, rgba(161, 102, 171, 0.101961) 44%, rgba(80, 115, 184, 0.101961) 58%, rgba(16, 152, 173, 0.101961) 72%, rgba(7, 179, 155, 0.101961) 86%, rgba(109, 186, 130, 0.101961) 100%);
      backdrop-filter: saturate(180%) blur(1em);
      transition: background .5s;
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
      color: var(--theme-color);
      background-size: 100% 3px;
    }
  .post-title .menu-link{
        background-image: linear-gradient(var(--theme-color), var(--theme-color));
        background-repeat: no-repeat;
        background-position: bottom center;
        background-size: 0 3px;
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
      margin: 2rem 0 3rem;
      text-align: center;
      border-top:unset !important;
    }
    hr.notion-hr::after {
      content: "···";
      letter-spacing: 2rem;
      margin-left: -2.75rem;
      position: absolute;
  }
      .cover-inner {
        position: relative;
        z-index: 2;
        color: #fff;
        padding: 120px 40px 40px;
        background-color: #0000002b;
        transition: background-color .2s ease;
      }
              .cover-image {
position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: #00000008;
      }
      .post-cover {
              position: relative;
          background-color: #0000006b;
    transition: background-color .2s ease;}

      .cover-inner:hover {
      background-color: #0000005b;}

      // 代码块
      .notion-code {
        font-family: "glyph-correction", "Source Code Pro", "I.MingCP", monospace;
      }
      .code-toolbar {
        --tw-shadow: unset;
      }

      ::selection {
      background-color: hsla(220, 90%, 56%, 0.3);
  }
      .dark img {
          filter: brightness(75%);
          }


  `}</style>
}

export { Style }
