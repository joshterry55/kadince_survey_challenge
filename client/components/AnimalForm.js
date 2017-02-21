import React from 'react'
import { connect } from 'react-redux'
import AnimalFormInfo from './AnimalFormInfo'

class AnimalForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {submitted: false}

  }

  componentDidMount() {
      $.ajax({
        url: '/api/animal_header_colors',
        type: 'GET',
        dataType: 'JSON'
      }).done( colors => {
        let color = colors[0]
        this.props.dispatch({type: 'CURRENT_ANIMAL_COLOR', color})
      }).fail( data => {
        debugger
      })

  }

  render() {
    let color = this.props.currentanimalcolor.color
      return(
        <div>
          <div style={{width: '100%', height: '200px', backgroundColor: `${color}`}}>
            <div style={{margin: '0 auto', width: '600px', height: '200px', lineHeight: '200px', fontSize: '40px', fontFamily: 'Quicksand', color: '#222'}}>
              Animal Survey
            </div>
          </div>
          <AnimalFormInfo />
        </div>
      )
  }
}

const mapStateToProps = (state) => {
  let { user, colorcolor, coloroptions, currentanimalcolor } = state
  return { user, colorcolor, coloroptions, currentanimalcolor }
}

export default connect(mapStateToProps)(AnimalForm)
