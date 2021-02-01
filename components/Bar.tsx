import { useTheme } from "@geist-ui/react"

export const Bar: React.FC<{
  height: number
  elRef: (element: HTMLDivElement) => void
}> = (props) => {
  const { height, elRef } = props

  const { palette } = useTheme()

  const barStylings: React.CSSProperties = {
    height: `${height}%`,
    backgroundColor: palette.errorLight,
    width: "5px",
    marginRight: 5,
  }

  return <div className="bar" style={barStylings} ref={elRef}></div>
}
