import type { CSSObject } from '@/components/_utils/cssinjs/hooks/useStyleRegister'
import { resetComponent } from '@/components/style'
import { genPresetColor } from '@/components/style/presetColor'
import { mergeToken } from '@/components/theme/internal'
import genComponentStyleHook, {
  type FullToken,
} from '@/components/theme/utils/genComponentStyleHook'
import type { CSSProperties } from 'vue'

export interface ComponentToken {}

interface TagToken extends FullToken<'Tag'> {
  tagFontSize: number
  tagLineHeight: CSSProperties['lineHeight']
  tagDefaultBg: string
  tagDefaultColor: string
  tagIconSize: number
  tagPaddingHorizontal: number
  tagBorderlessBg: string
}

const genBaseStyle = (token): CSSObject => {
  const {
    componentCls,
    lineWidth,
    tagFontSize,
    tagPaddingHorizontal,
    tagDefaultBg,
    tagLineHeight,
    lineType,
    paddingXXS,
  } = token
  const paddingInline = tagPaddingHorizontal - lineWidth
  const iconMarginInline = paddingXXS - lineWidth
  return {
    [`${componentCls}`]: {
      ...resetComponent(token),
      display: 'inline-block',
      height: 'auto',
      paddingInline,
      background: tagDefaultBg,
      lineHeight: tagLineHeight,
      border: `${lineWidth}px ${lineType} ${token.colorBorder}`,
      fontSize: tagFontSize,
      borderRadius: token.borderRadiusSM,
      marginInlineEnd: token.marginXS,

      [`${componentCls}-close-icon`]: {
        cursor: 'pointer',
        fontSize: tagFontSize,
        marginInlineStart: iconMarginInline,
        color: token.colorTextDescription,
      },

      [`&${componentCls}-hidden`]: {
        display: 'none',
      },

      [`&${componentCls}-borderless`]: {
        borderColor: 'transparent',
      },

      [`&${componentCls}-has-color`]: {
        color: token.colorTextLightSolid,
      },

      [`&-checkable`]: {
        background: 'transparent',
        borderColor: 'transparent',
        cursor: 'pointer',

        [`&-checked`]: {
          backgroundColor: token.colorPrimary,
          color: token.colorTextLightSolid,
        },
      },
    },
  }
}

const genPresetStyle = (token): CSSObject =>
  genPresetColor(token, (colorKey, { lightColor, lightBorderColor, darkColor, textColor }) => ({
    [`${token.componentCls}-${colorKey}`]: {
      color: textColor,
      background: lightColor,
      borderColor: lightBorderColor,
    },
  }))

export default genComponentStyleHook('Tag', (token) => {
  const { fontSize, lineHeight, colorFillQuaternary } = token
  const tagFontSize = token.fontSizeSM
  const tagLineHeight = Math.round(fontSize * lineHeight)
  const tagDefaultColor = token.colorText
  const tagDefaultBg = token.colorFillQuaternary

  const tagToken = mergeToken<TagToken>(token, {
    tagFontSize,
    tagLineHeight,
    tagDefaultColor,
    tagDefaultBg,
    tagPaddingHorizontal: 8,
  })
  return [genBaseStyle(tagToken), genPresetStyle(token)]
})
