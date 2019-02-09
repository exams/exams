import { instance as axios } from '../../axios'
import {papersApi, paperApi} from '../../api/api'

export const PAPER_HTTP_FAILED = 'PAPER_HTTP_FAILED'

export const CREATE_PAPER_SUCCESS = 'CREATE_PAPER_SUCCESS'

export const createPaper = (template) => {
    return (dispatch) => {
        axios.post(papersApi, template).then(response => {
            dispatch({
                type: CREATE_PAPER_SUCCESS,
                data: response.data
            })
        }).catch(error => {
            if (error.response || error.request){
                dispatch({
                    type: PAPER_HTTP_FAILED,
                    data: error
                })
            }
        })
    }
}

export const LIST_PAPER_SUCCESS = 'LIST_PAPER_SUCCESS'

export const listPapers = () => {
    return (dispatch) => {
        axios.get(papersApi).then(response => {
            dispatch({
                type: LIST_PAPER_SUCCESS,
                data: response.data
            })
        }).catch(error => {
            if (error.response || error.request){
                dispatch({
                    type: PAPER_HTTP_FAILED,
                    data: error
                })
            }
        })
    }
}

export const DELETE_PAPER_SUCCESS = 'DELETE_PAPER_SUCCESS'
export const deletePaper = (paperId, index) => {
    const deletePaperApi = paperApi.replace(':paperId', paperId)
    return (dispatch) => {
        axios.delete(deletePaperApi).then(response => {
            dispatch({
                type: DELETE_PAPER_SUCCESS,
                paperId
            })
        }).catch(error => {
            if (error.response || error.request){
                dispatch({
                    type: PAPER_HTTP_FAILED,
                    data: error
                })
            }
        })
    }
}