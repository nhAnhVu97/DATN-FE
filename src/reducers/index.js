import { combineReducers } from 'redux';
import article from './article';
import data from './data';
import category from './category';
import notifycation from './notifycation';
import itemEditing from './itemEditing';
import typeNews from './typeNews';
import question from './question';
const appReducers = combineReducers({
    article,
    data,
    category,
    notifycation,
    itemEditing,
    typeNews,
    question
});


export default appReducers;