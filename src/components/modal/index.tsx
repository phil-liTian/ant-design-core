import type { ExtractPropTypes } from 'vue'
import { withInstall } from '../_utils/type'
import Modal, { modalProps } from './Modal'

export default withInstall(Modal)

export type ModalProps = Partial<ExtractPropTypes<ReturnType<typeof modalProps>>>
