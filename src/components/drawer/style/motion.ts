export const genMotionStyle = (token) => {
  const { componentCls, motionDurationSlow, motionDurationMid } = token

  const sharedPanelMotion = {
    '&-enter,&-appear,&-leave': {
      '&-active': {
        transition: `all ${motionDurationMid}`,
      },
    },
  }

  return {
    [`${componentCls}`]: {
      // mask
      [`${componentCls}-mask-motion`]: {
        '&-enter,&-appear,&-leave': {
          '&-active': {
            transition: `all ${motionDurationSlow}`,
          },
        },

        '&-enter,&-appear': {
          opacity: '0',
          '&-active': {
            opacity: '1',
          },
        },

        '&-leave': {
          opacity: '1',
          '&-active': {
            opacity: '0',
          },
        },
      },

      // panel
      [`${componentCls}-panel-motion`]: {
        // left
        '&-left': {
          ...sharedPanelMotion,
          '&-enter,&-prepare': {
            '&-start': {
              transform: 'translateX(-100%)',
            },
            '&-active': {
              transform: 'translateX(0)',
            },
          },
          '&-leave': {
            transform: 'translateX(0)',
            '&-active': {
              transform: 'translateX(-100%)',
            },
          },
        },

        // right
        '&-right': {
          ...sharedPanelMotion,
          '&-enter,&-appear': {
            '&-start': {
              transform: 'translateX(100%)',
            },
            '&-active': {
              transform: 'translateX(0)',
            },
          },
          '&-leave': {
            transform: 'translateX(0)',
            '&-active': {
              transform: 'translateX(100%)',
            },
          },
        },

        // top
        '&-top': {
          ...sharedPanelMotion,
          '&-enter,&-appear': {
            '&-start': {
              transform: 'translateY(-100%)',
            },
            '&-active': {
              transform: 'translateX(0)',
            },
          },
          '&-leave': {
            transform: 'translateX(0)',
            '&-active': {
              transform: 'translateY(-100%)',
            },
          },
        },

        // bottom
        '&-bottom': {
          ...sharedPanelMotion,
          '&-enter,&-appear': {
            '&-start': {
              transform: 'translateY(100%)',
            },
            '&-active': {
              transform: 'translateX(0)',
            },
          },
          '&-leave': {
            transform: 'translateX(0)',
            '&-active': {
              transform: 'translateY(100%)',
            },
          },
        },
      },
    },
  }
}
