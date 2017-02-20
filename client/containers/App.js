import React from 'react';
import NavBar from '../components/NavBar'
import { login } from '../actions/auth';
import { connect } from 'react-redux'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    $('.button-collapse').sideNav({closeOnClick: true, menuWidth: 200})
    this.props.dispatch(login());
  }


  render() {
    return(
      <div>
        <NavBar />
        { this.props.children }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { user } = state
  return { user }
}

export default connect(mapStateToProps)(App)
