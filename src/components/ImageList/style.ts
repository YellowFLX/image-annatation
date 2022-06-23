import styled from 'styled-components';
import {Close, Upload} from "@styled-icons/material-rounded";

export const ImageListWrapper = styled.div`
  margin: 10px auto 0;
  padding: 10px 0.5rem 20px 0.5rem;
  display: flex;
  flex-direction: row;
  width: 98vw;
  background-color: ${props => props.theme.third};
  border: 4px solid ${props => props.theme.fourth};
  border-radius: 15px 15px 0 0;
  border-bottom: none;
  bottom: 0;
  overflow-y: hidden;
  overflow-x: scroll;

  
`
export const ImageWrapper = styled.div<{ border?: boolean }>`
  height: 150px;
  border: 1px solid ${({border}) => border ? "blue" : "#3c3f41"};
  margin: 0 1rem 0;
  background-color: ${props => props.theme.second};

  &:first-child {
    margin-left: auto;
  }

  &:last-child {
    margin-right: auto;
  }
`
export const ColoredUpload = styled(Upload)`
  color: ${props => props.theme.fourth};
  margin: auto 0;
  &:hover {
    color: blue;
  }

  &:active {
    color: red;
  }
`

export const ColoredClose = styled(Close)`
  color: #fff;
  position: absolute;
  margin-top: 110px;
  margin-left: -40px;
  mix-blend-mode: difference;
  &:hover {
    color: blue;
  }

  &:active {
    color: red;
  }
`
