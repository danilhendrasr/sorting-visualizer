export const ChartWrapper: React.FC<{ bars: JSX.Element[] }> = (props) => {
  const { bars } = props
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "flex-end",
        margin: "0 auto",
        width: "100%",
        justifySelf: "flex-end",
        alignSelf: "flex-end",
        justifyContent: "space-evenly",
      }}>
      {bars}
    </div>
  )
}
