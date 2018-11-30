import React, {Component} from 'react'
import { Spin, Alert, Icon } from 'antd';

class LoadingArea extends Component {
    render () {
        let {status} = this.props;
        const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
        switch (status) {
            case 'initial':
                return <div />
            case 'loading':
                return <Spin size="large" indicator={antIcon} />;
            case 'failed':
                return <Alert message="Failed" type="error" />;
            default:
                return <Spin size="large" indicator={antIcon} />;
        }
    }
}

export default LoadingArea
