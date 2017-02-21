import React from 'react'
import { connect } from 'react-redux'

class AnimalOptions  extends React.Component {
  constructor(props) {
    super(props)

    this.state = { edit: false }
    this.state = { add: false }

    this.animalOptionsList = this.animalOptionsList.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
    this.toggleAdd = this.toggleAdd.bind(this)
    this.addDisplay = this.addDisplay.bind(this)
    this.createAnimalOption = this.createAnimalOption.bind(this)
    // this.editType = this.editType.bind(this)
    this.animalTypeOptions = this.animalTypeOptions.bind(this)
  }

  componentDidMount() {
    if(!this.props.animaloptions.length) {
      $.ajax({
        url: '/api/animal_options',
        type: 'GET',
        dataType: 'JSON'
      }).done( animals => {
        this.props.dispatch({type: 'ANIMAL_OPTIONS', animals})
      }).fail( data => {
        debugger
      })
    }
  }

  componentDidUpdate() {
    $('select').material_select();
  }

  toggleEdit() {
    this.setState({edit: !this.state.edit})
  }

  toggleAdd() {
    this.setState({add: !this.state.add})
  }

  animalOptionsList() {
    if(this.props.animaloptions.length) {
      return this.props.animaloptions.map( animal => {
        if(this.state.edit) {
          let currentOption = this.props.currentoption
          if(currentOption.id === animal.id) {
            return(
              <div key={animal.id}>
                <form className='col s12 m4 offset-m4' ref='editOptionForm' onSubmit={(e) => this.editOption(e, animal.id)}>
                  <div className='col s12'>
                    <select ref='animalOption'>
                      { this.animalTypeOptions() }
                    </select>
                  </div>
                  <input ref='newOption' defaultValue={animal.animal_name} style={{marginBottom: '10px'}}  />
                  <br />
                  <input type='submit' />
                </form>
                <div className='col s12'><span style={{cursor: 'pointer'}} onClick={this.toggleEdit}>Cancel</span></div>

              </div>
            )
          } else {
            return(
              <div key={animal.id} className='col s12'>
                <span style={{fontSize: '20px'}}>{animal.animal_name}</span><i><span style={{paddingLeft: '10px', fontStyle: 'italics'}} onClick={() => this.setOption(animal)} style={{cursor: 'pointer'}}> Edit</span></i>
              </div>
            )
          }
        } else {
          return(
            <div key={animal.id}>
              <span style={{fontSize: '20px'}}>{animal.animal_name}</span><i><span onClick={() => this.setOption(animal)} style={{cursor: 'pointer'}}> Edit</span><span onClick={() => this.deleteOption(animal)} style={{cursor: 'pointer'}}> Delete</span></i>
            </div>
          );
        }
      });
    }
  }

  setOption(animal) {
    this.props.dispatch({type: 'CURRENT_OPTION', animal})
    this.toggleEdit()
  }

  deleteOption(animal) {
    let id = animal.id
    let confirmed = confirm("Are you sure you want to delete this Animal Type?")
    if(confirmed) {
      $.ajax({
        type: "DELETE",
        url: `/api/animal_options/${id}`,
        dataType: 'JSON'
      }).success( animal => {
        this.props.dispatch({type: 'REMOVE_ANIMAL_OPTION', animal})
      }).fail( data => {
        console.log('failed')
      })
    }
  }

  editOption(e, id) {
    e.preventDefault()
    let option = this.refs.newOption.value
    let animalTypeId = this.refs.animalOption.value
    $.ajax({
      url: `/api/animal_options/${id}`,
      type: 'PUT',
      dataType: 'JSON',
      data: { animal_option: {
        animal_name: option,
        animal_type_id: animalTypeId
      }}
    }).done( animal => {
      this.props.dispatch({type: 'UPDATE_ANIMAL_OPTION', animal})
      this.refs.editOptionForm.reset()
      this.toggleEdit()
    }).fail( data => {
      debugger
    })
  }

  createAnimalOption(e) {
    e.preventDefault()
    let name = this.refs.animalOption.value
    let id = this.refs.animalType.value
    $.ajax({
      url: '/api/animal_options',
      type: 'POST',
      dataType: 'JSON',
      data: { animal_option: {
        animal_name: name,
        animal_type_id: id
      }}
    }).done( animal => {
      this.props.dispatch({type: 'ADD_ANIMAL_OPTION', animal})
      this.refs.optionForm.reset()
      this.toggleAdd()
    }).fail( data => {
      debugger
    })
  }

  animalTypeOptions() {
    return this.props.animaltypes.map( animal => {
      return(<option key={animal.id} value={animal.id}>{animal.animal_type}</option>);
    });
  }

  addDisplay() {
    if(this.state.add) {
      return(
        <div className='col s12'>
          <div className='col s12 m4 offset-m4'>
            <form ref='optionForm' onSubmit={this.createAnimalOption}>
              <div className='col s12'>
                <select ref='animalType'>
                  { this.animalTypeOptions() }
                </select>
              </div>
              <div className='col s10 '>
                <input ref='animalOption' placeholder='New Animal Option' autoFocus required />
              </div>
              <div className='col s2'>
                <input className='btn' style={{backgroundColor: '#444'}} type='submit' value='Add' />
              </div>
            </form>
            <div className='center col s12' style={{marginBottom: '10px'}}>
              <span onClick={this.toggleAdd} className='cancel' style={{cursor: 'pointer', color: '#ccc', padding: '5px 10px', borderRadius: '3px'}}>Cancel</span>
            </div>
          </div>
        </div>
      )
    } else {
      return(
        <div className="center">
          <span onClick={this.toggleAdd} className='add-sale' style={{cursor: 'pointer', color: 'black'}}>+ Add Animal Option</span>
        </div>
      )
    }
  }


  render() {
    return(
      <div className='center col s12'>
        <span>Animal Options:</span>
        {this.addDisplay()}
        {this.animalOptionsList()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { user, animaltypes, animaloptions, currentoption } = state
  return { user, animaltypes, animaloptions, currentoption }
}

export default connect(mapStateToProps)(AnimalOptions)
