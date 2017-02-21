import React from 'react'
import {connect } from 'react-redux'

class ColorColor  extends React.Component {
  constructor(props) {
    super(props)

    this.state = { edit: false }

    this.currentColor = this.currentColor.bind(this)
    this.changeColor = this.changeColor.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
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

  toggleEdit() {
    this.setState({edit: !this.state.edit})
  }

  changeColor(e, id) {
    e.preventDefault()
    let color = this.refs.newColor.value
    $.ajax({
      url: `/api/header_colors/${id}`,
      type: 'PUT',
      dataType: 'JSON',
      data: { header_color: { color: color }}
    }).done( color => {
      this.toggleEdit()
      this.props.dispatch({type: 'COLOR_COLOR', color})
    }).fail( data => {
      debugger
    })
  }

  currentColor() {
    let color = 'black'
    if(this.props.colorcolor.id) {
      color = this.props.colorcolor.color
    }
    if(this.state.edit) {
      let id = this.props.colorcolor.id
      let colorColor = this.props.colorcolor.color
      return(
        <div>
          <form onSubmit={(e) => this.changeColor(e, id)}>
            <input ref='newColor' style={{marginBottom: '10px'}} defaultValue={colorColor} type='color' />
            <br />
            <input type='submit' />
          </form>
          <div><span style={{cursor: 'pointer'}} onClick={this.toggleEdit}>Cancel</span></div>
        </div>
      )
    } else {
      return(
        <div className='center'>
          <p>Current Heading Color:</p>
          <div style={{height: '50px', width: '50px', backgroundColor: `${color}`, margin: '0 auto'}}></div>
          <div>
            <span onClick={this.toggleEdit} style={{cursor: 'pointer'}}>Edit</span>
          </div>
        </div>
      )
    }
  }


  render() {
    return(
      <div>
        {this.currentColor()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { user, colorcolor } = state
  return { user, colorcolor }
}

export default connect(mapStateToProps)(ColorColor)
