import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import AnimalSettings from './AnimalSettings'
import ColorSettings from './ColorSettings'

class Admin extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className='row'>
        <div className='col s12 m10 offset-m1 center'>
          <h2>Animal Survey Settings</h2>
          <AnimalSettings />
          <h2>Color Survey Settings</h2>
          <ColorSettings />
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  let { user } = state
  return { user }
}

export default connect(mapStateToProps)(Admin)
