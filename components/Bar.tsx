import { useTheme } from "@geist-ui/react"

interface Props {
  height: number
  width: number
}

export const Bar: React.FC<Props> = ({ height, width }) => {
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
