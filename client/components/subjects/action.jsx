import {
    GET_SUBJECT_LIST
} from './actionType'
import { createAsyncAction } from 'redux-action-tools'
import axios from 'axios'
import { papers as papersAPI } from '../../api/api'

export const getPapers = createAsyncAction(
    GET_SUBJECT_LIST,
    () => {
        return axios.get(papersAPI)
    }
)