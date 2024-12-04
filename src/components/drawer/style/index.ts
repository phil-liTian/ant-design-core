import genComponentStyleHook, {
  type FullToken,
} from '@/components/theme/utils/genComponentStyleHook'
import { genMotionStyle } from './motion'

export interface ComponentToken {}
export interface DrawerToken extends FullToken<'Drawer'> {
  drawerFooterPaddingVertical: number
  drawerFooterPaddingHorizontal: number
}

const genDrawerStyle = (token) => {
  const {
    componentCls,
    colorBgMask,
    colorBgElevated,
    lineWidth,
    lineType,
    colorSplit,
    drawerFooterPaddingVertical,
    drawerFooterPaddingHorizontal,
  } = token

  const wrapperCls = `${componentCls}-content-wrapper`
  return {
    [componentCls]: {
      // position: 'fixed',
      // inset: 0,
      // zIndex: `${token.zIndexPopupBase}`,
      // pointerEvents: 'none',
      // placement
      '&-right': {
        [wrapperCls]: {
          top: 0,
          bottom: 0,
          right: 0,
        },
      },

      '&-left': {
        [wrapperCls]: {
          top: 0,
          bottom: 0,
          left: 0,
        },
      },

      '&-bottom': {
        [wrapperCls]: {
          bottom: 0,
          left: 0,
          right: 0,
        },
      },

      '&-top': {
        [wrapperCls]: {
          top: 0,
          left: 0,
          right: 0,
        },
      },

      // mask
      [`${componentCls}-mask`]: {
        position: 'absolute',
        inset: '0',
        background: colorBgMask,
        pointerEvents: 'auto',
      },

      // content
      [wrapperCls]: {
        position: 'absolute',
        zIndex: `${token.zIndexPopupBase}`,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
      },

      [`${componentCls}-content`]: {
        width: '100%',
        height: '100%',
        overflow: 'auto',
        background: colorBgElevated,
        pointerEvent: 'auto',
      },

      [`${componentCls}-header`]: {
        display: 'flex',
        padding: `${token.padding}px ${token.paddingLG}px`,
        borderBottom: `${lineWidth}px ${lineType} ${colorSplit}`,

        '&-title': {
          display: 'flex',
          alignItems: 'center',
          flex: '1',
        },

        '&-extra': {
          flex: 'none',
        },
      },

      [`${componentCls}-title`]: {
        color: token.colorText,
        fontSize: token.fontSizeLG,
        fontWeight: `${token.fontWeightStrong}`,
      },

      [`${componentCls}-close`]: {
        display: 'inline-block',
        background: 'transparent',
        border: 0,
        cursor: 'pointer',
        lineHeight: '1',
        color: token.colorIcon,
        fontSize: token.fontSizeLG,
        '&:focus, &:hover': {
          color: token.colorIconHover,
          textDecoration: 'none',
        },
      },

      [`${componentCls}-wrapper-body`]: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
      },

      // body
      [`${componentCls}-body`]: {
        flex: '1',
        padding: token.paddingLG,
      },

      // footer
      [`${componentCls}-footer`]: {
        flexShrink: '0',
        padding: `${drawerFooterPaddingVertical}px ${drawerFooterPaddingHorizontal}px`,
        borderTop: `${lineWidth}px ${lineType} ${colorSplit}`,
      },
    },
  }
}

export default genComponentStyleHook('Drawer', (token) => {
  const drawerToken: DrawerToken = {
    ...token,
    drawerFooterPaddingVertical: token.paddingXS,
    drawerFooterPaddingHorizontal: token.padding,
  }

  return [genDrawerStyle(drawerToken), genMotionStyle(drawerToken)]
})
