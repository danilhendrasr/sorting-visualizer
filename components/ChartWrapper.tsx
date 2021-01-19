export const ChartWrapper: React.FC<{ bars: JSX.Element[] }> = (props) => {
  const { bars } = props
  return <div className="flex w-min mx-auto h-5/6 space-x-1 items-end">{bars}</div>
}
