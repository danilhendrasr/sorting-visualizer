import { Button } from "@geist-ui/react"
import { useShouldDisableControlPanel } from "../hooks"

interface Props {
  onClick: () => void
}

export const ResetButton: React.FC<Props> = ({ onClick }) => {
  const disable = useShouldDisableControlPanel()

  return (
    <Button disabled={disable} ghost onClick={onClick} type="error">
      Reset
    </Button>
  )
}
