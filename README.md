### 样式处理流程

```
在config-provider中使用 provide/inject 配置全局变量。组件config-provider可作为变量的输入口。
在各组件中使用genComponentStyleHook生成wrapSSR即useStyleRegister钩子，在useStyleRegister钩
子中对styleFn返回的styleInterplation进行处理。用parseStyle将styleInterplation递归处理成一个字符串。
使用injectCss方法将处理的到css字符串用style标签包裹插入到container中。
```

如何注入全局style token?

```
1.全局的seedToken在useCacheToken中开始注入. 将defaultPresetColorss进行衍生，通过@ant-design/color中的generate方法生成对应的色值。比如 blue => [blue, blue-1, blue-2, ...]。
2.使用genColorMapToken根据SeedToken生成对应的色值，同样的，也是利用color中的generate方法。

整体思路如下:
在themes/seed中定义需要用到的常量, 然后在shared中衍生或计算出系统中需要用到的各种样式值。
1.generateColorPalettes 使用generate方法生成颜色面板
2.getAlphaColor使用@ctrl/tinycolor生成带有不同透明度的颜色。

formatToken方法根据前面生成的基础样式，生成一些比较杂一点的样式

...

上述方法生成的mergedDerivativeToken都通过styleFn传到各个组件中，在组件内部通过css变量的方式使用。从而大大的提供了样式的灵活性！
```

js的key只能是驼峰, 在处理样式时又是如何将驼峰转换成kebab-case?

```js
const styleName = key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)
```

### Alert

```js
1. 使用closing在控制元素的显示状态, 添加transition动画效果。在animationEnd事件中，将closed置为true, 从而实现删除dom元素。解决了在tsx中无法使用v-if的问题。
2. 使用tsx的组件更加灵活，比如需要一个组件的属性既支持props，又支持slots, 可使用如下语法：
const description = props.description ?? slots.description?.()

```

### Button

### Modal
