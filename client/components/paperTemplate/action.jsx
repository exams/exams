import {
    GET_PAPER_TEMPLATE_LIST
} from './actionType'
import { createAsyncAction } from 'redux-action-tools'
import { axios_instance as axios } from '../../axios'
import { paperTempaltes as paperTempaltesAPI } from '../../api/api'

export const getPaperTemplates = createAsyncAction(
    GET_PAPER_TEMPLATE_LIST,
    () => {
        return axios.get(paperTempaltesAPI)
    }
)