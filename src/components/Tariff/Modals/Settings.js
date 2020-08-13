import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {Typography, Button, TextField} from "@material-ui/core";
import {fetchSettings, saveSettings} from "../API/api";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 30px 50px;
    align-items: center;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    > div {
        display: flex;
        align-items: center;
        margin-top: 20px;
        span {
            max-width: 545px;
        }
    }
`

const hardcode = {
    upgrade_days: 5,
    first_discount_days: 8,
    second_discount_days: 30,
    third_discount_days: 50,
}

export default function(props) {
    // TODO: валидация форм
    const [first, handleFirst] = useState(hardcode.first_discount_days)
    const [second, handleSecond] = useState(hardcode.second_discount_days)
    const [third, handleThird] = useState(hardcode.third_discount_days)
    const [upgrade, handleUpgrade] = useState(hardcode.upgrade_days)
    useEffect(() => {
        fetchSettings();
    }, []);

    const save = () => {
        saveSettings({
            upgrade_days: upgrade,
            first_discount_days: first,
            second_discount_days: second,
            third_discount_days: third,
        })
    }

    return (
        <Wrapper>
            <Typography component='h2' style={{textAlign: 'center'}}>Настройки чата</Typography>
            <Container>
                <div>
                    <span>Кол-во дней после оформления подписки, когда можно повысить тариф без переплаты</span>
                    <TextField variant='outlined' value={upgrade}
                               onChange={(e) => (handleUpgrade(Number(e.target.value)))}/>
                </div>
                <div>
                    <span>Сколько дней клиент должен иметь подписку для получения 1-й скидки</span>
                    <TextField variant='outlined' value={first}
                               onChange={(e) => (handleFirst(Number(e.target.value)))}/>
                </div>
                <div>
                    <span>Сколько дней клиент должен иметь подписку для получения 2-й скидки</span>
                    <TextField variant='outlined' value={second}
                               onChange={(e) => (handleSecond(Number(e.target.value)))}/>
                </div>
                <div>
                    <span>Сколько дней клиент должен иметь подписку для получения 3-й скидки</span>
                    <TextField variant='outlined' value={third}
                               onChange={(e) => (handleThird(Number(e.target.value)))}/>
                </div>
            </Container>
            <Button variant='contained' color='primary' onClick={save}>Сохранить изменения</Button>
        </Wrapper>
    )
}