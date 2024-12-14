import { resetComponent, textEllipsis } from '@/components/style'
import { mergeToken } from '@/components/theme/internal'
import genComponentStyleHook, {
  type FullToken,
} from '@/components/theme/utils/genComponentStyleHook'
import genSingleStyle from './single'
import genDrowdownStyle from './dropdown'

export interface ComponentToken {}

export interface SelectToken extends FullToken<'Select'> {
  inputPaddingHorizontalBase: number
}

// =========selector==========
function genSelectorStyle(token) {
  const { componentCls, lineWidth, lineType, colorBorder } = token
  return {
    position: 'relative',
    backgroundColor: token.colorBgContainer,
    border: `${lineWidth}px ${lineType} ${colorBorder}`,
  }
}

const genBaseStyle = (token) => {
  const { componentCls, inputPaddingHorizontalBase } = token
  return {
    [componentCls]: {
      ...resetComponent(token),
      position: 'relative',
      cursor: 'pointer',

      [`${componentCls}-selector`]: {
        ...genSelectorStyle(token),

        '&:hover': {
          borderColor: token.colorPrimaryHover,
        },
      },

      // placeholder
      [`${componentCls}-selection-placeholder`]: {
        ...textEllipsis,
        color: token.colorTextPlaceholder,
      },

      [`${componentCls}-arrow`]: {
        position: 'absolute',
        top: '50%',
        insetInlineEnd: inputPaddingHorizontalBase,
        marginTop: -(token.fontSize / 2),
        lineHeight: '1',
        fontSize: token.fontSizeIcon,
        color: token.colorTextQuaternary,

        [`${componentCls}-suffix`]: {
          pointerEvents: 'auto',
        },
      },
    },
  }
}

function genSelectStyle(token) {
  const { componentCls } = token

  return [
    // Base
    genBaseStyle(token),

    // Single
    genSingleStyle(token),

    // Multiple

    // dropdown
    genDrowdownStyle(token),
  ]
}

export default genComponentStyleHook('Select', (token) => {
  const selectToken = mergeToken<SelectToken>(token, {
    inputPaddingHorizontalBase: token.paddingSM - 1,
  })

  return [genSelectStyle(selectToken)]
})
