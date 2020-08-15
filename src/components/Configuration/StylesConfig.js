import {AccordionDetails, List, withStyles} from "@material-ui/core";
import styled from "styled-components";

export const StyledList = withStyles({
    root: {
        width: '100%'
    }
})(List)

export const LoaderWrapper = styled.div`
    padding-top: 20px;
    padding-bottom: 60px;
`

export const StyledDetails = withStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
    }
})(AccordionDetails)

export const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
    padding: 20px;
    border-bottom: 1px solid #e7e8ec;
    background-color: #fafbfc;
    height: 50px;
    > div {
        position: absolute;
        top: 0;
        left: 0;
        background-color: #fff;
        z-index: 100;
        width: 295px;
        min-width: 290px;
    }
`
export const IconWrapper = styled.div`
    display: inline-flex;
    align-items: center;
    position: relative;
    left: 15px
`