import React, { useState} from 'react'

const App = props  => {
  const [name, setName] = useState(props.name)
  const [price, setPrice] = useState(props.price)
  return (
    <>
      <p>現在の{name}は、{price}です</p>
    </>
  )
}

App.defaultProps = {
  name: '',
  price: 1000
}


export default App
