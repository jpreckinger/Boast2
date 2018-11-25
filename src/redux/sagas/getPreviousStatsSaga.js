import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

function* getStats(action) {
    console.log('in previous saga');
    let previousStats = {
        stats: [],
        notes: []
    };
    try{
        const firstResponse = yield call(axios.get, `/previous/${action.payload}`);
        console.log('response of previous', firstResponse.data);
        for(let instance_id of firstResponse.data){
            let statLine = yield call(axios.get, `/previous/stats/${instance_id.id}`);
            previousStats.stats =  [...previousStats.stats, statLine.data];
            let noteLine = yield call(axios.get, `/previous/notes/${instance_id.id}`);
            previousStats.notes =  [...previousStats.notes, noteLine.data[0]];
           
            // previousStats.notes = [...previousStats.notes, {
            //     notes: yield call(axios.get, `/previous/notes/${instance_id.id}`)
            // }];
        };
        yield put({type: 'SET_PREVIOUS_STATS', payload: {
            stats: previousStats.stats, 
            notes: previousStats.notes
        }})        
    }
    catch (error) {
        console.log('error getting 3');
    }
}

function* getPreviousStatsSaga() {
    yield takeLatest('GET_PREVIOUS_STATS', getStats);
  }

  export default getPreviousStatsSaga;