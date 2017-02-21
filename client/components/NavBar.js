import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { logout, login } from '../actions/auth';



class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.navs = this.navs.bind(this)
    this.logout = this.logout.bind(this)
  }

  logout(e) {
    e.preventDefault()
    browserHistory.push('/signin')
    this.props.dispatch(logout(this.props.history))
  }

  navs() {
    if(this.props.user.email) {
      return(
        <div>
          <li><Link to='/colorform'>Colors</Link></li>
          <li><Link to='/'>Animals</Link></li>
          <li><Link to='/admin'>Admin</Link></li>
          <li><a style={{ cursor: 'pointer'}} onClick={this.logout}>Logout</a></li>
        </div>
      )
    } else {
      return(
        <div>
          <li><Link to='/colorform'>Colors</Link></li>
          <li><Link to='/'>Animals</Link></li>
          <li><Link to='/signin'>Sign In</Link></li>
          <li><Link to='/signup'>Sign Up</Link></li>
        </div>
      )
    }
  }

  render() {
    return(
      <div>
        <nav id='top-nav' style={{zIndex: '999', position: 'relative', backgroundColor: 'black'}}>
          <div className='nav-wrapper'>
            <Link to='/' className='brand-logo'><span style={{marginLeft: '14px', marginTop: '12px'}} className="nav-logo"></span><span className="logo-text"></span></Link>
            <a href='#' data-activates='mobile' className='button-collapse'>
              <i className='material-icons'>menu</i>
            </a>
            <ul className='right hide-on-med-and-down'>
              {this.navs()}
            </ul>
            <ul className='side-nav' id='mobile'>
              {this.navs()}
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

const styles = {
  adminTab: {
    background: "linear-gradient(#666, #333)",
    border: "1px solid #666",
		backgroundColor: "#999",
    margin: '5px',
    lineHeight: '42px',
    color: '#f2f7f7',
    borderBottom: '6px solid #999',
  },
  onTabText: {
    textShadow: "0 0 10px rgba(0,0,0,1)",
    fontSize: '18px',
    color: '#f2f7f7'
  },
  tabText: {
    textShadow: "0 0 10px rgba(0,0,0,0.75)",
    fontSize: '18px',
    color: '#f2f7f7'
  },
  onTab: {
    backgroundColor: '#5AA8D1'
  },
  tab: {
    backgroundColor: '#60b9e8'
  },

}

const mapStateToProps = (state) => {
	let { user } = state;
  return { user }
}

export default connect(mapStateToProps)(NavBar);
