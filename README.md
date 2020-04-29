### vue-h5-template-vw
>vue的H5模板,采用vw适配；自由选择自己熟悉的UI组件库搭配

UI组件库
vux 基于Vue和WeUI的组件库
Vant 是有赞前端团队基于有赞统一的规范实现的 Vue 组件库，提供了一整套 UI 基础组件和业务组件
Mint UI 由饿了么前端团队推出的 Mint UI 是一个基于 Vue.js 的移动端组件库

#### vue-cli init 初始化项目
Check the features needed for your project: (Press <space> to select, <a> to toggle all, <i> to invert selection)
>(*) Babel
>( ) TypeScript
>(*) Progressive Web App (PWA) Support
>(*) Router
>(*) Vuex
>(*) CSS Pre-processors
>(*) Linter / Formatter
>( ) Unit Testing
>( ) E2E Testing


#### 移动适配 vm 尝试

```
yarn add postcss-import postcss-url autoprefixer -D
yarn add postcss-aspect-ratio-mini postcss-px-to-viewport postcss-write-svg postcss-viewport-units cssnano cssnano-preset-advanced -D

postcss-cssnext(有问题,先不添加)
```

根目录添加postcss.config.js
```
module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    'postcss-aspect-ratio-mini': {},
    'postcss-write-svg': {
      utf8: false
    },
    'postcss-px-to-viewport': {
      viewportWidth: 750, // 窗的宽度，对应的是我们设计稿的宽度，一般是750.
      viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334.
      unitPrecision: 3, // (指定`px`转换为视窗单位值的小数位数（很多时候无法整除).
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw.
      selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名.
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值.
      mediaQuery: false // 允许在媒体查询中转换`px`.
    },
    'postcss-viewport-units': {},
    cssnano: {
      preset: 'advanced',
      autoprefixer: false,
      'postcss-zindex': false
    }
  }
}
```

##### vm 降级处理 viewport-units-buggyfill
###### 前提 postcss-viewport-units插件
你的CSS中，只要使用到了viewport的单位（vw、vh、vmin或vmax ）地方，需要在样式中添加content  
```
.my-viewport-units-using-thingie {
    width: 50vmin;
    height: 50vmax;
    top: calc(50vh - 100px);
    left: calc(50vw - 100px);

    /* hack to engage viewport-units-buggyfill */
    content: 'viewport-units-buggyfill; width: 50vmin; height: 50vmax; top: calc(50vh - 100px); left: calc(50vw - 100px);';
}
```

###### 引入JavaScript文件
viewport-units-buggyfill主要有两个JavaScript文件：viewport-units-buggyfill.js和viewport-units-buggyfill.hacks.js。你只需要在你的HTML文件中引入这两个文件。比如在Vue项目中的index.html引入它们：  
```
<script src="//g.alicdn.com/fdilab/lib3rd/viewport-units-buggyfill/0.6.2/??viewport-units-buggyfill.hacks.min.js,viewport-units-buggyfill.min.js"></script>
```

###### 第二步，在HTML文件中调用viewport-units-buggyfill
```
<script>
    window.onload = function () {
        window.viewportUnitsBuggyfill.init({
            hacks: window.viewportUnitsBuggyfillHacks
        });
    }
</script>
```

###### 在img中content会引起部分浏览器下，图片不会显示。这个时候需要全局添加：
```
img {
    content: normal !important;
}
```


