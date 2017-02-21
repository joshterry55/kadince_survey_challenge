import React from 'react'
import { connect } from 'react-redux'

class AnimalFormInfo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {submitted: false}
    this.state = {animalOptions: []}

    this.animalTypeOptions = this.animalTypeOptions.bind(this)
    this.submitColorForm = this.submitColorForm.bind(this)
    this.toggleSubmitted = this.toggleSubmitted.bind(this)
    this.animalOptions = this.animalOptions.bind(this)
    this.showOptions = this.showOptions.bind(this)
  }

  componentDidMount() {
      $.ajax({
        url: '/api/animal_types',
        type: 'GET',
        dataType: 'JSON'
      }).done( animals => {
        this.props.dispatch({type: 'ANIMAL_FORM_TYPES', animals})
      }).fail( data => {
      })
      $.ajax({
        url: '/api/animal_options',
        type: 'GET',
        dataType: 'JSON'
      }).done( animals => {
        this.props.dispatch({type: 'ANIMAL_FORM_OPTIONS', animals})
      }).fail( data => {
      })
  }

  componentDidUpdate() {

      // $.ajax({
      //   url: '/api/animal_options',
      //   type: 'GET',
      //   dataType: 'JSON'
      // }).done( animals => {
      //   this.props.dispatch({type: 'ANIMAL_FORM_OPTIONS', animals})
      // }).fail( data => {
      // })
      $('select').material_select();

  }

  animalTypeOptions() {
    if(this.props.animalformtypes.length) {
      return this.props.animalformtypes.map(function(animal, i) {
        return(
          <option key={animal.id} value={animal.id} id={animal.id}>{animal.animal_type}</option>
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
    })
  }

  animalOptions() {
    if(this.props.animalformtypes.length && this.props.animalformoptions.length) {
      let filteredOptions = []
      let choice
      this.props.animalformtypes.map( animal => {
        if($(`#${animal.id}`).is(':selected') === true) {
          choice = animal.id
        }
      })
      this.props.animalformoptions.map( option => {
        if(option.animal_type_id === choice ) {
          filteredOptions.push(option)
        }
      })

      this.setState({animalOptions: filteredOptions})
    }
  }

  toggleSubmitted() {
    this.setState({submitted: !this.state.submitted})
  }

  showOptions() {
    if(this.state.animalOptions.length) {
      return this.state.animalOptions.map(function(animal, i) {
        return(
          <div key={animal.id} className='col s4' style={{marginLeft: '0px', paddingLeft: '0px'}}>
            <input name="group1" type="radio" id={animal.id}/>
            <label htmlFor={animal.id}>{animal.animal_name}</label>
          </div>
        )
      })
    } else {

    }
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
        <div className='row' style={{margin: '0 auto', width: '600px', paddingTop: '40px'}}>
          <form onSubmit={this.submitColorForm}>
            <div>
              <input type='email' ref='email' />
              <label style={{marginTop: '0px'}}>Email</label>
            </div>
            <div style={{marginTop: '35px', padding: '0px', marginLeft: '0px'}} className='col s12'>
              <select className='browser-default' onChange={this.animalOptions}>
                <option value="" disabled selected>Choose your option</option>
                {this.animalTypeOptions()}
              </select>
            </div>
            <div className='col s12' style={{marginTop: '35px', padding: '0px', marginLeft: '0px'}}>
              {this.showOptions()}
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
      return(
        <div>
          {this.submitCheck()}
        </div>
      )
  }
}

const mapStateToProps = (state) => {
  let { user, colorcolor, coloroptions, currentanimalcolor, animalformtypes, animalformoptions } = state
  return { user, colorcolor, coloroptions, currentanimalcolor, animalformtypes, animalformoptions }
}

export default connect(mapStateToProps)(AnimalFormInfo)
