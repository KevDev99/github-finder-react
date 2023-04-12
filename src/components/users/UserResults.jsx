import React, { useContext, useEffect } from 'react'

import Spinner from '../layout/Spinner'
import UserItem from './UserItem'

import GithubContext from '../../context/github/GithubContext'

function UserResults() {
    const { loading, users } = useContext(GithubContext)


    if (!loading) {
        return (
            <div style={userStyle}>
                {users.map((user) => (<UserItem key={user.id} user={user} />))}
            </div>
        )
    } else {
        return <Spinner />
    }



}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
};

export default UserResults