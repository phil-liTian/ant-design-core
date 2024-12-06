import { resetComponent } from '@/components/style'
import { mergeToken } from '@/components/theme/internal'
import genComponentStyleHook, {
  type FullToken,
} from '@/components/theme/utils/genComponentStyleHook'

export interface ComponentToken {
  segmentedPaddingHorizontal: number
  segmentedPaddingHorizontalSM: number
  segmentedContainerPadding: number
  labelColor: string
  labelColorHover: string
  bgColor: string
  bgColorHover: string
  bgColorSelected: string
}
interface SegmentedToken extends FullToken<'Segmented'> {}

// select
function getItemSelectedStyle(token: SegmentedToken) {
  return {
    backgroundColor: token.bgColorSelected,
    boxShadow: token.boxShadow,
  }
}

function genSegmentedStyle(token: SegmentedToken) {
  const { componentCls } = token
  return {
    [componentCls]: {
      ...resetComponent(token),
      display: 'inline-block',
      padding: token.segmentedContainerPadding,
      backgroundColor: token.bgColor,
      borderRadius: token.borderRadius,

      [`${componentCls}-group`]: {
        position: 'relative',
        display: 'flex',
        width: '100%',

        [`${componentCls}-item`]: {
          position: 'relative',
          borderRadius: token.borderRadiusSM,
          textAlign: 'center',
          cursor: 'pointer',

          '&-input': {
            position: 'absolute',
            opacity: 0,
            width: 0,
            height: 0,
          },

          '&-selected': {
            ...getItemSelectedStyle(token),
            color: token.labelColorHover,
          },

          '&-label': {
            minHeight: token.controlHeight - token.segmentedContainerPadding * 2,
            lineHeight: token.controlHeight - token.segmentedContainerPadding * 2,
            padding: `0 ${token.segmentedPaddingHorizontal}px`,
          },
        },

        [`${componentCls}-thumb`]: {
          ...getItemSelectedStyle(token),
          position: 'absolute',
          insetBlockStart: 0,
          insetInlineStart: 0,
          width: 0,
          height: '100%',
          padding: `${token.paddingXXS}px 0`,
          borderRadius: token.borderRadiusSM,
        },
      },

      [`${componentCls}-thumb-motion-appear-active`]: {
        transition: `transform ${token.motionDurationSlow} ${token.motionEaseInOut}, width ${token.motionDurationSlow} ${token.motionEaseInOut}`,
        willChange: 'width,transform',
      },
    },
  }
}
export default genComponentStyleHook('Segmented', (token) => {
  const {
    colorBgLayout,
    colorFillSecondary,
    colorBgElevated,
    lineWidth,
    controlPaddingHorizontal,
    lineWidthBold,
  } = token
  const segmentedToken = mergeToken<SegmentedToken>(token, {
    bgColor: colorBgLayout,
    bgColorHover: colorFillSecondary,
    bgColorSelected: colorBgElevated,
    segmentedContainerPadding: lineWidthBold,
    segmentedPaddingHorizontal: controlPaddingHorizontal - lineWidth,
  })
  return [genSegmentedStyle(segmentedToken)]
})
