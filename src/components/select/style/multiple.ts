import type { CSSInterpolation } from '@/components/_utils/cssinjs/hooks/useStyleRegister'
const FIXED_ITEM_MARGIN = 2

function getSelectItemStyle({ controlHeightSM, controlHeight, lineWidth: borderWidth }) {
  const selectItemDist = (controlHeight - controlHeightSM) / 2 - borderWidth
  const selectItemMargin = Math.ceil(selectItemDist / 2)
  return [selectItemDist, selectItemMargin]
}

function genSizeStyle(token) {
  const [selectItemDist] = getSelectItemStyle(token)
  const { componentCls } = token
  const selectItemHeight = token.controlHeightSM
  return {
    [`${componentCls}-multiple`]: {
      [`${componentCls}-selector`]: {
        borderRadius: token.borderRadius,
        padding: `${selectItemDist - FIXED_ITEM_MARGIN}px ${FIXED_ITEM_MARGIN * 2}px`,
      },

      [`${componentCls}-selection-item`]: {
        height: selectItemHeight,
      },
    },
  }
}

export function genMultipleStyle(token): CSSInterpolation {
  return [genSizeStyle(token)]
}
