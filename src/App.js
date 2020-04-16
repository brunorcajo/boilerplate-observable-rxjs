import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchRepos } from "./store/repos";

const App = () => {
    const dispatch = useDispatch();
    const { repos, isFetching, error } = useSelector((state) => state.repos);

    useEffect(() => {
        dispatch(fetchRepos());
    }, [dispatch]);

    return (
        <>
            {isFetching && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            <div>
                {repos.map((repo) => (
                    <p key={repo.id}>{repo.name}</p>
                ))}
            </div>
        </>
    );
};

export default App;
