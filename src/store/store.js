import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { createEpicMiddleware, combineEpics } from "redux-observable";

import reposReducer, { fetchRepoEpic } from "./repos";
import usersReducer from "./users";

const epicMiddleware = createEpicMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combinedEpics = combineEpics(fetchRepoEpic);

const combinedReducers = combineReducers({
    users: usersReducer,
    repos: reposReducer,
});

const store = createStore(
    combinedReducers,
    composeEnhancers(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(combinedEpics);

export default store;
