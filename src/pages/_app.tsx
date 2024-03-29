import '../../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import Layout from '../components/Layout'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../app/store'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
