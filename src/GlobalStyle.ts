import {createGlobalStyle} from 'styled-components'


export const lightTheme = {
  first: '#F2F2F2',
  second: '#D9D9D9', // background
  third: '#A6A6A6',
  fourth: '#737373', // borders
}
export const darkTheme = {
  first: '#BFBFBF',
  second: '#363636', // background
  third: '#262626',
  fourth: '#000000', // borders
}

export const GlobalStyle = createGlobalStyle<{ colors: any }>`
  body {
    margin: 0;
    background-color: ${props => props.colors.second};
    font-family: JetBrains Mono, monospace;
  }

  * {
    transition: background-color 0.2s linear;
    
    &::-webkit-scrollbar {
      width: 15px;
      height: 15px;
    }

    &::-webkit-scrollbar-track {
      background: ${props => props.colors.third};
      border-radius: 20px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${props => props.colors.fourth};
      border-radius: 20px;
      border: 3px solid ${props => props.colors.third};
    }
  }

  .App {
    align-content: center;
    margin: auto;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`
