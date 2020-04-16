const TYPES = {
  FETCH_USERS_REQUEST: "FETCH_USERS_REQUEST",
  FETCH_USERS_SUCCESS: "FETCH_USERS_SUCCESS",
  FETCH_USERS_FAILURE: "FETCH_USERS_FAILURE",
};

const initialState = {
  isFetching: false,
  status: null,
  error: "",
  users: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.FETCH_USERS_REQUEST:
      return { ...state, isFecthing: true, status: null, error: null };

    case TYPES.FETCH_USERS_FAILURE:
      return { ...state, isFetching: false, status: "error", error: action.error, users: [] };

    case TYPES.FETCH_USERS_SUCCESS:
      return { ...state, isFetching: false, status: "success", error: null, users: action.USERS };

    default:
      return state;
  }
};

const fetchRepo = (name) => ({
  type: TYPES.FETCH_USERS_REQUEST,
  name,
});

const fetchFailure = () => ({
  type: TYPES.FETCH_USERS_FAILURE,
});

const fetchSuccess = () => ({
  type: TYPES.FETCH_USERS_SUCCESS,
});

export { fetchRepo };
export default reducer;
