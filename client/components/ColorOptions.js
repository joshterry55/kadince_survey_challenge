import React from 'react'
import { connect } from 'react-redux'

class ColorOptions  extends React.Component {
  constructor(props) {
    super(props)

    this.state = { edit: false }
    this.state = { add: false }

    this.colorOptionsList = this.colorOptionsList.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
    this.toggleAdd = this.toggleAdd.bind(this)
    this.addDisplay = this.addDisplay.bind(this)
    this.createColorOption = this.createColorOption.bind(this)
    // this.editType = this.editType.bind(this)
  }

  componentDidMount() {
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

  componentDidUpdate() {
    $('select').material_select();
  }

  toggleEdit() {
    this.setState({edit: !this.state.edit})
  }

  toggleAdd() {
    this.setState({add: !this.state.add})
  }

  colorOptionsList() {
    if(this.props.coloroptions.length) {
      return this.props.coloroptions.map( color => {
        if(this.state.edit) {
          let currentColorOption = this.props.currentcoloroption
          if(currentColorOption.id === color.id) {
            return(
              <div key={color.id}>
                <form className='col s12 m4 offset-m4' ref='editOptionForm' onSubmit={(e) => this.editOption(e, color.id)}>
                  <input ref='newOption' defaultValue={color.color_name} style={{marginBottom: '10px'}}  />
                  <br />
                  <input type='submit' />
                </form>
                <div className='col s12'><span style={{cursor: 'pointer'}} onClick={this.toggleEdit}>Cancel</span></div>

              </div>
            )
          } else {
            return(
              <div key={color.id} className='col s12'>
                <span style={{fontSize: '20px'}}>{color.color_name}</span><i><span style={{paddingLeft: '10px', fontStyle: 'italics'}} onClick={() => this.setOption(color)} style={{cursor: 'pointer'}}> Edit</span></i>
              </div>
            )
          }
        } else {
          return(
            <div key={color.id}>
              <span style={{fontSize: '20px'}}>{color.color_name}</span><i><span onClick={() => this.setOption(color)} style={{cursor: 'pointer'}}> Edit</span><span onClick={() => this.deleteOption(color)} style={{cursor: 'pointer'}}> Delete</span></i>
            </div>
          );
        }
      });
    }
  }

  setOption(color) {
    this.props.dispatch({type: 'CURRENT_COLOR_OPTION', color})
    this.toggleEdit()
  }

  deleteOption(color) {
    let id = color.id
    let confirmed = confirm("Are you sure you want to delete this Color?")
    if(confirmed) {
      $.ajax({
        type: "DELETE",
        url: `/api/color_options/${id}`,
        dataType: 'JSON'
      }).success( color => {
        this.props.dispatch({type: 'REMOVE_COLOR_OPTION', color})
      }).fail( data => {
        console.log('failed')
      })
    }
  }

  editOption(e, id) {
    e.preventDefault()
    let option = this.refs.newOption.value
    $.ajax({
      url: `/api/color_options/${id}`,
      type: 'PUT',
      dataType: 'JSON',
      data: { color_option: {
        color_name: option,
      }}
    }).done( color => {
      this.props.dispatch({type: 'UPDATE_COLOR_OPTION', color})
      this.refs.editOptionForm.reset()
      this.toggleEdit()
    }).fail( data => {
      debugger
    })
  }

  createColorOption(e) {
    e.preventDefault()
    let name = this.refs.colorOption.value
    $.ajax({
      url: '/api/color_options',
      type: 'POST',
      dataType: 'JSON',
      data: { color_option: {
        color_name: name,
      }}
    }).done( color => {
      this.props.dispatch({type: 'ADD_COLOR_OPTION', color})
      this.refs.optionForm.reset()
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
            <form ref='optionForm' onSubmit={this.createColorOption}>

              <div className='col s10 '>
                <input ref='colorOption' placeholder='New Color Option' autoFocus required />
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
          <span onClick={this.toggleAdd} className='add-sale' style={{cursor: 'pointer', color: 'black'}}>+ Add Color</span>
        </div>
      )
    }
  }


  render() {
    return(
      <div className='center col s12'>
        <span>Color Options:</span>
        {this.addDisplay()}
        {this.colorOptionsList()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { user, coloroptions, currentcoloroption } = state
  return { user, coloroptions, currentcoloroption }
}

export default connect(mapStateToProps)(ColorOptions)
