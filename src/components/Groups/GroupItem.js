import React from "react";
import styled from "styled-components";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import {Tooltip} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 25px;
  border: 1px solid lightgray;
  align-items: center;
  cursor: pointer;
  span {
      margin-right: 30px;
  }
`
// todo: ховеры
// прокидывать ли туда ещё индекс (уровень важности)
// делается через индекс массива
export default function(props) {
    const {id, name} = props;
    return (
        <Container>
            <div>
                <Tooltip title='Просмотр и редактирование группы' placement='right-start'>
                    <span onClick={() => props.toggleModal(true, 'edit', id)}><VisibilityIcon/></span>
                </Tooltip>
                <span>ID: {id}</span>
                <span>{name}</span>
            </div>
            <div>
                <Tooltip title='Изменяет приоритетность группы' placement='right-start'>
                    <span onClick={() => props.handleMove(id, 'up')}>
                        <KeyboardArrowUpIcon cursor='pointer'/>
                    </span>
                </Tooltip>
                <Tooltip title='Изменяет приоритетность группы' placement='right-start'>
                    <span onClick={() => props.handleMove(id, 'down')}>
                        <KeyboardArrowDownIcon cursor='pointer'/>
                    </span>

                </Tooltip>
                <Tooltip title='Удалить группу' placement='right-start'>
                    <span onClick={() => props.toggleModal(true, 'delete', id)}>
                    <DeleteIcon cursor='pointer'/>
                    </span>
                </Tooltip>
            </div>
        </Container>
    )
}