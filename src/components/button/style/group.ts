const genGroupStyle = (token) => {
  const { componentCls } = token
  return {
    [`${componentCls}-group`]: {
      display: 'inline-flex',
      [`>span, >${componentCls}`]: {
        '&:not(:last-child)': {
          // ltr
          // 右上
          borderStartEndRadius: 0,
          // 右下
          borderEndEndRadius: 0,
        },

        '&:not(:first-child)': {
          //  ltr
          // 左上
          borderStartStartRadius: 0,
          // 左下
          borderEndStartRadius: 0,
        },
      },
    },
  }
}

export default genGroupStyle
