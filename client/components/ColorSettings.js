import React from 'react'
import ColorColor from './ColorColor'
import ColorOptions from './ColorOptions'

class ColorSettings extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <ColorColor />
        <ColorOptions />
      </div>
    )
  }
}

export default ColorSettings
