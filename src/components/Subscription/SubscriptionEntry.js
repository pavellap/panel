import React from 'react'
import './SubscriptionEntry.css'


export default class SubscriptionEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "subscription",
            id: this.props.id,
            chat_id: this.props.chat_id,
            can_write: this.props.can_write,
            name: this.props.name,
            cost: this.props.cost,
            links: this.props.links,
            time: this.props.time
        }
    }
    render() {
        const textArray = ["Без скидки", "Скидка 1", "Скидка 2", "Скидка 3"];
        return (
            <div className='subscription-entry'>
                <div className='entry-header'>
                    <span style={{fontSize: 30}}>ID: {this.props.id}</span>
                    <div>
                        <label style={{marginRight: 10, fontSize: 18}}>Название</label>
                        <input type="text" value={this.props.name}/>
                    </div>
                    <div>
                        <label style={{marginRight: 10, fontSize: 18}}>ID Чата</label>
                        <input type="text" value={this.props.chat_id}/>
                    </div>
                    <div className="pretty p-switch p-fill">
                        <input type="checkbox" checked={this.state.can_write}/>
                        <div className="state">
                            <label>Можно писать в чате</label>
                        </div>
                    </div>
                </div>
                <div className="entries-container">
                    <div className="entries-container-column">
                        <h4>Цена (руб)</h4>
                        {this.state.cost.map((item, index) => (
                            <React.Fragment>
                                <label>{textArray[index]}</label>
                                <input type="text" value={item}/>
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="entries-container-column">
                        <h4>Ссылки на оплату</h4>
                        {this.state.links.map(item => <input type="text" value={item}/>)}
                    </div>
                    <div className="entries-container-column">
                        <h4>Промежуток времени, через который предоставляется скидка</h4>
                        {this.state.time.map(item => <input type="text" value={item}/>)}
                    </div>
                </div>
            </div>
        )
    }
}