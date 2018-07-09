import { combineReducers } from 'redux';
import article from './article';
import category from './category';
import notifycation from './notifycation';
import itemEditing from './itemEditing';
import typeNews from './typeNews';
import question from './question';
import testType from './testType';
import group_answer from './group_answer';
import auth from './auth';
const appReducers = combineReducers({
    article,
    category,
    notifycation,
    itemEditing,
    typeNews,
    question,
    testType,
    group_answer,
    auth
});


export default appReducers;