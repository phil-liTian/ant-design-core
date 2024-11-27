import type { CSSObject } from '@/components/_utils/cssinjs/hooks/useStyleRegister'
import { resetComponent } from '@/components/style'
import { mergeToken } from '@/components/theme/internal'
import genComponentStyleHook, {
  type FullToken,
} from '@/components/theme/utils/genComponentStyleHook'

interface SwitchToken extends FullToken<'Switch'> {
  switchMinWidth: number
  switchHeight: number
  switchPinSize: number
  switchPadding: number
  switchDuration: string
  switchColor: string
  switchInnerMarginMin: number
  switchInnerMarginMax: number
  switchLoadingIconColor: string
}

// Handle
const genSwitchHandleStyle = (token): CSSObject => {
  const { componentCls } = token
  const switchHandleCls = `${componentCls}-handle`
  return {
    [componentCls]: {
      [switchHandleCls]: {
        position: 'absolute',
        top: `${token.switchPadding}px`,
        width: `${token.switchPinSize}px`,
        height: `${token.switchPinSize}px`,
        insetInlineStart: `${token.switchPadding}px`,
        transition: `all ${token.switchDuration} ease-in-out`,

        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          insetInlineEnd: 0,
          bottom: 0,
          insetInlineStart: 0,
          borderRadius: `${token.switchPinSize / 2}px`,
          transition: `all ${token.switchDuration} ease-in-out`,
          backgroundColor: token.colorWhite,
        },
      },

      [`&${componentCls}-checked ${switchHandleCls}`]: {
        insetInlineStart: `calc(100% - ${token.switchPinSize + token.switchPadding}px)`,
      },
    },
  }
}

// Switch
const genSwitchStyle = (token): CSSObject => {
  const { componentCls } = token

  return {
    [`${componentCls}`]: {
      ...resetComponent(token),
      position: 'relative',
      display: 'inline-block',
      boxSizing: 'border-box',
      minWidth: `${token.switchMinWidth}px`,
      height: `${token.switchHeight}px`,
      border: '0',
      borderRadius: '100px',
      cursor: 'pointer',
      verticalAlign: 'middle',
      background: token.colorTextQuaternary,
      userSelect: 'none',

      [`&${componentCls}-checked`]: {
        backgroundColor: token.switchColor,
      },

      // rtl
      [`${componentCls}-rtl`]: {
        direction: 'rtl',
      },
    },
  }
}

// inner
const genSwitchInnerStyle = (token: SwitchToken): CSSObject => {
  const { componentCls } = token
  const switchInnerCls = `${componentCls}-inner`
  return [
    {
      [`${switchInnerCls}`]: {
        display: 'block',
        overflow: 'hidden',
        borderRadius: '100%',
        boxSizing: 'border-box',
        width: '44px',
        height: '100%',
        paddingInlineStart: `${token.switchInnerMarginMax}px`,
        paddingInlineEnd: `${token.switchInnerMarginMin}px`,
        transition: `padding-inline-start ${token.switchDuration} ease-in-out, padding-inline-end ${token.switchDuration} ease-in-out`,

        [`${switchInnerCls}-checked, ${switchInnerCls}-unchecked`]: {
          display: 'block',
          height: '100%',
          verticalAlign: 'middle',
          fontSize: `${token.fontSizeSM}px`,
          color: token.colorTextLightSolid,
          transition: `margin-inline-start ${token.switchDuration} ease-in-out, margin-inline-end ${token.switchDuration} ease-in-out`,
          paddingTop: `${token.switchPadding}px`,
        },

        [`${switchInnerCls}-checked`]: {
          marginInlineStart: `calc(-100% + ${token.switchPinSize + token.switchPadding * 2}px - ${
            token.switchInnerMarginMax * 2
          }px)`,
          marginInlineEnd: `calc(100% - ${token.switchPinSize + token.switchPadding * 2}px + ${
            token.switchInnerMarginMax * 2
          }px)`,
        },

        [`${switchInnerCls}-unchecked`]: {
          marginTop: `-${token.switchHeight}px`,
          marginInlineStart: 0,
          marginInlineEnd: 0,
        },
      },

      [`${componentCls}-checked ${switchInnerCls}`]: {
        paddingInlineStart: `${token.switchInnerMarginMin}px`,
        paddingInlineEnd: `${token.switchInnerMarginMax}px`,
        [`${switchInnerCls}-checked`]: {
          marginInlineStart: 0,
          marginInlineEnd: 0,
        },

        [`${switchInnerCls}-unchecked`]: {
          marginInlineStart: `calc(100% - ${token.switchPinSize + token.switchPadding * 2}px + ${
            token.switchInnerMarginMax * 2
          }px)`,
          marginInlineEnd: `calc(-100% + ${token.switchPinSize + token.switchPadding * 2}px - ${
            token.switchInnerMarginMax * 2
          }px)`,
        },
      },
    },
  ]
}

const genSwitchLoadingStyle = (token: SwitchToken): CSSObject => {
  const { componentCls } = token
  return {
    [`${componentCls}`]: {
      position: 'relative',
      [`&${componentCls}-loading`]: {
        [`${componentCls}-loading-icon`]: {
          position: 'relative',
          top: `${(token.switchPinSize - token.fontSize) / 2}px`,
          color: token.switchLoadingIconColor,
        },
      },
    },
  }
}

export default genComponentStyleHook('Switch', (token) => {
  const switchHeight = token.fontSize * token.lineHeight
  const switchPadding = 2
  const switchPinSize = switchHeight - switchPadding * 2

  const switchToken = mergeToken<SwitchToken>(token, {
    switchMinWidth: switchPinSize * 2 + switchPadding * 4,
    switchDuration: token.motionDurationMid,
    switchHeight,
    switchPinSize,
    switchPadding,
    switchColor: token.colorPrimary,
    switchInnerMarginMin: switchPinSize / 2,
    switchInnerMarginMax: switchPinSize + switchPadding + switchPadding * 2,
    switchLoadingIconColor: `rgba(0, 0, 0, ${token.opacityLoading})`,
  })

  return [
    genSwitchStyle(switchToken),
    // block
    genSwitchHandleStyle(switchToken),
    // children
    genSwitchInnerStyle(switchToken),

    // loading
    genSwitchLoadingStyle(switchToken),
  ]
})
