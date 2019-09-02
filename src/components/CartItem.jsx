import React from 'react';
import noImageIcon from '../images/lineitem.svg';
import iconTrash from '../images/icon-trash.svg';
import iconPlus from '../images/icon-plus.svg';
import iconMinus from '../images/icon-minus.svg';

class CartItem extends React.PureComponent {
  getItemData(id) {
    return this.props.items.find(item => (item.id === id));
  }
  
  render () {
    const { onRemoveClick, onCounIncClick, onCounDecClick } = this.props;
    const itemData = this.getItemData(this.props.id);
    const { count, items } = this.props;

    return(
      <div className='line-item'>
        <div className='img-wrapper'>
          { itemData.imageFile === '' && <div className='img-border no-image'><img src={noImageIcon} /></div> }
          { itemData.imageFile !== '' && <div className='img-border'><img src={`/${itemData.imageFile}.jpg`} /></div> }
        </div>
        <div className='desc-block'>
          <article className='item-title'>{itemData.title}</article>
          <article className='item-desc'>{itemData.description}</article>
          <select className='item-line' value={itemData.id}>
            { items.map(item => <option value={item.id}>{item.title}</option>) }
          </select>
        </div>
        <div className='ctl-block'>
          <div className='button-bar remove'>
            <a className='button-remove' onClick={onRemoveClick}><img src={iconTrash} /></a>
          </div>
          <div className='button-bar count'>
            <span className='item-price'>75.00 &euro;</span>
            <div className='count-ctl'>
              <a className='button btn-inc' onClick={onCounIncClick}><img src={iconPlus} /></a>
              <span className='label-count'>{count}</span>
              <a className='button btn-dec' onClick={onCounDecClick}><img src={iconMinus} /></a>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default CartItem;
