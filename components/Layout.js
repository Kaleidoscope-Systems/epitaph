import GlobalNav from './Nav'
import Footer from './Footer'
import styles from '../styles/Layout.module.css'
import adminStyles from '../styles/LayoutAdmin.module.css'
import { useRouter } from 'next/router'

const Layout = ({children}) => {
    const router = useRouter()
    const slug = router.pathname;
    if (slug.includes("admin", 1)) {
        return (
        <><GlobalNav /><div className={adminStyles.container}>
            <main className={adminStyles.main}>
                {children}</main>
        </div><Footer /></>
        )
    }
    return (
        <><GlobalNav /><div className={styles.container}>
            <main className={styles.main}>
                {children}</main>
        </div><Footer /></>
    )
}

export default Layout