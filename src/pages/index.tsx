import {DarkMode, LightMode} from '@styled-icons/material-rounded'
import type {NextPage} from 'next'
import dynamic from 'next/dynamic'
import {useState} from 'react'
import {Provider} from 'react-redux'
import {ThemeProvider} from 'styled-components'
import ImageList from '../components/ImageList'
import {darkTheme, GlobalStyle, lightTheme} from '../GlobalStyle'
import {store} from '../store'

const DrawAreaNoSSR = dynamic(
  () => import('../components/DrawArea'),
  {
    ssr: false,
    loading: () => <p>Loading...</p>
  }
)

const Home: NextPage = () => {
  const [theme, setTheme] = useState<any>(lightTheme)
  const themeSwitch = () => {
    (theme === darkTheme) ? setTheme(lightTheme) : setTheme(darkTheme)
  }
  return (
    <div>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <div className="App">
            <DrawAreaNoSSR/>
            <ImageList/>
          </div>
          <div onClick={themeSwitch} style={{
            width: "50px",
            height: "50px",
            textAlign: "center",
            borderRadius: "4px",
            margin: "30px",
            position: "fixed",
            bottom: "170px",
            right: "-20px",
          }}>
            {(theme === darkTheme)
              ? <LightMode size={50} color={darkTheme.fourth}/>
              : <DarkMode size={50} color={lightTheme.fourth}/>}
          </div>
          <GlobalStyle colors={theme}/>
        </ThemeProvider>
      </Provider>
    </div>
  )
}

export default Home
