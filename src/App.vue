<template>
  <div id="app">
    <header class="header">
      <div class="inner">
        <router-link to="/">Home</router-link>
        <!-- <router-link to="/test">Test</router-link> -->
      </div>
    </header>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<style>
  div, p, dl, dd, h1, h2, h3, h4, h5, h6, a, b, u, em, input, textarea, button, select, form, section, label, span, td, li, nav, footer, body, ul, i { -webkit-box-sizing: border-box; -webkit-tap-highlight-color: rgba(0,0,0,0); padding: 0; margin: 0; }
  ul, li, ol { list-style: none; }
  a, img, button{-webkit-touch-callout:none; -webkit-user-select:none;}
  a:focus, a:active, a:hover, input, button, textarea { outline: none; }
  table { border-collapse: collapse; }
  body, td, input, textarea, option, select, button {font-family:"Roboto",helvetica,arial,"Microsoft YaHei","Heiti SC"; -webkit-text-size-adjust: none; }
  em, i{font-style:normal;}
  p{-webkit-text-size-adjust: none !important;}
  a{text-decoration:none;}
  img{display:block}
  html, body { height: 100%; font-family: Roboto,Tahoma,Arial,'Droid Sans','Helvetica Neue','Droid Sans Fallback','Heiti SC','Hiragino Sans GB',"Microsoft YaHei",Simsun,sans-self; }
  .clearfix:after{content: ''; display: block; overflow: hidden; visibility: hidden; clear: both;}
  body { background-color: #fff; max-width: 640px; margin: 0 auto; color:#222; font-size: 0.875rem; }
  #app { height: 100%; }
  .view {
    background-color: #fff;
    min-height: 100%;
    max-width: 640px;
    margin: 0 auto;
    position: relative;
    margin-top: 52px;
  }
  .header {
    /*background-color: #ff6600;*/
    background-color: #260e08;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
  }
  .header .inner {
    padding: 10px;
  }
  .header a {
    color: #fff;
    font-size: 16px;
    line-height: 32px;
    margin-right: 10px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .2s ease
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
  /* ----------- iPhone 4 and 4S and 5 and 5S ----------- */
  @media only screen
    and (device-width: 320px)
    and (-webkit-min-device-pixel-ratio: 2) {
    html {
      font-size: 88.9%;
    }
  }

  /* ----------- Galaxy S3 ----------- */
  @media only screen
    and (device-width: 320px)
    and (-webkit-min-device-pixel-ratio: 3) {
    html {
      font-size: 88.9%;
    }
  }

  /* ----------- iPhone 6 ----------- */
  @media only screen
    and (device-width: 375px)
    and (-webkit-min-device-pixel-ratio: 2) {
    html {
      font-size: 104%;
    }
  }

  /* ----------- iPhone 6+ ----------- */
  @media only screen
    and (device-width: 414px)
    and (-webkit-min-device-pixel-ratio: 3) {
    html {
      font-size: 115%;
    }
  }

  /* ----------- Galaxy S5 ----------- */

  @media screen
    and (device-width: 360px) {
    html {
      font-size: 100%;
    }
  }

  /* ----------- Other ----------- */
  @media screen
    and (min-width: 415px)
    and (max-width: 465px) {
    html {
      font-size: 122%;
    }
  }

  @media screen
    and (min-width: 465px)
    and (max-width: 515px) {
    html {
      font-size: 135%;
    }
  }

  @media screen
    and (min-width: 515px)
    and (max-width: 565px) {
    html {
      font-size: 150%;
    }
  }

  @media screen
    and (min-width: 565px)
    and (max-width: 615px) {
    html {
      font-size: 161%;
    }
  }

  @media screen
    and (min-width: 615px)
    and (max-width: 640px) {
    html {
      font-size: 175%;
    }
  }

  @media screen
    and (min-width: 640px) {
    html {
      font-size: 177%;
    }
  }
</style>
