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

export default genComponentStyleHook('Tag', (token) => {
  const tagFontSize = token.fontSizeSM
  const tagToken = mergeToken<TagToken>(token, {
    tagFontSize,
  })
  return []
})
