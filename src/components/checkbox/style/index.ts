import type { CSSObject } from '@/components/_utils/cssinjs/hooks/useStyleRegister'
import { resetComponent } from '@/components/style'
import genComponentStyleHook, {
  type FullToken,
} from '@/components/theme/utils/genComponentStyleHook'

interface CheckboxToken extends FullToken<'Checkbox'> {
  checkboxSize: number
}

const genStyle = (token: CheckboxToken): CSSObject => {
  const { componentCls } = token
  const wrapperCls = `${componentCls}-wrapper`

  return {
    [`${wrapperCls}`]: {
      ...resetComponent(token),
      display: 'inline-flex',
      alignItems: 'center',
      cursor: 'pointer',
    },

    [`${componentCls}`]: {
      position: 'relative',
      cursor: 'pointer',
      [`${componentCls}-input`]: {
        position: 'absolute',
        opacity: 0,
        zIndex: `1px`,
      },

      [`${componentCls}-inner`]: {
        display: 'block',
        width: `${token.checkboxSize}px`,
        height: `${token.checkboxSize}px`,
        backgroundColor: token.colorBgContainer,
        border: `${token.lineWidth}px ${token.lineType} ${token.colorBorder}`,
        borderRadius: `${token.borderRadiusSM}px`,
        transition: `all ${token.motionDurationSlow}`,

        '&:after': {
          content: '""',
          position: 'absolute',
          top: '50%',
          insetInlineStart: '21.5%',
          boxSizing: 'border-box',
          width: `${(token.checkboxSize / 14) * 5}px`,
          height: `${(token.checkboxSize / 14) * 8}px`,
          border: `${token.lineWidthBold}px ${token.lineType} ${token.colorBorder}`,
          borderTop: 0,
          borderInlineStart: 0,
          opacity: 0,
          transform: 'rotate(45deg) scale(0) translate(-50%,-50%)',
          transition: `all ${token.motionDurationFast} ${token.motionEaseInOutCirc}, opacity ${token.motionDurationFast}`,
        },
      },

      '& + span': {
        padding: 0,
        marginInlineStart: `${token.paddingXS}px`,
        marginInlineEnd: `${token.paddingXS}px`,
      },
    },

    // =====================checked===========================
    [`${componentCls}-checked`]: {
      [`${componentCls}-inner`]: {
        backgroundColor: token.colorPrimary,
        borderColor: token.colorPrimary,
        '&:after': {
          opacity: '1',
          borderColor: token.colorTextLightSolid,
          transform: 'rotate(45deg) scale(1) translate(-50%,-50%)',
        },
      },
    },
  }
}

export default genComponentStyleHook('Checkbox', (token) => {
  const checkboxToken: CheckboxToken = {
    ...token,
    checkboxSize: token.controlInteractiveSize,
  }
  return [genStyle(checkboxToken)]
})
