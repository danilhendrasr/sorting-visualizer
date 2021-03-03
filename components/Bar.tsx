import { useTheme } from "@geist-ui/react"

export const Bar: React.FC<{
  height: number
  width: number
  elRef: (element: HTMLDivElement) => void
}> = (props) => {
  const { height, width, elRef } = props

  const { palette } = useTheme()

  const barStylings: React.CSSProperties = {
    height: `${height}%`,
    backgroundColor: palette.errorLight,
    width: width,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  }

  return <div className="bar" style={barStylings} ref={elRef}></div>
}
