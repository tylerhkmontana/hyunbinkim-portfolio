import '@/styles/globals.css'
import Layout from '@/components/layout'
import Head from 'next/head'
import { TaskManager } from '../context/taskManager'
 
export default function MyApp({ Component, pageProps }) {
  return (
    <>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="icon" href="/icons/window.png" />
            <title>Hyunbin Kim's Portfolio Website</title>
        </Head>
        <TaskManager>
          <Layout>
              <Component {...pageProps} />
          </Layout>
        </TaskManager>
    </>
  )
}