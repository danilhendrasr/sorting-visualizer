import { Button } from "@geist-ui/react"

interface Props {
  disabled: boolean
  onClick: () => void
}

export const ResetButton: React.FC<Props> = (props) => {
  const { disabled, onClick } = props
  return (
    <Button disabled={disabled} ghost onClick={onClick} type="error">
      Reset
    </Button>
  )
}
