import styles from './_.module.css'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main className={styles.wrap}>{children}</main>
}
