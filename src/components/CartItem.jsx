import React from 'react';
import '../style.scss';
import { getItemData, asDecimal } from '../App';
import noImageIcon from '../assets/images/lineitem.svg';
import iconTrash from '../assets/images/icon-trash.svg';
import iconPlus from '../assets/images/icon-plus.svg';
import iconMinus from '../assets/images/icon-minus.svg';

class CartItem extends React.PureComponent {
  onSkuChange (event) {
    this.props.onCartChangeItem(this.props.cartNum, Number.parseInt(event.target.value));
  }

  renderImage (imageFile) {
    if (imageFile === '') {
      return <div className='img-border no-image'><img src={noImageIcon} /></div>;
    } else {
      return <div className='img-border'><img src={`assets/images/${imageFile}.jpg`} /></div>;
    }
  }

  renderControls (itemData) {
    const { onCounIncClick, onCounDecClick, count } = this.props;
    return (
      <>
        { (count === itemData.maxCount) && <span className='button btn-inc'><img src={iconPlus} /></span> }
        { 
          (count < itemData.maxCount) &&
          <a className='button btn-inc' onClick={onCounIncClick}><img src={iconPlus} /></a>
        }
        <span className='label-count'>{count}</span>
        { (count === itemData.minCount) && <span className='button btn-dec'><img src={iconMinus} /></span> }
        {
          (count > itemData.minCount) &&
          <a className='button btn-dec' onClick={onCounDecClick}><img src={iconMinus} /></a>
        }
      </>
    );
  }

  render () {
    const { onRemoveClick, count, items, id } = this.props;
    const itemData = getItemData(items, id);
    const cost = (count * itemData.cost);

    const imageBlock = this.renderImage(itemData.imageFile);
    const controlsBlock = this.renderControls(itemData);

    return(
      <div className='line-item'>
        <div className='img-wrapper'>{imageBlock}</div>
        <div className='desc-block'>
          <article className='item-title'>{itemData.title}</article>
          <article className='item-desc'>{itemData.description}</article>
          <select className='item-line' value={itemData.id} onChange={this.onSkuChange.bind(this)}>
            { items.map(item => <option key={item.id} value={item.id}>{item.title}</option>) }
          </select>
        </div>
        <div className='ctl-block'>
          <div className='button-bar remove'>
            <a className='button-remove' onClick={onRemoveClick}><img src={iconTrash} /></a>
          </div>
          <div className='button-bar count'>
            <span className='item-price'>{asDecimal(cost)} &euro;</span>
            <div className='count-ctl'>{controlsBlock}</div>
          </div>
        </div>
      </div>
    );
  };
}

export default CartItem;
