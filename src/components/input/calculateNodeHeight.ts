import type { CSSProperties } from 'vue'

// 动态计算textarea的高度
export function calculateNodeHeight() {}

export default function calculateAutoSizeStyle(
  uiTextNode: HTMLTextAreaElement,
  useCache = false,
  minRows: null | number = 0,
  maxRows: null | number = null,
) {
  const style: CSSProperties = {
    resize: 'none',
  }

  return style
}
