import styled from 'styled-components';
import {Close} from "@styled-icons/material-rounded";

export const AnnotationListWrapper = styled.div<{ offset: number }>`
  display: flex;
  flex-direction: column;
  //position: fixed;
  right: 0;
  //left: calc(100vw - ${props => props.offset}px);
  width: min(100vw, 600px);
  height: 720px;
  background-color: ${props => props.theme.second};
  color: ${props => props.theme.first};
  overflow-y: auto;
`

export const Annotation = styled.div<{ focus: boolean }>`
  margin: 10px;
  display: flex;
  flex-direction: row;

  border: 1px solid ${({focus, theme}) => focus ? "blue" : theme.second};
  border-radius: 4px;
  background-color: ${props => props.theme.third};

  h2 {
    margin: 5px 0 0 5px;
    font-size: 1.5rem;
    height: 2rem;
    width: auto;
    flex-grow: 5;
  }
;

  input {
    font-family: JetBrains Mono, monospace;
    flex-grow: 5;
    border: 0;
    width: auto;
    margin: 5px 0 0 5px;
    padding: 0;
    height: 2rem;
    align-items: center;
    font-weight: bold;
    font-size: 1.5rem;
    background: transparent;
    color: blue;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: ${props => props.theme.second};
    }
  }
`
export const Preview = styled.div`
  overflow: hidden;
  border-radius: 3px 0 0 3px;
  height: 37px;
  width: 37px;
`
export const ColoredClose = styled(Close)`
  color: ${props => props.theme.first};

  &:hover {
    color: blue;
  }

  &:active {
    color: red;
  }
`