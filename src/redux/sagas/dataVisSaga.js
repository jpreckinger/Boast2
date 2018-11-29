import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

function* getCategoryData(action) {
    console.log('in get data', action.payload);
    let wins = [];
    let users = [];
    try{
        const response = yield call(axios.get, `/stats/category/${action.payload}` );
        for( let each of response.data ) {
            wins = [...wins, each.wins];
            users = [...users, each.username];
        }
        yield put({type: 'SET_DATA', payload: {wins: wins, users: users}});
    }
    catch (error) {
        console.log('error getting data');
    }
}

function* getGameData(action) {
    let wins = [];
    let users = [];
    try{
        const response = yield call(axios.get, `/stats/game/${action.payload}`);
        for( let each of response.data ) {
            wins = [...wins, each.wins];
            users = [...users, each.username];
        }
        yield put({type: 'SET_DATA', payload: {wins: wins, users: users}});
    }
    catch (error) {
        console.log('error getting game data');
    }
}

function* getAllData() {
    let wins = [];
    let users = [];
    try{
        const response = yield call(axios.get, '/stats/all');
        for( let each of response.data ) {
            wins = [...wins, each.wins];
            users = [...users, each.username];
        }
        yield put({type: 'SET_DATA', payload: {wins: wins, users: users}});
    }
    catch (error) {
        console.log('error getting all data');
    }
}

function* dataVisSaga() {
    yield takeLatest('GET_CATEGORY_DATA', getCategoryData);
    yield takeLatest('GET_ALL_DATA', getAllData);
    yield takeLatest('GET_GAME_DATA', getGameData);
  }

  export default dataVisSaga;