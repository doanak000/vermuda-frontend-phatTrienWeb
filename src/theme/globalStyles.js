import { createGlobalStyle } from 'styled-components'
import { themeGet } from '@styled-system/theme-get'
export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    /* font-family:"ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro",Osaka, "メイリオ", Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif; */
    background:#ffffff;
  }
  /* .ant-layout{
    height:100vh
  } */
  .ant-layout-content {
    background:${themeGet('colors.grayBackground')};
  }

  .ant-layout-header {
    line-height: unset;
  }

  .upload-img-for-event {
    & > div {
      width: 100%;
    }
  }
  .ant-form-item-explain {
    text-align: right !important;
  }

  .ant-table-pagination.ant-pagination {
    margin-bottom: 0;
  }
`
