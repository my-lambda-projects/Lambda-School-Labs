import React from 'react'
import loading from '../../assets/loading.svg'

const Loading = ({ grid }) =>
  grid ? (
    <div className="gridSpinner">
      <img src={loading} alt="Loading" />
    </div>
  ) : (
    <div className="spinner">
      <img src={loading} alt="Loading" />
    </div>
  )

export default Loading
