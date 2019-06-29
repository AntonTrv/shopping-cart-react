import React, {Component} from 'react';
import './scss/app.scss';
import Products from './components/products';
import Cart from "./components/cart";
import Header from "./components/header";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            products:[],//fetched data
            inCart: []//items in cart
        }
    }
    //fetch data and put into state
    componentDidMount() {
        fetch('http://localhost:3001/products')
            .then(response => response.json())
            .then(data => this.setState({products: data}))
    }
    //receives a product, adds it to the cart if not presented, otherwise increases count value in presented obj
    handleAddToCart = (product) => {
        this.setState(state => {
            const inCart = state.inCart;
            let alreadyInCart = false;

            inCart.forEach(el => {
                if(el.id === product.id){
                    alreadyInCart = true;
                    if(el.count<product.amount && el.count < product.maxPerPerson){
                        el.count += 1;
                    }else{
                        alert("You've reached the amount limit!")
                    }
                }
            })
            if(!alreadyInCart){
                inCart.push({...product, count: 1})//assingment of the count value
            }


            return {inCart : inCart}
        })

    }
    //receives an element, returns filtered array without element
    handleRemove = (element) => {
        this.setState(state => { const inCart = state.inCart.filter(product => product.id !== element.id)
            return {inCart: inCart}
        })

    }



    //Reduces totalPriceInCart and totalItemsInCart in components/cart.jsx
    reduceArray = (arr) => {
        const result = arr.length ? arr.reduce((prev,cur) => prev+cur) : null
        return result
    }


    render() {
        const {inCart, products} = this.state;

      return(
          <div className='App'>

              <Header/>

              <Products products={products} handleAddToCart={this.handleAddToCart}/>
              <Cart inCart={inCart} handleRemove={this.handleRemove} reduceArray={this.reduceArray} />

          </div>
          )

  }
}

export default App;

//to start json-server: json-server public/db.json --port 3001
