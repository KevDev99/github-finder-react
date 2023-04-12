import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";
import userEvent from "@testing-library/user-event";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL

export const GithubProvider = ({ children }) => {

    const initialState = { users: [], user: {}, loading: false, repos: [] }
    const [state, dispatch] = useReducer(githubReducer, initialState)

    const searchUsers = async (text) => {
        setLoading()

        const params = new URLSearchParams({
            q: text
        })

        const response = await fetch(`${GITHUB_URL}/search/users?${params}`);
        const { items } = await response.json();

        dispatch({
            type: 'GET_USERS',
            payload: items
        })
    }

    const clearUsers = () => {
        dispatch({
            type: 'GET_USERS',
            payload: []
        })
    }

    const setLoading = (payload = true) => {
        dispatch({
            type: 'SET_LOADING',
            payload: payload
        })
    }

    const getUser = async (login) => {
        setLoading()

        const response = await fetch(`${GITHUB_URL}/users/${login}`);

        if (response.status === 404) {
            window.location = '/notfound'
        } else {
            const data = await response.json();

            dispatch({
                type: 'GET_USER',
                payload: data
            })
        }
    }

    const getUserRepos = async (login) => {
        setLoading()
        const response = await fetch(`${GITHUB_URL}/users/${login}/repos`);
        const data = await response.json();

        dispatch({
            type: 'GET_REPOS',
            payload: data
        })
    }


    return <GithubContext.Provider value={{ ...state, searchUsers, clearUsers, getUser,getUserRepos }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext