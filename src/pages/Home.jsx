import React from 'react'

import UserResults from '../components/users/UserResults'
import UserSearch from '../components/users/UserSearch'

function Home() {
  return <>
    {/** User Results */}
    <UserSearch />
    <UserResults />
  </>
}

export default Home