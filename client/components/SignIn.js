import React from 'react';
import { connect } from 'react-redux'
import { login } from '../actions/auth'

class SignIn extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    let { email, password } = this.refs
    let admin = { admin: {
      email: email.value,
      password: password.value
    }}

    $.ajax({
      url: '/admins/sign_in',
      type: 'POST',
      dataType: 'JSON',
      data: admin
    }).done( user => {
      this.props.dispatch(login(user));
      this.props.history.push('/admin')
    }).fail( err => {
      debugger
    })
  }

  render() {
    return(
      <div className='row container'>
        <div className='col s12' style={{paddingTop: '65px'}}>

          <div className='col s12 m6 offset-m3 l4 offset-l4' style={{backgroundColor: 'rgba(200,200,200,0.65)', padding: '20px', borderRadius: '5px'}}>
            <form className='col s12' onSubmit={this.handleSubmit}>
              <label style={{color: 'black'}}>Email</label>
              <input type="email" style={{color: 'black', backgroundColor: '#f2f7f7', borderRadius: '2px'}} required={true} ref='email' placeholder='email' />
              <label style={{color: 'black'}}>Password</label>
              <input type='password' style={{color: 'black', backgroundColor: '#f2f7f7', borderRadius: '2px'}} required={true} ref='password' placeholder='password' />
              <button className='btn' style={{backgroundColor: '#60b9e8'}}>Sign In</button>
            </form>
          </div>
        </div>
      </div>
    )
  }

}

export default connect()(SignIn)
