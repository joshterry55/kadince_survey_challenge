import React from 'react'
import { connect } from 'react-redux'

class ColorForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {submitted: false}

    this.colorOptions = this.colorOptions.bind(this)
    this.submitColorForm = this.submitColorForm.bind(this)
    this.colorSelector = this.colorSelector.bind(this)
    this.toggleSubmitted = this.toggleSubmitted.bind(this)
  }

  componentDidMount() {
    if(!this.props.colorcolor.id) {
      $.ajax({
        url: '/api/header_colors',
        type: 'GET',
        dataType: 'JSON'
      }).done( colors => {
        let color = colors[0]
        this.props.dispatch({type: 'COLOR_COLOR', color})
      }).fail( data => {
        debugger
      })
    }
  }

  componentDidUpdate() {
    if(!this.props.coloroptions.length) {
      $.ajax({
        url: '/api/color_options',
        type: 'GET',
        dataType: 'JSON'
      }).done( colors => {
        this.props.dispatch({type: 'COLOR_OPTIONS', colors})
      }).fail( data => {
        debugger
      })
    }
  }

  colorOptions() {
    if(this.props.coloroptions.length) {
      return this.props.coloroptions.map(function(color, i) {
        return(
          <div key={color.id} className='col s4' style={{marginLeft: '0px', paddingLeft: '0px'}}>
            <input name="group1" type="radio" id={color.id}/>
            <label htmlFor={color.id}>{color.color_name}</label>
          </div>
        )
      })
    }
  }

  submitColorForm(e) {
    e.preventDefault()
    let email = this.refs.email.value
    let colorChoice = this.colorSelector()
    let reason = this.refs.reason.value
    $.ajax({
      url: '/api/color_surveys',
      type: 'POST',
      dataType: 'JSON',
      data: { color_survey: {
        email: email,
        color: colorChoice,
        reason: reason
      }}
    }).done( data => {
      this.toggleSubmitted()
    }).fail( data => {
      debugger
    })
  }

  colorSelector() {
    let choice
    this.props.coloroptions.map( color => {
      if($(`#${color.id}`).is(':checked') === true) {
        choice = color.color_name
      }
    })
    return(
      choice
    )
  }

  toggleSubmitted() {
    this.setState({submitted: !this.state.submitted})
  }

  submitCheck() {
    if(this.state.submitted) {
      return(
        <div className='row' style={{margin: '0 auto', width: '600px'}}>
          <h4>Thank You!</h4>
          <span>We've sent out a receipt of the answers provided</span>
        </div>
      )
    } else {
      return(
        <div className='row' style={{margin: '0 auto', width: '600px'}}>
          <p style={{marginTop: '64px'}}>Please take a moment to share a few details about yourself.</p>
          <form onSubmit={this.submitColorForm}>
            <div>
              <input type='email' ref='email' />
              <label style={{marginTop: '0px'}}>Email</label>
            </div>
            <div style={{marginTop: '35px', padding: '0px', marginLeft: '0px'}} className='col s12'>
              <span className='col s12' style={{marginLeft: '0px', paddingLeft: '0px'}}>Pick your favorite color:</span>
              {this.colorOptions()}
            </div>
            <div className='col s12' style={{marginTop: '35px', padding: '0px', marginLeft: '0px'}}>
              <span style={{marginLeft: '0px', paddingLeft: '0px'}}>Tell us why you picked that color: </span>
              <input type='text' ref='reason' />
            </div>
            <div>
              <input type='submit' className='colorSubmit'/>
            </div>
            <div className='col s12'></div>
          </form>
        </div>
      )
    }
  }

  render() {
    let color = this.props.colorcolor.color
      return(
        <div>
          <div style={{width: '100%', height: '200px', backgroundColor: `${color}`}}>
            <div style={{margin: '0 auto', width: '600px', height: '200px', lineHeight: '200px', fontSize: '40px', fontFamily: 'Quicksand', color: 'white'}}>
              Color Survey
            </div>
          </div>
          {this.submitCheck()}
        </div>
      )
  }
}

const mapStateToProps = (state) => {
  let { user, colorcolor, coloroptions } = state
  return { user, colorcolor, coloroptions }
}

export default connect(mapStateToProps)(ColorForm)
