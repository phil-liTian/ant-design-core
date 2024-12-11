import { mergeToken } from '@/components/theme/internal'
import genComponentStyleHook, {
  type FullToken,
} from '@/components/theme/utils/genComponentStyleHook'
import type { CSSObject } from 'ant-design-vue'

export interface GridToken extends FullToken<'Grid'> {
  gridColumns: number
}

export const useRowStyle = genComponentStyleHook('Grid', (token) => {
  const { componentCls } = token
  return {
    [componentCls]: {
      display: 'flex',
      flexWrap: 'wrap',

      '&-no-wrap': {
        flexWrap: 'nowrap',
      },
    },
  }
})

const genLoopGridColumnsStyle = (token: GridToken, sizeCls: string) => {
  const { componentCls, gridColumns } = token
  const gridColumnsStyle: CSSObject = {}

  for (let i = 0; i < gridColumns; i++) {
    if (i == 0) {
      gridColumnsStyle[`${componentCls}${sizeCls}-${i}`] = {
        display: 'none',
      }
      gridColumnsStyle[`${componentCls}-push-${i}`] = {
        insetInlineStart: 'auto',
      }
      gridColumnsStyle[`${componentCls}-pull-${i}`] = {
        insetInlineEnd: 'auto',
      }
      gridColumnsStyle[`${componentCls}${sizeCls}-push-${i}`] = {
        insetInlineStart: 'auto',
      }
      gridColumnsStyle[`${componentCls}${sizeCls}-pull-${i}`] = {
        insetInlineEnd: 'auto',
      }
      gridColumnsStyle[`${componentCls}${sizeCls}-offset-${i}`] = {
        marginInlineEnd: 0,
      }
      gridColumnsStyle[`${componentCls}${sizeCls}-order-${i}`] = {
        order: 0,
      }
    } else {
      gridColumnsStyle[`${componentCls}${sizeCls}-${i}`] = {
        display: 'block',
        flex: `0 0 ${(i / gridColumns) * 100}%`,
        maxWidth: `${(i / gridColumns) * 100}%`,
      }
      gridColumnsStyle[`${componentCls}${sizeCls}-push-${i}`] = {
        insetInlineStart: `${(i / gridColumns) * 100}%`,
      }
      gridColumnsStyle[`${componentCls}${sizeCls}-pull-${i}`] = {
        insetInlineEnd: `${(i / gridColumns) * 100}%`,
      }
      gridColumnsStyle[`${componentCls}${sizeCls}-offset-${i}`] = {
        marginInlineStart: `${(i / gridColumns) * 100}%`,
      }
      gridColumnsStyle[`${componentCls}${sizeCls}-order-${i}`] = {
        order: `${i}`,
      }
    }
  }

  return gridColumnsStyle
}

const genGridColStyle = (token) => {
  const { componentCls } = token

  return {
    [`${componentCls}`]: {
      position: 'relative',
      minHeight: 1,
    },
  }
}

const genGridStyle = (token: GridToken, sizeCls: string) => genLoopGridColumnsStyle(token, sizeCls)

const genGridMediaStyle = (token: GridToken, screenSize: number, sizeCls: string) => {
  return {
    [`@media (min-width: ${screenSize}px)`]: {
      ...genGridStyle(token, sizeCls),
    },
  }
}

export const useColStyle = genComponentStyleHook('Grid', (token) => {
  const gridToken = mergeToken<GridToken>(token, {
    gridColumns: 24,
  })
  const gridMediaSizesMap = {
    '-sm': gridToken.screenSMMin,
    '-md': gridToken.screenMDMin,
    '-lg': gridToken.screenLGMin,
    '-xl': gridToken.screenXLMin,
    '-xxl': gridToken.screenXXLMin,
  }

  return [
    genGridColStyle(gridToken),
    genGridStyle(gridToken, ''),
    genGridStyle(gridToken, '-xs'),
    Object.keys(gridMediaSizesMap)
      .map((key) => genGridMediaStyle(gridToken, gridMediaSizesMap[key], key))
      .reduce((pre, cur) => ({ ...pre, ...cur }), {}),
  ]
})
