import React from 'react'
import AnimalTypes from './AnimalTypes'
import AnimalOptions from './AnimalOptions'
import AnimalColor from './AnimalColor'

class AnimalSettings extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <AnimalColor />
        <AnimalTypes />
        <AnimalOptions />
      </div>
    )
  }
}

export default AnimalSettings
