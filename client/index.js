import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { AppContainer } from 'react-hot-loader';
import IntlWrapper from './components/core/IntlWrapper';
import Router from './Router';
import CoreReducer from './components/core/reducer';
import IntlReducer from './components/core/IntlReducer';
import RecordsReducer from './components/records/reducer';
import UsersReducer from './components/users/reducer'
import SubjectsReducer from './components/subjects/reducer'
import QuestsReducer from './components/quests/reducer'
import TemplatesReducer from './components/templates/reducer'
import PapersReducer from './components/papers/reducer'

// redux 注入操作
const middleware = [thunk];

const reducer = combineReducers({
    intl: IntlReducer,
    core: CoreReducer,
    records: RecordsReducer,
    users: UsersReducer,
    subjects: SubjectsReducer,
    quests: QuestsReducer,
    template: TemplatesReducer,
    papers: PapersReducer,
})

const store = createStore(reducer, applyMiddleware(...middleware));

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <IntlWrapper>
                    <Component />
                </IntlWrapper>
            </Provider>
        </AppContainer>
        ,
        document.getElementById('root')
    );
};

render(Router);

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
    module.hot.accept('./Router', () => {
        render(Router);
    })
}

registerServiceWorker();
