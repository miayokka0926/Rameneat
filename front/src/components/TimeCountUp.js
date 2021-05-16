// record time to do discount
import React, { Component } from 'react'
import { Typography } from 'antd';
import { now } from 'mongoose';
const { Text } = Typography;

export default class TimeCountup extends Component {

    constructor(props){
        super();
        this.state = {
            min: "",
            sec: ""
        }
    }
    
    tick(){
        let now = new Date()
        let upd  = Date.parse(this.props.updatedAt)
        let mins = parseInt((now - upd) / 60000)

        
        let secs = parseInt(((now - Date.parse(this.props.updatedAt)) - mins * 60000) / 1000)
        this.setState({min: mins})
        this.setState({sec:secs})

        //console.log(this.state.sec)
        
    }
    //run tick() every sec
    componentDidMount(){
        this.timeID = setInterval(
            () => this.tick(), 1000); //update DOM everySec
        
    }

    componentWillUnmount(){
        clearInterval(this.timeID); // tear down timer so that interval start over.
    }

    

    render() {


        
        return (
            <div>
                <Text strong = {true}> { 'time countup: ' + this.state.min + ' mins, ' + this.state.sec + ' secs'} </Text>
            </div>
        )
    }
}
