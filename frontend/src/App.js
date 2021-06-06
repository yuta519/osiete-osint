import React, { useState} from 'react'

const App = ()  => {
  const [count, setCount] = useState(0)
  const increment = () => setCount(count+1)
  const decrement = () => setCount(count-1)
  const increment2 = () => setCount(previousCount => previousCount+1)
  const decrement2 = () => setCount(previousCount => previousCount-1)
  const reset = () => setCount(currentCount => currentCount=0)
  const waru = () => setCount(currentCount => 
    currentCount%3===0 ? currentCount/3: currentCount)

  return (
    <>
      <div>count: {count}</div>
      <div>
        <button onClick={increment}>+1</button>
        <button onClick={decrement}>-1</button>
      </div>
      <div>
        <button onClick={increment2}>+1</button>
        <button onClick={decrement2}>-1</button>
      </div>
      <div>
        <button onClick={reset}>Reset</button>
      </div>
      <div>
        <button onClick={waru}>3の倍数だけ3で割る</button>
      </div>
    </>
  )
}

export default App
