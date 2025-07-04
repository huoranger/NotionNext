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
  `}</style>
}

export { Style }
