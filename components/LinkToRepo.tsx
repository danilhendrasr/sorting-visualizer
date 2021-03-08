import { Github } from "@geist-ui/react-icons"

// @ts-ignore
import styles from "../styles/Home.module.scss"

export const LinkToRepo: React.FC = (props) => {
  return (
    <a
      className={styles.githubIconWrapper}
      href="https://github.com/danilhendrasr/sorting-visualizer"
      target="_blank">
      <Github size={20} color="#000" />
    </a>
  )
}
