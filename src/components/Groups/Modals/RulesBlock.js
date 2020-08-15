import React from 'react'
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import {Checkbox, Tooltip, ListItem, ListItemSecondaryAction, ListItemText, List} from "@material-ui/core";


const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    h3 {
        margin-bottom: 7px;
        font-size: 19px;
        text-align: center;
    }
`



// props: rules
export default function(props) {
    const {title, rights, handleMove, type} = props;
    return (
        <React.Fragment>
            <Container>
                <div>
                    <Typography component={'h3'}>{title}</Typography>
                </div>
                <div>
                    <List>
                        {Object.entries(rights).map(([key, value]) =>
                            (
                                <ListItem key={key} button>
                                    <ListItemText>{value[0]}</ListItemText>
                                    <ListItemSecondaryAction>
                                        <Tooltip title='Добавление/удаление правила у новой группы' placement='top-end'>
                                            <Checkbox checked={value[2] === type ? value[1] : false} onChange={(e) =>
                                                handleMove(key, e.target.checked, type)} disabled={value[2] !== null &&
                                            value[2] !== type
                                            }/>
                                        </Tooltip>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                            )}
                    </List>
                </div>
            </Container>
        </React.Fragment>
    )
}
