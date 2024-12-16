import type { ComponentToken as ButtonComponentToken } from '../../button/style'
import type { ComponentToken as AlertComponentToken } from '../../alert/style'
import type { ComponentToken as ModalComponentToken } from '../../modal/style'
import type { ComponentToken as SwitchComponentToken } from '../../switch/style'
import type { ComponentToken as SelectComponentToken } from '../../select/style'
import type { ComponentToken as TagComponentToken } from '../../tag/index'
import type { ComponentToken as DividerComponentToken } from '../../divider/style'
import type { ComponentToken as SpinComponentToken } from '../../spin/style'
import type { ComponentToken as WaveToken } from '../../_utils/wave'
import type { ComponentToken as DrawerToken } from '../../drawer/style'
import type { ComponentToken as SegmentedToken } from '../../segmented/style'
import type { ComponentToken as ResultToken } from '../../result/style'
import type { ComponentToken as EmptyToken } from '../../empty/style'

export interface ComponentTokenMap {
  Button?: ButtonComponentToken
  Alert?: AlertComponentToken
  Switch?: SwitchComponentToken
  Checkbox?: {}
  Modal?: ModalComponentToken
  Wave?: WaveToken
  Input?: {}
  Radio?: {}
  Select?: SelectComponentToken
  Tag?: TagComponentToken
  Divider?: DividerComponentToken
  Spin?: SpinComponentToken
  Drawer?: DrawerToken
  Segmented?: SegmentedToken
  Grid?: {}
  Result?: ResultToken
  Tree?: {}
  Empty?: EmptyToken
  // TODO: add more components token here
}
