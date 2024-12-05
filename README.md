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

```js
1. 对footer处理, $slots.footer ? $slots.footer() : footerRender() 实现自定义footer和默认footer
  对footer button样式处理。可通过okType来自定义okButton的类型, okButtonProps也可覆盖当前button属性

2. 如何处理Modal.methods()方法？？
  定义confirm方法, 使用render函数动态生成Modal组件。性能优化点：使用document.createDocumentFragment()文档片段作为一个临时的容器，方便对节点进行组织和操作。有效地优化 DOM 操作的性能，并且方便对 DOM 节点进行组织、克隆和移动等操作
  点击可动态生成一个open为true的Modal组件。
  返回一个update方法, 通过重新执行vue的render方法, 强制组件刷新。同时也返回一个destroy方法, 用于销毁Modal组件。render(null, container).

3. Modal.useModal()如何封装处理？？存在的意义是什么？
  Modal是直接使用render函数渲染的组件, 其context与当前节点所在的context不同，无法获取到当前context的信息。UseModal会返回一个contextHolder元素，将modal渲染到ContextHolder容器中。

4. 动态处理modal脱离上下文环境的问题
  使用Portal组件, 可动态接收getContainer，指定渲染的容器。（非常重要的一个基础组件）通过getParent处理, getContainer可以是字符串、函数、或者一个HTMLElement元素。
  在组件卸载时 需要使用removeCurrentContainer方法移除当前container

5. 如何实现destroyAll, 什么业务场景需要用到
  一般用于使用Modal.methods创建的Modal, 通常用于路由监听当中, 路由改变无法关闭Modal的情况。在使用Confirm创建Modal的时候, 向destroyFns中收集close函数, 调用destroyAll时，将destroyFns中的函数依次执行.

6. 使用transitionOrigin实现从点击处淡入Modal。给document添加click事件记录transformOrigin的初始值。
  initMotion用于给Transition添加动画, 使用zoom来实现content的缩放动画。使用fade来实现mask的淡入淡出效果。
```

### Notification

### Drawer

```
1. 设计思路: header 可自定义closeIcon、title、extra; body flex: 1,占据除header、footer以外的剩余空间; footer flex-shrink: 0, 固定footer高度。可通过footer: null 去除footer部分
2. 实现placement:left、right、top、bottom四个不同方向的抽屉。
  将wrapper设置成absolute, 根据不同的placement设置不同的top、left、bottom、right的值。panel-motion给body添加动画效果。
3. inset: '0': 将元素的这四个方向的内边距（或定位偏移量）都设置为 0
4. 如何实现esc关闭drawer？？
  指定最外层元素的tabindex为-1, 当用户点击时触发onKeydown事件, 如果是按下esc, 则关闭drawer。
5. 在Transition的onAfterEnter和onAfterLeave时，抛出事件afterOpenChange, 可收到动画结束后的回调函数。
```

### Spin

```js
使用keyFrames处理动画. parseStyle如何对keyframe进行处理？
1. 在parseStyle方法中添加逻辑
if (key === 'animationName') {
  parseKeyframes(value) // 处理keyframes
  formatValue = (value as Keyframes).getName('')
}
2. parsetyle方法中添加返回值effectStyle, 在注入css的时候 注入当前keyframes定义的动画
3. 向外抛出方法setDefaultIndicator, 可全局注册spin的Indicator元素
```

### Watermark

设计思路: 创建watermarkRef, 将水印绘制到canvas中, 给watermarkRef设置style BackgroundImage: url(watermarkRef.current.toDataURL()), 将watermarkRef添加到containerRef中。

1. 使用ctx.drawImage处理image, image需要配置 img.crossOrigin = 'anonymous'
2. 使用ctx.fillText处理文字内容

### Segmented
