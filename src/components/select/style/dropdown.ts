function genDrowdownStyle(token) {
  const { componentCls } = token

  return {
    [`${componentCls}-dropdown`]: {
      padding: token.paddingXXS,
      backgroundColor: token.colorBgElevated,
      boxShadow: token.boxShadowSecondary,
      borderRadius: token.borderRadiusLG,
    },
  }
}

export default genDrowdownStyle
