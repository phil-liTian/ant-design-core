import { mergeToken } from '@/components/theme/internal'
import type { FullToken } from '@/components/theme/utils/genComponentStyleHook'
import genComponentStyleHook from '@/components/theme/utils/genComponentStyleHook'

export interface ComponentToken {}
interface EmptyToken extends FullToken<'Empty'> {
  emptyImgHeight: number
  emptyImgHeightSM: number
  emptyImgHeightMD: number
}

const genSharedEmptyStyle = (token) => {
  const { componentCls, fontSize, lineHeight, marginXS } = token

  return {
    [`${componentCls}`]: {
      fontSize,
      lineHeight: `${lineHeight}`,
      textAlign: 'center',
      boxSizing: 'border-box',

      ['&-image']: {
        height: token.emptyImgHeight,
        marginBottom: marginXS,

        img: {
          height: '100%',
        },

        svg: {
          height: '100%',
          margin: 'auto',
        },
      },

      '&-description': {
        height: 'auto',
        boxSizing: 'border-box',
      },

      '&-small': {
        color: token.colorTextDisabled,
      },
    },
  }
}

export default genComponentStyleHook('Empty', (token) => {
  const { controlHeightLG } = token
  const emptyToken: EmptyToken = mergeToken<EmptyToken>(token as any, {
    emptyImgHeight: controlHeightLG * 2.5,
    emptyImgHeightMD: controlHeightLG,
    emptyImgHeightSM: controlHeightLG * 0.875,
  })

  return [genSharedEmptyStyle(emptyToken)]
})
