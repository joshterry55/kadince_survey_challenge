import React from 'react'
import { connect } from 'react-redux'

class AnimalFormInfo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {submitted: false}
    this.state = {animalOptions: []}

    this.animalTypeOptions = this.animalTypeOptions.bind(this)
    this.submitAnimalForm = this.submitAnimalForm.bind(this)
    this.toggleSubmitted = this.toggleSubmitted.bind(this)
    this.animalOptions = this.animalOptions.bind(this)
    this.showOptions = this.showOptions.bind(this)
    this.showText = this.showText.bind(this)
    this.animalSelector = this.animalSelector.bind(this)
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

  animalSelector() {
    let choice = []
    this.state.animalOptions.map( animal => {
      if($(`#${animal.animal_name}`).is(':checked') === true) {
        choice.push(animal.animal_name)

      }
    })
    return(
      choice
    )
  }

  submitAnimalForm(e) {
    e.preventDefault()
    let email = this.refs.email.value
    let animalChoice = this.animalSelector()

    $.ajax({
      url: '/api/animal_surveys',
      type: 'POST',
      dataType: 'JSON',
      data: { animal_survey: {
        email: email,
        favorite_animal: animalChoice,
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

            <input type="checkbox" className="filled-in" name='group1' id={animal.animal_name} />
            <label htmlFor={animal.animal_name}>{animal.animal_name}</label>

          </div>
        )
      })
    } else {

    }
  }

  showText() {
    if(this.state.animalOptions.length) {
      return(
        <div>
          <p>Which Animals are your favorite</p>
          {this.showOptions()}
        </div>
      )
    } else {

    }
  }

  // <input name="group1" type="radio" id={animal.id}/>
  // <label htmlFor={animal.id}>{animal.animal_name}</label>

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
          <form onSubmit={this.submitAnimalForm}>
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
              {this.showText()}
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
