import React from 'react'

export default class Layout extends React.Component {
    render() {
        return (
            <div className='main-layout'>
                {this.props.children}
            </div>
        )
    }

}