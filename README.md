## 目前组件实现进度 16/69

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
2. renderEmpty 全局定义组件缺省状态
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

```js
1. 结构: VcInput负责渲染逻辑, getInputElement会返回原生input和textarea的元素(通过tag传递元素类型)。BaseInput处理input的原生事件等相关内容。
2. 通过设置outline: 'none' 来移除原生输入框的轮廓效果。
3. show-clear, show-count 利用suffix slot实现; inputSearch、inputPassword利用addonAfter slot实现。
4. BaseInputInner 渲染的元素可以由传进来的tag决定。
5. 使用resize-observer-polyfill监听textarea的宽、高变化。
  监听Dom resize事件
import ResizeObserver from 'resize-observer-polyfill'

const registerObserver = () => {
  const element = findDOMNode(instance)
  if (!resizeObserver && element) {
    resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(element)
  }
}
6. 如何动态计算textarea的高度？？ autosize如何实现？ 为何需要在body最外层增加一个overflow:hidden的textarea？？
  将textarea元素的属性设置得与显示的dom元素相同, 通过动态计算hidden的textarea的offsetHeight,来实现textarea的高度由内容自动撑开.即autoSize的效果。这里涉及到一个简单状态机的处理: 当状态是 RESIZE_MEASURING 时, textarea样式重新计算, 当value、maxRow、minRow发生变化时, 状态机会自动切换为RESIZE_START, 监听到状态变化时, 状态机会自动切换为RESIZE_MEASURING，即重新绘制textarea的高度。

```

### Select

#### 涉及组件vcAlign(实现dom定位), vcTrigger(实现点击处理popup)、vcVirtualList(虚拟列表)

整体思路: Select是组件入口, 具体实现逻辑在VcSelect中. BaseSelect中的SelectTrigger的默认插槽实现Selector默认展示(包括组件单选、多选、tag、搜索等)逻辑; 另外一个插槽--popup,实现弹出选择框的逻辑。popup中接收一个默认插槽，默认插槽中的内容是BaseSelect传进来的OptionList. OptionList中使用virtualList实现虚拟列表。可满足渲染100000个items的场景。

```html 基础结构
<div class="phil-select">
  <div class="phil-select-selector">
    <div class="phil-select-selection-search">
      <!-- TODO: single和multiple的样式 -->
    </div>
    <div class="phil-select-selection-placeholder"></div>
  </div>
</div>

<!-- 弹出框 -->
使用Portal组件包裹, 通过getContainer可指定渲染的父容器, 默认是document.body!
<div class="phil-select-dropdown">
  <div>
    <!-- TODO rc_select_0_list 原因？？ -->
    <div class="rc-virtual-list"></div>
  </div>
</div>
```

```js
1. 如何实现Select的下拉选择效果？？
  popup(dropdown)的样式width通过在BaseSelect中计算containerRef的offsetWidth来获取到。通过dom-align库动态获取dropdown盒子top和left的值。(在Align组件中实现) getContainer默认返回值是body, 此时定位的位置并不会随页面滚动而改变, 如果想要下拉弹层渲染节点固定在触发器的父元素中，需使用getPopupContainer={triggerNode => triggerNode.parentNode}。
2. 如何实现placement？
  还是利用dom-align库实现。通过getBuiltInPlacements方法定义不同placement的偏移量(top和left的值)。
3. 如何实现options, 虚拟列表, dropdown动画、dropdownRender
  3.1 创建一个SelectContext上下文对象, 在OptionList中共享Select中的props, BaseSelectContext共享vcSelect中的props数据。
  3.2 vcVirtualList(大数据渲染)
    1. 结构设计: 父容器固定高度, 子容器高度由itemHeight * dataLen计算得到, 溢出隐藏。自定义一个scrollBar组件, 高度由scrollHeight 和 height计算得到。距离顶部位置动态计算得到。
    2. 给父容器添加wheel事件，监听滚动事件, 动态计算偏移量。子容器添加transform: translateY(offset)实现虚拟列表效果。
  3.3 在渲染popupElement之前, 判断如果有dropdownRender则执行dropdownRender({ menuNode, props })，返回自定义的dropdown。

4. mode: single 和 multiple 的实现逻辑？？ 如何实现tagRender 自定义tag内容？？

5. 如何实现搜索和远程数据结合, 筛选filter-option实现过程？？

6. 如何实现自动分词

7. 如何实现select-option的value与select绑定的value一致？？

9. labelInValue如何实现绑定的value是一个对象的？？
```

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

实现思路: 遍历options生成每一项, 与option同级的MotionThumb作为滑块, 需要注意的是, 实现的功能类似radio, 所以这里创建了一个type为radio,opacity为0的input.如何处理滑块的的滑动效果和宽度呢？通过value找到对应option的clientWidth来实现动态处理width; 同样的方法还能找到对应option的offsetLeft, 实现动态处理translateX。真正移动的是MotionThumb, 动画结束后移除当前dom。

SegmentedOption使用函数组件实现。
如何实现支持自定义label？？函数组件处理具名插槽

```js
const SegmentedOption: FunctionalComponent<
  SegmentedOption & {
    prefixCls: string
    checked: boolean
    onChange: (_event, val: SegmentedValue) => void
  }
> = (props, { slots, emit }) => {
  return (
    <label class={classNames(className, {})}>
      <input
        checked={checked}
        class={`${prefixCls}-item-input`}
        type="radio"
        onChange={handleChange}
      />
      <div class={`${prefixCls}-item-label`}>
        {/* 函数组件处理插槽 */}
        {typeof label === 'function' ? label({ payload, value, title }) : value}
      </div>
    </label>
  )
}
```

### Result

```js
使用ExceptionMap、IconMap来实现映射，通过Status来获取对应的组件或者Icon。
export const IconMap = {
  success: CheckCircleFilled,
  error: CloseCircleFilled,
  info: ExclamationCircleFilled,
  warning: WarningFilled,
}

export const ExceptionMap = {
  '404': NoFound,
  '500': ServerError,
  '403': Unauthorized,
}
```

### Space

```js
如何实现控制各组件间的间距的？
```

### Empty

```js
内置两个默认的empty img
Empty.PRESENTED_IMAGE_DEFAULT = () => h(DefaultEmptyImg)
Empty.PRESENTED_IMAGE_SIMPLE = () => h(SimpleEmptyImg)
```

### Grid

实现思路: 利用flex布局, Row是一个设置了display: flex的盒子, Col的span利用flex: 0 0 baiseWidth来实现宽度分配.使用flex的order属性来实现排序。push、pull使用insetInline实现; offset使用marginInlineStart实现。

```js
1. genLoopGridColumnsStyle方法实现Col的宽度分配核心逻辑
2. gutter是采用动态处理style的padding值实现(Row、Col)
3. 实现响应式: 通过监听页面的宽度，动态计算出当前屏幕的尺寸，然后根据尺寸进行不同的样式设置
[`@media (min-width: ${screenSize}px)`]: {
  ...genGridStyle(token, sizeCls),
},
4. 使用window.matchMedia(matchMediaQuery)来实现监听页面尺寸变化
const listener = ({ matches }: MediaQueryListEvent) => {
  this.dispatch({
    ...screens,
    [screen]: matches,
  })
}

const mql = window.matchMedia(matchMediaQuery)
mql.addListener(listener)
```

### Tree

```js
1. 如何实现缩进结构？？
2. 中间竖线如何实现？？
3. 如何实现虚拟列表？？
```
