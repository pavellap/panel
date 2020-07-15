import React from 'react'
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import AddBoxIcon from '@material-ui/icons/AddBox';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const List = styled.div`
  display:flex;
  flex-direction: column;
  border: 1px solid black
`


// props: rules
export default function(props) {
    const {title, rules, type, handleEvent, handleRemove} = props;
    return(
        <Container>
            <div>
                <Typography component={'h3'}>{title}</Typography>
                <AddBoxIcon onClick={() => handleEvent(type)}/>
            </div>
            <div>
                <List>
                    {rules.map((item, index) =>
                    <div key={index}>
                        <span>
                            {item}
                        </span>
                        <span>
                            <HighlightOffIcon onClick={() => handleRemove(item)}/>
                        </span>
                    </div>)}
                </List>
            </div>
        </Container>
    )
}