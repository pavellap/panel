import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
export default function(props) {
    return (
        <div>
            <Typography>Вы действительно хотите удалить группу c id: {props.id}?</Typography>
            <Box>
                <Button color='primary' variant='contained' onClick={() => props.approveAction(true)}>Да</Button>
                <Button color='secondary' variant='contained' onClick={() => props.approveAction(false)}>Нет</Button>
            </Box>
        </div>
    )
}