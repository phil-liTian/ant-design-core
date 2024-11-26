import type { ComponentToken as ButtonComponentToken } from '../../button/style'
import type { ComponentToken as AlertComponentToken } from '../../alert/style'
import type { ComponentToken as ModalComponentToken } from '../../modal/style'
import type { ComponentToken as WaveToken } from '../../_utils/wave'

export interface ComponentTokenMap {
  Button?: ButtonComponentToken
  Alert?: AlertComponentToken
  Switch?: {}
  Checkbox?: {}
  Modal?: ModalComponentToken
  Wave?: WaveToken
}
