// @ts-ignore
import styles from "../styles/Home.module.scss"

import { Text } from "@geist-ui/react"

export const AppTitle: React.FC = () => {
  return (
    <Text h1 size="2em" className={styles.textCenter}>
      Sorting Algorithms Visualizer
    </Text>
  )
}
