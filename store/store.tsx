import {createStore, applyMiddleware, AnyAction} from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import  ThunkMiddleware  from 'redux-thunk';
import reducers from './reducers/reducers';
import {composeWithDevTools} from 'redux-devtools-extension'
import { RootStateOrAny } from 'react-redux';

const bindMiddleware = (middleware:any)=>{
    if(process.env.NODE_ENV !== 'production'){
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
}

export default bindMiddleware;

const reducer =(state:any, action:AnyAction)=>{
    if(action.type === HYDRATE){
        console.log("hydrate")
        const nextState={
            ...state,
            ...action.payload
        }
        return nextState
    }
    else{
        return reducers(state , action)
    }
}

const initStore = () =>{
    return createStore(reducer, bindMiddleware([ThunkMiddleware]));
}

export const wrapper = createWrapper(initStore)