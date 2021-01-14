export const Bar: React.FC<{ height: number }> = (props) => {
  const { height } = props
  const barStylings: React.CSSProperties = {
    height: `${height}%`,
  }

  return <div className="bg-red-600 w-4" style={barStylings}></div>
}
