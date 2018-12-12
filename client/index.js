import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import ReactDOM from 'react-dom';
import './style/lib/animate.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reducer as httpData } from './reducer';
import { AppContainer } from 'react-hot-loader';
import Page from './Page';
import axios from 'axios';
import { reducer as paperTemplateReducer } from './components/paperTemplate/reducer';
import { reducer as papersReducer } from './components/paper/reducer';

// redux 注入操作
const middleware = [thunk];

const reducer = combineReducers({
    httpData,
    paperTemplates : paperTemplateReducer,
    papers: papersReducer
})

const store = createStore(reducer, applyMiddleware(...middleware));

const render = Component => {   // 增加react-hot-loader保持状态刷新操作，如果不需要可去掉并把下面注释的打开
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component/>
            </Provider>
        </AppContainer>
        ,
        document.getElementById('root')
    );
};

render(Page);

// axios拦截器
axios.interceptors.request.use(request => {
    const super_exams_token = window.localStorage.getItem('super_exams_token');
    if (super_exams_token) {
        request.headers['Authorization'] =`Bearer ${super_exams_token}`;
    }
    return request;
});
axios.interceptors.response.use(
    response => {
        if (response.data.token) {
            console.log('token');
            window.localStorage.setItem('super_exams_token', response.data.token);
        }
        return response;
    },
    error => {
        const errRes = error.response;
        if (errRes.status === 401) {
            window.localStorage.removeItem('super_exams_token');
            this.props.history.push('/login');
        }
        return Promise.reject(error.message);   // 返回接口返回的错误信息
    });

// Webpack Hot Module Replacement API
if (module.hot) {
    // 隐藏You cannot change <Router routes>; it will be ignored 错误提示
    // react-hot-loader 使用在react-router 3.x上引起的提示，react-router 4.x不存在
    // 详情可参照https://github.com/gaearon/react-hot-loader/issues/298
    const orgError = console.error; // eslint-disable-line no-console
    console.error = (...args) => { // eslint-disable-line no-console
        if (args && args.length === 1 && typeof args[0] === 'string' && args[0].indexOf('You cannot change <Router routes>;') > -1) {
            // React route changed
        } else {
            // Log the error as normally
            orgError.apply(console, args);
        }
    };
    module.hot.accept('./Page', () => {
        render(Page);
    })
}

registerServiceWorker();
