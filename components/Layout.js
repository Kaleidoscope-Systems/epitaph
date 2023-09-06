import Head from 'next/head'
import GlobalNav from './Nav'
import Footer from './Footer'
import styles from '../styles/Layout.module.css'
import adminStyles from '../styles/LayoutAdmin.module.css'
import { useRouter } from 'next/router'

const Layout = ({children, title = 'Ss. Nicodemus & Joseph Burial Society', module}) => {
    const router = useRouter()
    const slug = router.pathname;
    if (slug.includes("admin", 1)) {
        return (
        <>
        <Head>
			<title>{title}</title>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="description" content="Ss. Nicodemus and Joseph Burial Society of Northern Colorado" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
        <GlobalNav module={module} /><div className={adminStyles.container}>
            <main className={adminStyles.main}>
                {children}</main>
        </div><Footer /></>
        )
    }
    return (
        <><GlobalNav module={module}/><div className={styles.container}>
            <main className={styles.main}>
                {children}</main>
        </div><Footer /></>
    )
}

export default Layout