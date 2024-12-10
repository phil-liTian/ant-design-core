import type { CSSProperties } from 'vue'

const HIDDEN_TEXTAREA_STYLE = `
  min-height:0 !important;
  max-height:none !important;
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
  pointer-events: none !important;
`

let hiddenTextarea: HTMLTextAreaElement

export interface NodeType {
  sizingStyle: string
  paddingSize: number
  borderSize: number
  boxSizing: string
}

const SIZING_STYLE = [
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'font-variant',
  'text-rendering',
  'text-transform',
  'width',
  'text-indent',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing',
  'word-break',
  'white-space',
]

// 动态计算textarea的高度
export function calculateNodeStyling(node: HTMLElement, useCache = false) {
  const style = window.getComputedStyle(node)
  const boxSizing = style.getPropertyValue('box-sizing')
  const paddingSize =
    parseFloat(style.getPropertyValue('padding-bottom')) +
    parseFloat(style.getPropertyValue('padding-top'))

  const borderSize =
    parseFloat(style.getPropertyValue('border-bottom-width')) +
    parseFloat(style.getPropertyValue('border-top-width'))

  const sizingStyle = SIZING_STYLE.map((name) => `${name}:${style.getPropertyValue(name)}`).join(
    ';',
  )

  const nodeInfo: NodeType = {
    boxSizing,
    paddingSize,
    borderSize,
    sizingStyle,
  }

  return nodeInfo
}

export default function calculateAutoSizeStyle(
  uiTextNode: HTMLTextAreaElement,
  useCache = false,
  minRows: null | number = null,
  maxRows: null | number = null,
) {
  if (!hiddenTextarea) {
    // 创建一个不可见的textarea
    hiddenTextarea = document.createElement('textarea')
    hiddenTextarea.setAttribute('tab-index', '-1')
    hiddenTextarea.setAttribute('aria-hidden', 'true')
    document.body.appendChild(hiddenTextarea)
  }
  const { paddingSize, boxSizing, borderSize, sizingStyle } = calculateNodeStyling(
    uiTextNode,
    useCache,
  )

  let minHeight: number | undefined = undefined
  let maxHeight: number | undefined = undefined
  let overflowY: any

  hiddenTextarea.setAttribute('style', `${sizingStyle};${HIDDEN_TEXTAREA_STYLE}`)
  hiddenTextarea.value = uiTextNode.value || uiTextNode.placeholder || ''

  let height = hiddenTextarea.scrollHeight

  if (boxSizing === 'border-box') {
    height += borderSize
  } else if (boxSizing === 'content-box') {
    height -= paddingSize
  }

  if (minRows !== null || maxRows !== null) {
    // 这个很重要 singleRowHeight必须是一行的高度, 有value撑开的scrollHeight计算的行高则不正确
    hiddenTextarea.value = ' '
    const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize

    if (minRows !== null) {
      minHeight = singleRowHeight * minRows
      if (boxSizing === 'border-box') {
        minHeight = minHeight + paddingSize + borderSize
      }

      height = Math.max(height, minHeight)
    }

    if (maxRows !== null) {
      maxHeight = singleRowHeight * maxRows
      if (boxSizing === 'border-box') {
        maxHeight = maxHeight + paddingSize + borderSize
      }
      overflowY = height > maxHeight ? '' : 'hidden'
      height = Math.min(height, maxHeight)
    }
  }

  const style: CSSProperties = {
    resize: 'none',
    height: `${height}px`,
    overflowY,
  }

  if (minHeight) {
    style.minHeight = `${minHeight}px`
  }
  if (maxHeight) {
    style.maxHeight = `${maxHeight}px`
  }

  return style
}
