import { useTheme } from "@geist-ui/react"

export const Bar: React.FC<{
  height: number
  width: number
}> = (props) => {
  const { height, width } = props

  const { palette } = useTheme()

  const barStylings: React.CSSProperties = {
    height: `${height}%`,
    backgroundColor: palette.errorLight,
    width: width,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  }

  return <div className="bar" style={barStylings}></div>
}
