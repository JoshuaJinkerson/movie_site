import React from 'react'

export default class Detail extends React.Component {
    render() {
        return (
            <div>
                <img src={this.props.image} alt="" className="thumbnail"></img>
            </div>
        )
    }
}
