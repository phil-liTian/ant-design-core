import type { CSSObject } from '@/components/_utils/cssinjs/hooks/useStyleRegister'
import { mergeToken } from '@/components/theme/internal'
import genComponentStyleHook, {
  type FullToken,
} from '@/components/theme/utils/genComponentStyleHook'

export interface InputToken extends FullToken<'Input'> {
  inputAffixPadding: number
  inputPaddingVertical: number
  inputPaddingVerticalLG: number
  inputPaddingVerticalSM: number
  inputPaddingHorizontal: number
  inputPaddingHorizontalLG: number
  inputPaddingHorizontalSM: number
  inputBorderHoverColor: string
  inputBorderActiveColor: string
}
function genBasicInputStyle(token): CSSObject {
  return {
    width: '100%',
    padding: `${token.inputPaddingVertical}px ${token.inputPaddingHorizontal}px`,
    border: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
    borderRadius: token.borderRadius,
  }
}

function genInputStyle(token): CSSObject {
  const { componentCls } = token
  return {
    [`${componentCls}`]: {
      ...genBasicInputStyle(token),
    },
  }
}

export default genComponentStyleHook('Input', (token) => {
  const {
    lineWidth,
    paddingXXS,
    controlHeight,
    controlHeightLG,
    fontSize,
    fontSizeLG,
    lineHeight,
    lineHeightLG,
    controlHeightSM,
    paddingSM,
    paddingXS,
    controlPaddingHorizontal,
    colorPrimaryHover,
  } = token

  const inputToken = mergeToken<InputToken>(token, {
    inputPaddingVertical: Math.max(
      Math.round(((controlHeight - fontSize * lineHeight) / 2) * 10) / 10 - lineWidth,
      3,
    ),
    inputPaddingVerticalLG:
      Math.ceil(((controlHeightLG - fontSizeLG * lineHeightLG) / 2) * 10) / 10 - lineWidth,
    inputPaddingVerticalSM: Math.max(
      Math.round(((controlHeightSM - fontSize * lineHeight) / 2) * 10) / 10 - lineWidth,
      0,
    ),
    inputPaddingHorizontal: paddingSM - lineWidth,
    inputPaddingHorizontalSM: paddingXS - lineWidth,
    inputPaddingHorizontalLG: controlPaddingHorizontal - lineWidth,
    inputBorderHoverColor: colorPrimaryHover,
    inputBorderActiveColor: colorPrimaryHover,
  })
  return [genInputStyle(inputToken)]
})
