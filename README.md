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
...

上述方法生成的mergedDerivativeToken都通过styleFn传到各个组件中，在组件内部通过css变量的方式使用。从而大大的提供了样式的灵活性！
```

js的key只能是驼峰, 在处理样式时又是如何将驼峰转换成kebab-case?

```js
const styleName = key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)
```
