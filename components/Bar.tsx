export const Bar: React.FC<{ height: number }> = (props) => {
  const { height } = props
  const barStylings: React.CSSProperties = {
    height: `${height}%`,
  }

  return <div className="bar bg-red-600 w-1" style={barStylings}></div>
}
