import { useTheme } from "@geist-ui/react"

export const Bar: React.FC<{ height: number; ref: (element: any) => number }> = (
  props
) => {
  const { height, ref } = props

  const { palette } = useTheme()

  const barStylings: React.CSSProperties = {
    height: `${height}%`,
    backgroundColor: palette.errorLight,
    width: "5px",
    marginRight: 5,
  }

  return <div className="bar" style={barStylings} ref={ref}></div>
}
