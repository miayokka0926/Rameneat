// record time do discount
import React, { Component } from 'react'
import { Typography } from 'antd';
const { Text } = Typography;

export default class TimeCountUp extends Component {

    constructor(props) {
        super();
        this.state = {
            min: "",
            sec: ""
        }
    }

    tick() {
        let now = new Date()
        let upd = Date.parse(this.props.updatedAt)
        this.setState({ min: parseInt((now - upd) / 60000) })
        let secs = ((now - upd) - this.state.min * 60000) / 1000
        this.setState({ sec: parseInt(secs) })
    }

    
    //run tick() every sec
    //update DOM everySec
    componentDidMount() {
        this.timeID = setInterval(
            () => this.tick(), 1000); 

    }

    // tear down timer so that interval start over.
    componentWillUnmount() {
        clearInterval(this.timeID); 
    }


    render() {

        return (
            <div>

                {
                    (window.location.pathname === '/orders' && (14 - this.state.min) >= 0)
                        ? <p><Text style={{ fontSize: 20 }} strong={true}>
                            {'Time countdown until discount: ' + (14 - this.state.min) + ' mins, ' + (60 - this.state.sec) + ' secs'} </Text></p>
                        : <p><Text style={{ fontSize: 20 }} strong={true}> {'Time countup: ' + this.state.min + ' mins, ' + this.state.sec + ' secs'} </Text></p>
                }

            </div>
        )
    }
}
