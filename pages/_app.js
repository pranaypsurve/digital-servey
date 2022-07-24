import '../styles/globals.css'
import Head from 'next/head'
function MyApp({ Component, pageProps }) {
  return <>
  <Head>
    <title>Ultimate Best Digital Servey Platform - 2022</title>
  </Head>
  <Component {...pageProps} />
  </>
}

export default MyApp
