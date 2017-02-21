import React from 'react'
import {connect } from 'react-redux'

class AnimalTypes  extends React.Component {
  constructor(props) {
    super(props)

    this.state = { edit: false }
    this.state = { add: false }

    this.animalTypesList = this.animalTypesList.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
    this.toggleAdd = this.toggleAdd.bind(this)
    this.addDisplay = this.addDisplay.bind(this)
    this.createAnimalType = this.createAnimalType.bind(this)
    this.editType = this.editType.bind(this)
  }

  componentDidMount() {
    if(!this.props.animaltypes.length) {
      $.ajax({
        url: '/api/animal_types',
        type: 'GET',
        dataType: 'JSON'
      }).done( animals => {
        this.props.dispatch({type: 'ANIMAL_TYPES', animals})
      }).fail( data => {
        debugger
      })
    }
  }

  toggleEdit() {
    this.setState({edit: !this.state.edit})
  }

  toggleAdd() {
    this.setState({add: !this.state.add})
  }

  animalTypesList() {
    let currentType = this.props.currenttype
    if(this.props.animaltypes.length) {
      return this.props.animaltypes.map( animal => {
        if(this.state.edit) {
          if(currentType.id === animal.id) {
            return(
              <div key={animal.id}>
                <form className='col s12 m4 offset-m4' ref='editTypeForm' onSubmit={(e) => this.editType(e, animal.id)}>
                  <input ref='newType' defaultValue={animal.animal_type} style={{marginBottom: '10px'}}  />
                  <br />
                  <input type='submit' />
                </form>
                <div className='col s12'><span style={{cursor: 'pointer'}} onClick={this.toggleEdit}>Cancel</span></div>

              </div>
            )
          } else {
            return(
              <div key={animal.id} className='col s12'>
                <span style={{fontSize: '20px'}}>{animal.animal_type}</span><i><span style={{paddingLeft: '10px', fontStyle: 'italics'}} onClick={() => this.setType(animal)} style={{cursor: 'pointer'}}> Edit</span></i>
              </div>
            )
          }
        } else {
          return(
            <div key={animal.id}>
              <span style={{fontSize: '20px'}}>{animal.animal_type}</span><i><span onClick={() => this.setType(animal)} style={{cursor: 'pointer'}}> Edit</span><span onClick={() => this.deleteType(animal)} style={{cursor: 'pointer'}}> Delete</span></i>
            </div>
          );
        }
      });
    }
  }

  setType(animal) {
    this.props.dispatch({type: 'CURRENT_TYPE', animal})
    this.toggleEdit()
  }

  deleteType(animal) {
    let id = animal.id
    let confirmed = confirm("Are you sure you want to delete this Animal Type?")
    if(confirmed) {
      $.ajax({
        type: "DELETE",
        url: `/api/animal_types/${id}`,
        dataType: 'JSON'
      }).success( animal => {
        this.props.dispatch({type: 'REMOVE_ANIMAL_TYPE', animal})
      }).fail( data => {
        console.log('failed')
      })
    }
  }

  editType(e, id) {
    e.preventDefault()
    let type = this.refs.newType.value
    $.ajax({
      url: `/api/animal_types/${id}`,
      type: 'PUT',
      dataType: 'JSON',
      data: { animal_type: {
        animal_type: type
      }}
    }).done( animal => {
      this.props.dispatch({type: 'UPDATE_ANIMAL_TYPE', animal})
      this.refs.editTypeForm.reset()
      this.toggleEdit()
    }).fail( data => {
      debugger
    })
  }

  createAnimalType(e) {
    e.preventDefault()
    let type = this.refs.animalType.value
    $.ajax({
      url: '/api/animal_types',
      type: 'POST',
      dataType: 'JSON',
      data: { animal_type: {
        animal_type: type,
      }}
    }).done( animal => {
      this.props.dispatch({type: 'ADD_ANIMAL_TYPE', animal})
      this.refs.typeForm.reset()
      this.toggleAdd()
    }).fail( data => {
      debugger
    })
  }

  addDisplay() {
    if(this.state.add) {
      return(
        <div className='col s12'>
          <div className='col s12 m4 offset-m4'>
            <form ref='typeForm' onSubmit={this.createAnimalType}>
              <div className='col s10 '>
                <input ref='animalType' placeholder='New Animal Type' autoFocus required />
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
          <span onClick={this.toggleAdd} className='add-sale' style={{cursor: 'pointer', color: 'black'}}>+ Add Animal Type</span>
        </div>
      )
    }
  }


  render() {
    return(
      <div className='center col s12'>
        <span>Animal Types:</span>
        {this.addDisplay()}
        {this.animalTypesList()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { user, animaltypes, currenttype } = state
  return { user, animaltypes, currenttype }
}

export default connect(mapStateToProps)(AnimalTypes)
