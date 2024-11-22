import Theme from './Theme'
import ThemeCache from './ThemeCache'

const cacheThemes = new ThemeCache()
export default function createTheme(derivative) {
  cacheThemes.set(derivative, new Theme(derivative))

  return cacheThemes.get(derivative)
}
