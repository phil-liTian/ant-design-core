import type { App } from 'vue'
import * as components from './components'
console.log('components', components)

export const install = (app: App) => {
  Object.keys(components).forEach((key) => {
    const component = (components as any)[key]
    if (component.install) {
      app.use(component)
    }
  })
}

export default install
