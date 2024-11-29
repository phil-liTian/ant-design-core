import type { CSSObject } from '@/components/_utils/cssinjs/hooks/useStyleRegister'
import { mergeToken } from '@/components/theme/internal'
import genComponentStyleHook, {
  type FullToken,
} from '@/components/theme/utils/genComponentStyleHook'

interface RadioToken extends FullToken<'Radio'> {
  radioSize: number
  radioCheckedColor: string
  dotPadding: number
  radioDotSize: number
}

const getRadioBasicStyle = (token): CSSObject => {
  const { componentCls, radioSize, radioCheckedColor, colorWhite, colorBorder, radioDotSize } =
    token
  console.log('componentCls', componentCls)

  const radioInnerPrefixCls = `${componentCls}-inner`

  return {
    [`${componentCls}-wrapper`]: {
      display: 'inline-flex',
      alignItems: 'center',

      [`${componentCls}`]: {
        [`${componentCls}-inner`]: {
          '&:after': {
            position: 'absolute',
            display: 'block',
            content: '""',
            width: `${radioSize}px`,
            height: `${radioSize}px`,
            borderRadius: `${radioSize}px`,
            backgroundColor: colorWhite,
            transform: 'scale(0)',
            // opacity: 0,
            // TODO
            insetBlockStart: '50%',
            insetInlineStart: '50%',
            borderBlockStart: 0,
            borderInlineStart: 0,
            marginBlockStart: `${radioSize / -2}px`,
            marginInlineStart: `${radioSize / -2}px`,
            transition: `all ${token.motionDurationSlow}`,
          },

          '&:hover': {
            borderColor: token.colorPrimary,
          },

          position: 'relative',
          display: 'block',
          borderRadius: '50%',
          width: `${radioSize}px`,
          height: `${radioSize}px`,
          border: `${token.lineWidth}px solid ${colorBorder}}`,
        },

        [`${componentCls}-input`]: {
          position: 'absolute',
          opacity: 0,
          // zIndex: 1,
        },

        [`span + *`]: {
          paddingInlineStart: `${token.paddingXS}px`,
          paddingInlineEnd: `${token.paddingXS}px`,
        },
      },

      [`${componentCls}-checked`]: {
        [`${radioInnerPrefixCls}`]: {
          borderColor: radioCheckedColor,
          background: radioCheckedColor,

          '&:after': {
            transform: `scale(${radioDotSize / radioSize}) !important`,
            opacity: 1,
          },
        },
      },
    },
  }
}

export default genComponentStyleHook('Button', (token) => {
  const { fontSizeLG, colorPrimary } = token
  const radioSize = fontSizeLG
  const dotPadding = 4
  console.log('fontSizeLG', fontSizeLG)

  const radioToken = mergeToken<RadioToken>(token, {
    radioSize,
    radioCheckedColor: colorPrimary,
    dotPadding,
    radioDotSize: radioSize - (dotPadding + token.lineWidth) * 2,
  })
  return [getRadioBasicStyle(radioToken)]
})
