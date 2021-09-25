import React from 'react'

import Grid from '../Grid'
import Protected from '../Protected'
import Loading from '../Loading'

import useGetToken from '../../hooks/useGetToken'

const GridPage = props => {
  const [token, loading] = useGetToken()

  return (
    <div className="next-steps my-5">
      {token ? (
        <Grid token={token} />
      ) : loading ? (
        <Loading grid={true} />
      ) : (
        <Protected />
      )}
    </div>
  )
}

export default GridPage
