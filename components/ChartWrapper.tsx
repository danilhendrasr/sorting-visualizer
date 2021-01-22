export const ChartWrapper: React.FC<{ bars: JSX.Element[] }> = (props) => {
  const { bars } = props
  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        alignItems: "flex-end",
        margin: "0 auto",
        width: "fit-content",
      }}>
      {bars}
    </div>
  )
}
