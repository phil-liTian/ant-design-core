import { mergeToken } from '@/components/theme/internal'
import genComponentStyleHook, {
  type FullToken,
} from '@/components/theme/utils/genComponentStyleHook'

export interface ComponentToken {
  imageWidth: number
  imageHeight: number
}

interface ResultToken extends FullToken<'Result'> {
  resultTitleFontSize: number
  resultSubtitleFontSize: number
  resultIconFontSize: number

  resultExtraMargin: string

  resultInfoIconColor: string
  resultSuccessIconColor: string
  resultWarningIconColor: string
  resultErrorIconColor: string
}

function genStatusIconStyle(token) {
  const { componentCls } = token
  return {
    [`${componentCls}-success .anticon`]: {
      color: token.resultSuccessIconColor,
    },

    [`${componentCls}-info .anticon`]: {
      color: token.resultInfoIconColor,
    },

    [`${componentCls}-error .anticon`]: {
      color: token.resultErrorIconColor,
    },

    [`${componentCls}-warning .anticon`]: {
      color: token.resultWarningIconColor,
    },
  }
}

const getStyle = (token) => {
  const { componentCls, iconCls, paddingXS, paddingLG, paddingXL, resultIconFontSize } = token

  return {
    [componentCls]: {
      padding: `${paddingLG * 2}px ${paddingXL}px`,
      [`${componentCls}-image`]: {
        width: token.imageWidth,
        height: token.imageHeight,
        margin: '0 auto',
      },

      [`${componentCls}-icon`]: {
        marginBottom: paddingLG,
        textAlign: 'center',

        [`> .anticon`]: {
          fontSize: resultIconFontSize,
        },
      },

      [`${componentCls}-title`]: {
        textAlign: 'center',
        fontSize: token.resultTitleFontSize,
      },

      [`${componentCls}-subtitle`]: {
        textAlign: 'center',
        fontSize: token.resultSubtitleFontSize,
      },

      [`${componentCls}-extra`]: {
        margin: token.resultExtraMargin,
        textAlign: 'center',

        '& > *': {
          marginInlineEnd: paddingXS,

          '&:last-child': {
            marginInlineEnd: 0,
          },
        },
      },
    },
  }
}

export default genComponentStyleHook('Result', (token) => {
  const { paddingLG, fontSizeHeading3, fontSize } = token
  const resultToken = mergeToken<ResultToken>(token, {
    resultTitleFontSize: fontSizeHeading3,
    resultSubtitleFontSize: fontSize,
    resultIconFontSize: fontSizeHeading3 * 3,
    resultExtraMargin: `${paddingLG}px 0 0 0`,
    resultInfoIconColor: token.colorInfo,
    resultErrorIconColor: token.colorError,
    resultSuccessIconColor: token.colorSuccess,
    resultWarningIconColor: token.colorWarning,
  })
  return [getStyle(resultToken), genStatusIconStyle(resultToken)]
})
