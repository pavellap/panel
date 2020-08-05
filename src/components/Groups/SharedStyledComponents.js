import styled from "styled-components";
import {Select, withStyles} from "@material-ui/core";

export const Container = styled.section`
    display: flex;
    padding-top: 20px;
    flex-direction: column;
    header {
        display: flex;
        justify-content: space-between;
        padding: 15px 30px;
        align-items: center;
    }
    footer {
        padding-top: 20px;
        display: flex;
        justify-content: space-around;
    }
    .textarea {
        padding: 15px 30px;
    }
`

export const Wrapper = styled.section`
    display: flex;
    justify-content: center;
    padding: 30px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    h3 {
        text-align: center;
        font-size: 24px;
        font-weight: normal;
    }
    > div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    textarea {
        border: 1px solid #ccc;
        height: 300px;
        width: 600px;
        max-height: 300px;
        max-width: 600px;
        font-size: 22px;
        outline: none;
        padding: 15px;
    }
`

export const StyledSelect = withStyles({
    root: {
        minWidth: 140
    }
})(Select)