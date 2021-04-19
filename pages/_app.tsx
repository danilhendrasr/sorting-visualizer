import {
  GeistProvider,
  CssBaseline,
  useTheme,
  GeistUIThemesPalette,
} from "@geist-ui/react"
import { BarPaletteCtx } from "../contexts/app-state"
import { BarColorPalette } from "../types"

function MyApp({ Component, pageProps }) {
  const { palette: geistUIPalette } = useTheme()
  const barPalette = getBarPalette(geistUIPalette)

  return (
    <GeistProvider>
      <CssBaseline />
      <BarPaletteCtx.Provider value={barPalette}>
        <Component {...pageProps} />
      </BarPaletteCtx.Provider>
    </GeistProvider>
  )
}

/**
 * Get bar color palette from Geist UI's color palette
 * @param geistUIPalette Geist UI's color palette
 * @returns Bar color palette
 */
const getBarPalette = (geistUIPalette: GeistUIThemesPalette) => {
  const barPalette: BarColorPalette = {
    compare: geistUIPalette.foreground,
    idle: geistUIPalette.accents_4,
    correctOrder: geistUIPalette.cyan,
    swap: geistUIPalette.success,
    wrongOrder: geistUIPalette.error,
  }
  return barPalette
}

export default MyApp
