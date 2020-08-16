import {List, withStyles} from "@material-ui/core";
import styled from "styled-components";

export const StyledList = withStyles({
    root: {
        minWidth: 300,
        width: 700,
        maxWidth: '70%'
    }
})(List)

export const Wrapper = styled.main`
    position: relative;
    header {
        display: flex;
        justify-content: space-between;
        padding: 15px;
    }
`
export const ProfilesContainer = styled.div`
    display: flex;
`