import { Button } from "@geist-ui/react"
import { useControlsDisabled } from "../hooks"

interface Props {
  onClick: () => void
}

export const ResetButton: React.FC<Props> = (props) => {
  const { onClick } = props
  const isControlsDisabled = useControlsDisabled()

  return (
    <Button disabled={isControlsDisabled} ghost onClick={onClick} type="error">
      Reset
    </Button>
  )
}
