import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import UserAddContainer from './containers/UserAddContainer'
import UsersContainer from './containers/UsersContainer'


class Users extends Component{
    render() {
        return (
            <div>
                <UserAddContainer />
                <UsersContainer />
            </div>
        );
    }
}


export default withRouter(Users);
