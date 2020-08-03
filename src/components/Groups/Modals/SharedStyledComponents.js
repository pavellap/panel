import styled from "styled-components";
import {TextField, withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";

export const SubmitButton = withStyles({
    root: {
        margin: "20px auto"
    }
})(Button)

export const Input = withStyles({
    root: {
        margin: '0 auto',
        width: '40%'
    }
})(TextField)

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 670px;
  width: 100%;
  padding: 30px 65px;
  margin-right: 30px;
  h2 {
      text-align: center;
      font-weight: normal;
      text-transform: uppercase;
      font-size: 18px;
  }
  h4 {
      text-align: center;
      font-weight: normal;
      margin-top: 22px;
      font-size: 19px;
  }
`

export const UsersContainer = styled.div`
    padding: 20px 25px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    height: 335px;
    border: 1px solid #ccc;
    margin-top: 30px;
`