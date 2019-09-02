"use strict";

import React from 'react';
import './style.scss';
import CartItem from './components/CartItem';
import iconPlus from './assets/images/icon-plus.svg';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
    this._apiUrl = 'http://5d6774fe6847d40014f65fec.mockapi.io/api';
  }

  componentDidMount () {
    fetch(`${this._apiUrl}/items`)
      .then(resp => resp.json())
      .then(resp => this.setState({ items: resp }) )
      .catch(error => this.setState({ items: false }) );
  }

  shouldComponentUpdate (props, state) {
    const { items, cart } = state;

    if ((items) && (items.length > 0) && (cart === undefined)) {
      this.setState({
        cart: [
          {id: items[0].id, count: items[0].minCount },
          {id: items[1].id, count: items[1].minCount },
          {id: items[2].id, count: items[2].minCount }
        ]
      });
      return true;
    }

    if (Array.isArray(cart)) {
      return true;
    }

    return false;
  }

  onRemoveClick (index) {
    const cart = this.state.cart.filter((item, i) => (i !== index));
    this.setState({ cart });
  }

  onCountChange (index, direction) {
    let { cart } = this.state;
    if (direction === 'up') cart[index].count++;
    if (direction === 'down') cart[index].count--;
    this.setState({ cart }); 
  }

  addCartLine () {
    let { cart, items } = this.state;
    cart.push({id: items[0].id, count: items[0].minCount });
    this.setState({ cart });
  }

  onSkuChange(index, id) {
    let { cart, items } = this.state;
    cart[index].id = id;
    cart[index].count = getItemData(items, id).minCount;
    this.setState({ cart });
  }

  calculateTotal(items, cart) {
    let totalCost = 0.00;
    if ((cart !== undefined) && (Array.isArray(cart)) && (cart.length > 0)) {
      cart.forEach((lineItem) => {
        const curCost = getItemData(items, lineItem.id).cost;
        totalCost += (lineItem.count * curCost);
      });
    }
    
    return totalCost;
  }

  render () {
    const { items, cart } = this.state;
    const totalCost = this.calculateTotal(items, cart);
    
    return (
      <div>
        <div className='lines'>
          { 
            ((cart === undefined) || (!Array.isArray(cart)) || (cart.length < 1)) 
            && <p>Cart is empty</p>
          }
          { (!items) && <p>ERROR: Unable to get data from API!</p> }
          {
            ((cart !== undefined) && (Array.isArray(cart)) && (cart.length > 0)) &&
            cart.map((line, key) => 
              <CartItem
                key={key}
                items={items}
                cartNum={key}
                id={line.id}
                count={line.count}
                onRemoveClick={() => { this.onRemoveClick(key) }}
                onCounIncClick={() => { this.onCountChange(key, 'up') }}
                onCounDecClick={() => {this.onCountChange(key, 'down') }}
                onCartChangeItem={this.onSkuChange.bind(this)}
              />
            )
          }
        </div>
        {
          (items) && 
          <div id='total-price'>
            <a className='add-line' onClick={this.addCartLine.bind(this)}>
              <img src={iconPlus} />
              <span>Add line</span>
            </a>
            <span>{totalCost} &euro;</span>
          </div>
        }
      </div>
    );
  }
}

export function getItemData (dataSet, itemId) {
  return dataSet.find(item => (item.id === itemId));
}

export default App;
