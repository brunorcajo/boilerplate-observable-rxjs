import { ofType } from "redux-observable";
import { of } from "rxjs";
import { map, mergeMap, delay, catchError } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import api from "../services/api";

const TYPES = {
    FETCH_REPOS_REQUEST: "FETCH_REPOS_REQUEST",
    FETCH_REPOS_SUCCESS: "FETCH_REPOS_SUCCESS",
    FETCH_REPOS_FAILURE: "FETCH_REPOS_FAILURE",
};

const initialState = {
    isFetching: false,
    status: null,
    error: "",
    repos: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.FETCH_REPOS_REQUEST:
            return { ...state, isFetching: true, status: null, error: null };

        case TYPES.FETCH_REPOS_FAILURE:
            return {
                ...state,
                isFetching: false,
                status: "error",
                error: action.error,
                repos: [],
            };

        case TYPES.FETCH_REPOS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                status: "success",
                error: null,
                repos: action.repos,
            };

        default:
            return state;
    }
};

const fetchRepos = () => ({
    type: TYPES.FETCH_REPOS_REQUEST,
});

const fetchFailure = (error) => ({
    type: TYPES.FETCH_REPOS_FAILURE,
    error,
});

const fetchSuccess = (repos) => ({
    type: TYPES.FETCH_REPOS_SUCCESS,
    repos,
});

const fetchRepoEpic = (action$) =>
    action$.pipe(
        ofType(TYPES.FETCH_REPOS_REQUEST),
        mergeMap((action) =>
            ajax.getJSON(`${api.github}/repositories`).pipe(
                delay(5000),
                map((repos) => fetchSuccess(repos)),
                catchError((error) => of(fetchFailure(error.xhr.response)))
            )
        )
    );

export { fetchRepos, fetchRepoEpic };
export default reducer;
