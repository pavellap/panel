import React from 'react'
import EditEntry from "../Messages/EditEntry";


export default function (props) {
    return (
        <div>
            <div style={{display: "flex"}}>
                <EditEntry text='Id' inputValue='Id' help-info='Id, который будет присвоен пользователю'/>
                <EditEntry text='Название подписки' inputValue='Название' help-info='Название создаваемой подписки'/>
                <EditEntry text='Цена подписки' inputValue='Стоимость'/>
                <EditEntry text='Ссылка на оплату' inputValue='Ссылка'/>
            </div>
            <div className='sub-entry'>
                <span>Разрешить писать в чате</span>
                <input type="checkbox"/>
            </div>
        </div>
    )
}