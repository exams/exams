import React, {Component} from 'react'
import { Spin, Alert } from 'antd';

class LoadingArea extends Component {
    render () {
        let {status, children} = this.props
        switch (status) {
            case 'initial':
                return <div />
            case 'loading':
                return <Spin size="large" />
            case 'failed':
                return <Alert message="Failed" type="error" />
            case 'completed':
                return children()
            default:
                return <Spin size="large" />
        }
    }
}

export default LoadingArea
