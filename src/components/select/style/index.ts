import { resetComponent, textEllipsis } from '@/components/style'
import { mergeToken } from '@/components/theme/internal'
import genComponentStyleHook, {
  type FullToken,
} from '@/components/theme/utils/genComponentStyleHook'
import genSingleStyle from './single'

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
  const { componentCls } = token
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

      [`${componentCls}-selection-placeholder`]: {
        ...textEllipsis,
        color: token.colorTextPlaceholder,
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
  ]
}

export default genComponentStyleHook('Select', (token) => {
  const selectToken = mergeToken<SelectToken>(token, {
    inputPaddingHorizontalBase: token.paddingSM - 1,
  })
  console.log('a', genSelectStyle(selectToken))

  return [genSelectStyle(selectToken)]
})
