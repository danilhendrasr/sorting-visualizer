interface Props {
  defaultBg: string
  height: number
  width: number
}

export const Bar: React.FC<Props> = ({ defaultBg, height, width }) => {
  const barStylings: React.CSSProperties = {
    height: `${height}%`,
    backgroundColor: defaultBg,
    width: width,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  }

  return <div className="bar" style={barStylings} />
}
