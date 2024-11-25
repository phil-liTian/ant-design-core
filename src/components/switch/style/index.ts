import type { CSSObject } from '@/components/_utils/cssinjs/hooks/useStyleRegister'
import { mergeToken } from '@/components/theme/internal'
import genComponentStyleHook, {
  type FullToken,
} from '@/components/theme/utils/genComponentStyleHook'

interface SwitchToken extends FullToken<'Switch'> {
  switchMinWidth: number
  switchHeight: number
  switchPinSize: number
  switchPadding: number
}

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

        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          insetInlineEnd: 0,
          bottom: 0,
          insetInlineStart: 0,
          borderRadius: `${token.switchPinSize / 2}px`,
          backgroundColor: token.colorWhite,
        },
      },
    },
  }
}

const genSwitchStyle = (token): CSSObject => {
  const { componentCls } = token
  console.log('componentCls', componentCls)

  return {
    [`${componentCls}`]: {
      position: 'relative',
      display: 'inline-block',
      boxSizing: 'border-box',
      minWidth: `${token.switchMinWidth}px`,
      height: `${token.switchHeight}px`,
      border: '0',
      borderRadius: '100px',
      cursor: 'pointer',
      background: token.colorTextQuaternary,
      userSelect: 'none',
    },
  }
}

export default genComponentStyleHook('Switch', (token) => {
  const switchHeight = token.fontSize * token.lineHeight
  const switchPadding = 2
  const switchPinSize = switchHeight - switchPadding * 2

  const switchToken = mergeToken<SwitchToken>(token, {
    switchMinWidth: switchPinSize * 2 + switchPadding * 4,
    switchHeight,
    switchPinSize,
    switchPadding,
  })

  return [genSwitchStyle(switchToken), genSwitchHandleStyle(switchToken)]
})
