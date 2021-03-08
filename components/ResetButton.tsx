import { Button } from "@geist-ui/react"
import { useControlsDisabled } from "../hooks"

interface Props {
  onClick: () => void
}

export const ResetButton: React.FC<Props> = ({ onClick }) => {
  const isControlsDisabled = useControlsDisabled()

  return (
    <Button disabled={isControlsDisabled} ghost onClick={onClick} type="error">
      Reset
    </Button>
  )
}
