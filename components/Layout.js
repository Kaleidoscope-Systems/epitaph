import GlobalNav from './Nav'
import Footer from './Footer'
import styles from '../styles/Layout.module.css'

const Layout = ({children}) => {
    return (
        <><GlobalNav /><div className={styles.container}>
            <main className={styles.main}>
                {children}</main>
        </div><Footer /></>
    )
}

export default Layout