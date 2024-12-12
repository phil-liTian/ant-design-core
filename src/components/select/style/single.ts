import type { CSSInterpolation } from '@/components/_utils/cssinjs/hooks/useStyleRegister'

export default function genSingleStyle(token): CSSInterpolation {
  const { componentCls, inputPaddingHorizontalBase, borderRadius } = token
  const selectHeightWithoutBorder = token.controlHeight - token.lineWidth * 2
  return [
    {
      [`${componentCls}-single`]: {
        [`${componentCls}-selector`]: {
          borderRadius,

          [`${componentCls}-selection-search`]: {
            position: 'absolute',
            top: 0,
            insetInlineStart: inputPaddingHorizontalBase,
            insetInlineEnd: inputPaddingHorizontalBase,
            bottom: 0,
          },

          [`${componentCls}-selection-placeholder`]: {
            lineHeight: selectHeightWithoutBorder,
          },
        },

        [`&:not(${componentCls}-customize-input)`]: {
          [`${componentCls}-selector`]: {
            height: token.controlHeight,
            padding: `0 ${inputPaddingHorizontalBase}px`,
          },
        },
      },
    },
  ]
}
