import { mergeToken } from '@/components/theme/internal'
import type { FullToken } from '@/components/theme/utils/genComponentStyleHook'
import { genComponentStyleHook } from 'ant-design-vue/es/theme/internal'

export interface ComponentToken {}
interface EmptyToken extends FullToken<'Empty'> {
  emptyImgHeight: number
  emptyImgHeightSM: number
  emptyImgHeightMD: number
}

const genSharedEmptyStyle = (token) => {
  const { componentCls, fontSize } = token
  return {
    [componentCls]: {
      fontSize,
    },
  }
}

export default genComponentStyleHook('Empty', (token) => {
  const { controlHeightLG } = token
  const emptyToken: EmptyToken = mergeToken<EmptyToken>(token as any, {
    emptyImgHeight: controlHeightLG,
    emptyImgHeightMD: controlHeightLG * 2,
    emptyImgHeightSM: controlHeightLG * 1.5,
  })
  return [genSharedEmptyStyle(emptyToken)]
})
