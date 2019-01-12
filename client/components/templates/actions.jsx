import { instance as axios } from '../../axios'
import { templatesApi } from '../../api/api'

export const TEMPLATE_HTTP_FAILED = 'TEMPLATE_HTTP_FAILED'

export const ADD_TEMPLATE_SUCCESS = 'ADD_TEMPLATE_SUCCESS'

export const addTemplate = (template) => {
    return (dispatch) => {
        axios.post(templatesApi, template).then(response => {
            dispatch({
                type: ADD_TEMPLATE_SUCCESS,
                data: response.data
            })
        }).catch(error => {
            if (error.response || error.request){
                dispatch({
                    type: TEMPLATE_HTTP_FAILED,
                    data: error
                })
            }
        })
    }
}

export const LIST_TEMPLATE_SUCCESS = 'LIST_TEMPLATE_SUCCESS'

export const listTemplate = () => {
    return (dispatch) => {
        axios.get(templatesApi).then(response => {
            dispatch({
                type: LIST_TEMPLATE_SUCCESS,
                data: response.data
            })
        }).catch(error => {
            if (error.response || error.request){
                dispatch({
                    type: TEMPLATE_HTTP_FAILED,
                    data: error
                })
            }
        })
    }
}