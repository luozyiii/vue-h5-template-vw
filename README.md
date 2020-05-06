### vue-h5-template-vw
>vue的H5模板,采用vw适配；自由选择自己熟悉的UI组件库搭配

Github:  
https://github.com/luozyiii/vue-h5-template-vw

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

#### 资源引入
@ is an alias to /src

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
    autoprefixer: {},
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

1.postcss-import   
postcss-import主要功有是解决@import引入路径问题。使用这个插件，可以让你很轻易的使用本地文件、node_modules或者web_modules的文件。这个插件配合postcss-url让你引入文件变得更轻松  

2.postcss-url  
该插件主要用来处理文件，比如图片文件、字体文件等引用路径的处理。  

3.autoprefixer  
autoprefixer插件是用来自动处理浏览器前缀的一个插件。如果你配置了postcss-cssnext，其中就已具备了autoprefixer的功能。在配置的时候，未显示的配置相关参数的话，表示使用的是Browserslist指定的列表参数，你也可以像这样来指定last 2 versions 或者 > 5%。  

4.postcss-cssnext(安装后运行报错，暂无安装)  
postcss-cssnext其实就是cssnext。该插件可以让我们使用CSS未来的特性，其会对这些特性做相关的兼容性处理。  

5.cssnano  
cssnano主要用来压缩和清理CSS代码。在Webpack中，cssnano和css-loader捆绑在一起，所以不需要自己加载它。不过你也可以使用postcss-loader显式的使用cssnano。  
在cssnano的配置中，使用了preset: "advanced"，所以我们需要另外安装  
```
yarn add cssnano-preset-advanced -D
```

cssnano集成了一些其他的PostCSS插件，如果你想禁用cssnano中的某个插件的时候，可以像下面这样操作：  
```
"cssnano": {
    autoprefixer: false,
    "postcss-zindex": false
}
```

6.postcss-px-to-viewport  
postcss-px-to-viewport插件主要用来把px单位转换为vw、vh、vmin或者vmax这样的视窗单位，也是vw适配方案的核心插件之一 。  
```
"postcss-px-to-viewport": {
    viewportWidth: 750,      // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
    viewportHeight: 1334,    // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
    unitPrecision: 3,        // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
    viewportUnit: 'vw',      // 指定需要转换成的视窗单位，建议使用vw
    selectorBlackList: ['.ignore', '.hairlines'],  // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
    minPixelValue: 1,       // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
    mediaQuery: false       // 允许在媒体查询中转换`px`
}
```

7.postcss-aspect-ratio-mini  
postcss-aspect-ratio-mini主要用来处理元素容器宽高比。在实际使用的时候，具有一个默认的结构    
```
<div aspectratio>
    <div aspectratio-content></div>
</div>
```

结构定义之后，需要在你的样式文件中添加一个统一的宽度比默认属性  
```
[aspectratio] {
    position: relative;
}
[aspectratio]::before {
    content: '';
    display: block;
    width: 1px;
    margin-left: -1px;
    height: 0;
}

[aspectratio-content] {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
}
```

有一点需要特别注意：aspect-ratio属性不能和其他属性写在一起，否则编译出来的属性只会留下aspect-ratio的值，比如：  
```
// 正确写法
[w-188-246] {
    aspect-ratio: '188:246';
}
// 错误写法 
[w-188-246] {
    width: 188px;
    background-color: red;
    aspect-ratio: '188:246';
}

<div aspectratio w-188-246 class="color"></div>
```

8.postcss-write-svg  
主要用来处理移动端1px的解决方案。该插件主要使用的是border-image和background来做1px的相关处理。  
```
// border-image 方式(无效)
@svg 1px-border {
    height: 2px;
    @rect {
        fill: var(--color, black);
        width: 100%;
        height: 50%;
    }
}
.example {
    border: 1px solid transparent;
    border-image: svg(1px-border param(--color #00b1ff)) 2 2 stretch;
}

// 编译后出来
.example {
    border: 1px solid transparent;
    border-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' height='2px'%3E%3Crect fill='%2300b1ff' width='100%25' height='50%25'/%3E%3C/svg%3E") 2 2 stretch;
}


// background-image 方式(推荐)
@svg square {
  @rect {
    fill: var(--color, black);
    width: 100%;
    height: 100%;
  }
}

#example {
  height: 1px;
  background: white svg(square param(--color #00b1ff));
}

// 编译后出来
#example {
  height: 1px;
  background: white url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%2300b1ff' width='100%25' height='100%25'/%3E%3C/svg%3E");
}

```

9.postcss-viewport-units  
postcss-viewport-units插件主要是给CSS的属性添加content的属性，配合viewport-units-buggyfill库给vw、vh、vmin和vmax做适配的操作。  


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

#### router
##### keep-alive
```
<template>
  <div id="app">
    <keep-alive :include="includeAlives">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      includeAlives: []
    }
  },
  watch: {
    $route: {
      handler (cur) {
        this.aliveHandle()
      },
      immediate: true
    }
  },
  methods: {
    aliveHandle () {
      if (this.$route.meta.keepAlive) {
        for (const matchRoute of this.$route.matched) {
          const componentName = matchRoute.components.default.name
          if (matchRoute.meta.keepAlive) {
            // 缓存
            if (this.includeAlives.indexOf(componentName) === -1) {
              this.includeAlives.push(componentName)
            }
          } else {
            // 清除缓存
            const index = this.includeAlives.indexOf(componentName)
            if (index > -1) {
              this.includeAlives.splice(index, 1)
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/style/common.scss";
</style>
```

还需路由配置
```
meta: {
  keepAlive: true
}
```

#### axios
```
yarn add axios -D
```
目录
```
api
  axios.js
  index.js
```

挂载到全局main.js
```
import api from '@/api'

Vue.prototype.api = api
```




