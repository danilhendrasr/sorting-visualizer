export const ChartWrapper: React.FC<{ bars: JSX.Element[] }> = (props) => {
  const { bars } = props
  return <div className="flex w-min mx-auto h-screen space-x-2 items-end">{bars}</div>
}
