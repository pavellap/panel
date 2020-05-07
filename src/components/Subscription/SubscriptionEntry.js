import React from 'react'
import './SubscriptionEntry.css'


export default class SubscriptionEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "subscription",
            id: this.props.id,
            chat_id: this.props.chat_id,
            can_write: !this.props.can_write,
            name: this.props.name,
            cost: this.props.cost,
            links: this.props.links,
            time: this.props.time
        }
    }

    handleChange = (val = null, type = null, position = null) => {
        console.log("Val:", val);
        this.props.saveChange(this.state);
        console.log("Получаем значения:", val);
        if (type === "checkbox")
            this.setState({can_write: val});
        else if (type === "name") {
            console.log("Меняем имя");
            this.setState({name: val});
        }
        else if (type === "chat_id")
            this.setState({chat_id: val});
        else if (type === "cost") {
            const costs = this.state.cost;
            costs[position] = val;
            this.setState({cost: costs})
        }
        else if (type === "links") {
            const links = this.state.links;
            links[position] = val;
            this.setState({links: links})
        }
        else if (type === "time") {
            const times = this.state.time;
            times[position] = val;
            this.setState({time: times})
        }
    };

    render() {
        const textArray = ["Без скидки", "Скидка 1", "Скидка 2", "Скидка 3"];
        return (
            <div className='subscription-entry'>
                <div className='entry-header'>
                    <span style={{fontSize: 30}}>ID: {this.props.id}</span>
                    <div>
                        <label style={{marginRight: 10, fontSize: 18}}>Название</label>
                        <input type="text" value={this.state.name} onChange={(e) =>
                        this.handleChange(e.currentTarget.value, "name", null)}/>
                    </div>
                    <div>
                        <label style={{marginRight: 10, fontSize: 18}}>ID Чата</label>
                        <input type="text" value={this.state.chat_id} onChange={(e) =>
                            this.handleChange(e.currentTarget.value, "chat_id", null)}/>
                    </div>
                    <div className="pretty p-switch p-fill">
                        <input type="checkbox" checked={this.state.can_write} onChange={(e) =>
                            this.handleChange(e.currentTarget.checked, "checkbox", null)}/>
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
                                <input type="text" value={item} onChange={(e) =>
                                    this.handleChange(e.currentTarget.value, "cost", index)}/>
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="entries-container-column">
                        <h4>Ссылки на оплату</h4>
                        {this.state.links.map((item, index) => <input type="text" value={item} onChange={(e) =>
                            this.handleChange(e.currentTarget.value, "links", index)}/>)}
                    </div>
                    <div className="entries-container-column">
                        <h4>Промежуток времени, через который предоставляется скидка</h4>
                        {this.state.time.map((item, index) => <input type="text" value={item} onChange={(e) =>
                            this.handleChange(e.currentTarget.value, "time", index)}/>)}
                    </div>
                </div>
            </div>
        )
    }
}