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

    if ((items) && (items.length > 0) && (typeof cart === 'undefined')) {
      this.setState({
        cart: [
          {id: items[0].id, count: items[0].minCount },
          {id: items[1].id, count: items[1].minCount },
          {id: items[2].id, count: items[2].minCount }
        ]
      });
      return true;
    }

    return Array.isArray(cart);
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

  rednerCart () {
    const { items, cart } = this.state;
    
    if ((typeof cart === 'undefined') || (!Array.isArray(cart)) || (cart.length < 1)) {
      return 'Cart is empty';
    }

    return cart.map((line, key) => {
      return <CartItem
        key={key}
        items={items}
        cartNum={key}
        id={line.id}
        count={line.count}
        onRemoveClick={() => { this.onRemoveClick }}
        onCounIncClick={() => { this.onCountChange(key, 'up') }}
        onCounDecClick={() => {this.onCountChange(key, 'down') }}
        onCartChangeItem={this.onSkuChange.bind(this)}
      />;
    })
  }

  rednerTotal () {
    const { items, cart } = this.state;
    const totalCost = this.calculateTotal(items, cart);

    return (
      <>
        <a className='add-line' onClick={this.addCartLine.bind(this)}>
          <img src={iconPlus} />
          <span>Add line</span>
        </a>
        <span>{asDecimal(totalCost)} &euro;</span>
      </>
    );
  }

  render () {
    const { items } = this.state;
    
    if (!items) {
      return 'Loading';
    }
    
    const cartContent = this.rednerCart();
    const totalContent = this.rednerTotal();
    
    return (
      <>
        <div className='lines'>{cartContent}</div>
        <div id='total-price'>{totalContent}</div>
      </>
    );
  }
}

export function getItemData (dataSet, itemId) {
  return dataSet.find(item => (item.id === itemId));
}

export function asDecimal (expr) {
  return parseFloat(Math.round(expr * 100) / 100).toFixed(2);
}

export default App;
