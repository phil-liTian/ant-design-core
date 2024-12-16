import { initSlideMotion } from '@/components/style/motion'

function genItemStyle(token) {
  const { controlPaddingHorizontal, controlHeight, fontSize, lineHeight } = token
  return {
    minHeight: controlHeight,
    padding: `${(controlHeight - fontSize * lineHeight) / 2}px ${controlPaddingHorizontal}px`,
    fontSize: fontSize,
  }
}

function genDrowdownStyle(token) {
  const { componentCls } = token
  const selectItemCls = `${componentCls}-item`

  return {
    [`${componentCls}-dropdown`]: {
      padding: token.paddingXXS,
      backgroundColor: token.colorBgElevated,
      boxShadow: token.boxShadowSecondary,
      borderRadius: token.borderRadiusLG,

      [`${selectItemCls}`]: {
        ...genItemStyle(token),
        cursor: 'pointer',
        borderRadius: token.borderRadiusSM,

        // option
        [`&-option`]: {
          [`&-active`]: {
            backgroundColor: token.controlItemBgHover,
          },
        },
      },

      [`${selectItemCls}-empty`]: {
        ...genItemStyle(token),
      },
    },

    ...initSlideMotion(token, 'slide-up'),
  }
}

export default genDrowdownStyle
