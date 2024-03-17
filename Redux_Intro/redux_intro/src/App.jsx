import { useState } from 'react'
import { legacy_createStore } from 'redux'
import './App.css'

function App() {

  const ADD_TO_CART = "ADD_TO_CART"

  const [reRender, setRerender] = useState([])
  const [cartItems, setCartItems] = useState("")

  const addToCart = () => {
    store.dispatch({ type: ADD_TO_CART, payload: { item: cartItems } })
    setCartItems("")
  }

  function cartReducer(state = [], { type, payload }) {
    switch (type) {
      case ADD_TO_CART:
        return [...state, payload.item];
      default:
        return state;
    }
  }

  const store = legacy_createStore(cartReducer , [])

  store.subscribe(() => {
    setRerender(store.getState());
  });

  return (
    <>
      <pre>
        {JSON.stringify(reRender)}
      </pre>

      <div className="main-container">
        <div className="item-container">
          <input type="text"
            value={cartItems}
            onChange={(e) => setCartItems(e.target.value)} />
          <button
            onClick={addToCart}>ADD TO CART</button>
        </div>
      </div>
    </>
  )
}

export default App