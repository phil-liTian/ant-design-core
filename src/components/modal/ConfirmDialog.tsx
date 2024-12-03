import { defineComponent } from 'vue'
import {
  ExclamationCircleFilled,
  InfoCircleFilled,
  CheckCircleFilled,
  CloseCircleFilled,
} from '@ant-design/icons-vue'
import Dialog, { type ModalFuncProps } from './Modal'
import ActionButton from '../_utils/ActionButton'
import classNames from '../_utils/classNames'
interface ConfirmDialogProps extends ModalFuncProps {
  close?: (...args: any[]) => void
  rootPrefixCls?: string
}

const renderSomeContent = (content: any) => {
  if (typeof content === 'function') {
    return content()
  }
  return content
}

export default defineComponent<Partial<ConfirmDialogProps>>({
  name: 'ConfirmDialog',
  inheritAttrs: false,
  props: [
    'icon',
    'onCancel',
    'onOk',
    'close',
    'closable',
    'zIndex',
    'afterClose',
    'visible',
    'open',
    'keyboard',
    'centered',
    'getContainer',
    'maskStyle',
    'okButtonProps',
    'cancelButtonProps',
    'okType',
    'prefixCls',
    'okCancel',
    'width',
    'mask',
    'maskClosable',
    'okText',
    'cancelText',
    'autoFocusButton',
    'transitionName',
    'maskTransitionName',
    'type',
    'title',
    'content',
    'direction',
    'rootPrefixCls',
    'bodyStyle',
    'closeIcon',
    'modalRender',
    'focusTriggerAfterClose',
    'wrapClassName',
    'confirmPrefixCls',
    'footer',
  ] as any,
  setup(props) {
    return () => {
      const {
        open,
        icon,
        type,
        title,
        content,
        footer,
        close,
        width = 416,
        okCancel,
        okText = '确认',
        okType = 'primary',
        onOk,
        okButtonProps,
      } = props
      let mergedIcon = icon
      // 如果okCancel为true, 或者是confirm类型的modal, 则显示cancel button
      const mergedOkCancel = okCancel ?? type === 'confirm'
      const cancelButton = mergedOkCancel && (
        <ActionButton close={close}>{renderSomeContent(props.cancelText) || '取消'}</ActionButton>
      )

      if (!icon || icon === null) {
        switch (type) {
          case 'info': {
            mergedIcon = <InfoCircleFilled />
            break
          }
          case 'success': {
            mergedIcon = <CheckCircleFilled />
            break
          }
          case 'error': {
            mergedIcon = <CloseCircleFilled />
            break
          }
          default:
            mergedIcon = <ExclamationCircleFilled />
        }
      }

      const prefixCls = props.prefixCls || 'phil-modal'
      const contentPrefixCls = `${prefixCls}-confirm`

      const classString = classNames(contentPrefixCls, `${contentPrefixCls}-${props.type}`)

      return (
        <Dialog
          onCancel={close}
          width={width}
          class={classString}
          title=""
          footer=""
          prefixCls={prefixCls}
          open={open}
        >
          <div class={`${contentPrefixCls}-body-wrapper`}>
            <div class={`${contentPrefixCls}-body`}>
              {renderSomeContent(mergedIcon)}
              {title && <span class={`${contentPrefixCls}-title`}>{renderSomeContent(title)}</span>}
              <div class={`${contentPrefixCls}-content`}>{renderSomeContent(content)}</div>
            </div>

            {footer ? (
              renderSomeContent(title)
            ) : (
              <div class={`${contentPrefixCls}-btns`}>
                {cancelButton}
                <ActionButton actionFn={onOk} close={close} type={okType} {...okButtonProps}>
                  {renderSomeContent(okText) || okText}
                </ActionButton>
              </div>
            )}
          </div>
        </Dialog>
      )
    }
  },
})
