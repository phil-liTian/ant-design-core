import type { CSSObject } from '@/components/_utils/cssinjs/hooks/useStyleRegister'
import { resetComponent } from '@/components/style'
import genComponentStyleHook from '@/components/theme/utils/genComponentStyleHook'

export interface ComponentToken {}

const getSharedDividerHook = (token): CSSObject => {
  const { componentCls, lineWidth, lineType, colorSplit } = token
  return {
    [`${componentCls}`]: {
      ...resetComponent(token),

      // borderBlockStart: `${lineWidth}px ${lineType} ${colorSplit}`,

      [`&${componentCls}-horizontal`]: {
        [`&${componentCls}-with-text`]: {
          display: 'flex',

          '&:before,&:after': {
            position: 'relative',
            content: '""',
            width: '50%',
            height: '0.9em',
            borderBlockStart: `${lineWidth}px ${lineType} ${colorSplit}`,
            transform: 'translateY(100%)',
          },

          [`${componentCls}-inner-text`]: {
            padding: '0 1em',
          },

          [`&${componentCls}-with-text-left`]: {
            '&:before': {
              width: '5%',
            },
            '&:after': {
              width: '95%',
            },
          },

          [`&${componentCls}-with-text-right`]: {
            '&:before': {
              width: '95%',
            },
            '&:after': {
              width: '5%',
            },
          },

          [`&${componentCls}-no-default-orientation-margin-left`]: {
            '&:before': {
              width: '0%',
            },
          },

          [`&${componentCls}-no-default-orientation-margin-right`]: {
            '&:after': {
              width: '0%',
            },
          },
        },
      },
    },
  }
}

export default genComponentStyleHook('Divider', (token) => {
  return [getSharedDividerHook(token)]
})
