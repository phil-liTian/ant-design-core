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

### ConfigProvider

```js
1. 接收参数, 比如weve、disabled、direction、PrefixCls、token等等，注入到全局的context中, 可供整个系统中的组件共用。
```

### Alert

```js
1. 使用closing在控制元素的显示状态, 添加transition动画效果。在animationEnd事件中，将closed置为true, 从而实现删除dom元素。解决了在tsx中无法使用v-if的问题。
2. 使用tsx的组件更加灵活，比如需要一个组件的属性既支持props，又支持slots, 可使用如下方法：
const description = props.description ?? slots.description?.()
```

### Button & ButtonGroup

```js
1. 对button type、size等样式分开处理，方便后续维护。
2. 对button wave的处理--点击后的波纹效果。封装Wave组件，给wave组件添加点击事件。创建一个holder元素, 使用render函数将WaveEffect渲染后holder元素中。WaveEffect才是真正实现波纹效果的组件，在点击结束后, 移除当前holder元素。
3. 给WaveEffect添加transition动画效果。
4. wrapperRaf添加兼容requestAnimationFrame的动画效果; 增加useState hooks实现状态管理。
5. 在wave transition动画结束之后, 应该移除当前holder元素(使用removeDom方法移除)
6. 设置ButtonGroup下元素的样式。非最后一个子元素borderStartEndRadius、borderEndEndRadius为0，非第一个元素的borderStartStartRadius、borderEndStartRadius为0.

css属性
1. currentColor 代表了当前元素的文本颜色
2. direction 属性，默认为ltr，即从左到右。
3. inset-inline-start 属性，代表元素在inline-axis方向上的起始位置。
```

### Switch

```js
1. 结构处理: handle,作为中间移动的block, 可自定义checked和unChecked中的内容
2. 处理inner-children的动画效果: 使用paddingInlineStart和paddingInlineEnd将checked状态时的uncheckedChildren挤出当前inner元素的边界。在改变checked状态时，修改paddingInlineStart和paddingInlineEnd的值，实现动画效果。
3. 在handle元素中添加loading状态
```

### Checkbox & CheckboxGroup

```js
1. 将每次重新渲染都需要重新执行的逻辑放到setup的返回函数内部执行！！
setup() {
  return () => {
    // 返回函数会当作render函数执行, 每次patch都会重新执行
    return <div />
  }
}
2. vcCheckbox中包含一个type为checkbox的input元素, 内部操作的是input，实际渲染的是inner元素。
3. 如何实现group上双向绑定value, 控制checkbox的选中内容呢？使用provide提供mergedValue, 在checkbox中通过判断mergedValue中是否包含value来实现选中效果。
4. label同时支持在options中自定义vnode类型的label, 或者也可以在template中自定义统一的label。
slots.label ? slots.label(option) : option.label
```

### Radio & RadioGroup & RadioButton

```js
1. 共用vcCheckbox组件 ltr
{
  insetBlockStart: '50%', // top
  insetInlineStart: '50%', // left
  borderBlockStart: 0, // border-top
  borderInlineStart: 0, // border-left
  marginBlockStart: `${radioSize / -2}px`, // margin-top
  marginInlineStart: `${radioSize / -2}px`, // margin-left
}

2. 第二次点击radio change事件没触发？
  需要修改原生radio的checked属性，才能触发change事件。
inputRef.value!.checked = !!props.checked

3. 在radioGroup中提供RadioGroupContextKey, 在Radio组件中判断如果有Group则单独处理onChange事件及checked选中状态, 可以传入options, 实现过程同checkboxGroup。

4. 如何实现在radioGroup中radioButton和Radio共存？？
RadioGroup 通过context给Radio组件传入optionType, 当识别到optionType为button时, 渲染Radio的prefixCls调整为button。同样的使用RadioButton组件时 通过congtextg给Radio组件传入标识radioOptionTypeContext, 有radioOptionTypeContext则标明时RadioButton组件
```

### Input

### Select

### Divider

```js
1. 为children的父元素添加伪元素, before & after 添加样式，前后各添加一个横线。为children添加padding即可实现
2. orientationMargin 通过动态控制类 控制before 和 after伪元素的width
```

### Tag

```js
1. 同时实现内置color颜色, 也可以传入自定义color。通过isInternalColor判断是否是内置的颜色, 如果是内置的颜色走固定逻辑，如果是自定义的颜色, 则使用style控制实现。
2. 内置颜色样式使用genPresetColor方法实现
3. tag 和 checkableTag没有必然联系 checkableTag可选中（可用于类似tab点击切换的效果），tag可表状态
```

### Modal

```

```
