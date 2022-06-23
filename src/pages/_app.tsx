import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {GlobalStyle, lightTheme} from '../GlobalStyle'

function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
      <GlobalStyle colors={lightTheme}/>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
