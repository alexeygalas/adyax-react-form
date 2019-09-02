import React from 'react';
import CartItem from './components/CartItem';
import iconPlus from './images/icon-plus.svg';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = { totalCost: 0 };
    this._apiUrl = 'http://5d6774fe6847d40014f65fec.mockapi.io/api';
  }

  componentDidMount () {
    fetch(`${this._apiUrl}/items`)
      .then(resp => resp.json())
      .then(resp => this.setState({ items: resp }) );
  }

  shouldComponentUpdate (props, state) {
    const { items, cart } = state;

    if ((items !== undefined) && (items.length > 0) && (cart === undefined)) {
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

  onCounIncClick (index) {
    console.log(`#${index} count increased`);
  }

  onCounDecClick (index) {
    console.log(`#${index} count raised`);
  }

  updateTotalCost (value) {

  }

  addCartLine () {
    let { cart, items } = this.state;
    cart.push({id: items[0].id, count: items[0].minCount });
    this.setState({ cart });
  }

  onSkuChange(index, id) {
    console.log(`Item #${index} has been changed to ${id}`);
  }

  calculateTotal() {
    const { items, cart } = this.state;
    let totalCost = 0.00;
    
  }

  render () {
    const { cart, items, totalCost } = this.state;
    
    return (
      <div>
        <div className='lines'>
          { 
            ((cart === undefined) || (!Array.isArray(cart)) || (cart.length < 1)) 
            && <p>Cart is empty</p>
          }
          {
            ((cart !== undefined) && (Array.isArray(cart)) && (cart.length > 0)) &&
            cart.map((line, key) => 
              <CartItem
                key={key}
                items={items}
                id={line.id}
                count={line.count}
                onRemoveClick={() => { this.onRemoveClick(key) }}
                onCounIncClick={() => { this.onCounIncClick(key) }}
                onCounDecClick={() => {this.onCounDecClick(key) }}
              />
            )
          }
        </div>
        <div id='total-price'>
          <a className='add-line' onClick={this.addCartLine.bind(this)}>
            <img src={iconPlus} />
            <span>Add line</span>
          </a>
          <span>{totalCost} &euro;</span>
        </div>
      </div>
    );
  }
}

export default App;
