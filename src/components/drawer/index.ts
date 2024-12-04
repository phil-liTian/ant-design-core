import type { CSSProperties, ExtractPropTypes } from 'vue'
import { BooleanType, NumberType, ObjectType, StringType, withInstall } from '../_utils/type'
import PropTypes from '../_utils/vue-types'
import Drawer from './Drawer'
export type { ComponentToken } from './style'

type IPlacement = 'left' | 'right' | 'top' | 'bottom'

export function drawProps() {
  return {
    width: PropTypes.oneOfType([Number, String]),
    height: PropTypes.oneOfType([Number, String]),
    rootClassName: String,
    rootStyle: ObjectType<CSSProperties>(),
    bodyStyle: ObjectType<CSSProperties>(),
    placement: StringType<IPlacement>('right'),
    size: StringType<'default' | 'large'>('default'),
    open: BooleanType(false),
    contentWrapperStyle: ObjectType<CSSProperties>(),
    zIndex: NumberType(1000),
    keyboard: BooleanType(true),

    // header
    headerStyle: ObjectType<CSSProperties>(),
    closable: BooleanType(true),
    title: PropTypes.any,
    extra: PropTypes.any,

    // mask
    showMask: BooleanType(true),

    // footer
    footer: PropTypes.any,

    // TODO
    handle: PropTypes.any,
  }
}

export type DrawerProps = Partial<ExtractPropTypes<ReturnType<typeof drawProps>>>

export default withInstall(Drawer)
