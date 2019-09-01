import React from 'react';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (<div>
      <div className='lines'>
        <div className='line-item'>
          <div className='img-wrapper'>
            <div className='img-border no-image'>
              <img src='/lineitem.svg' />
            </div>
          </div>
          <div className='desc-block'>
            <article className='item-title'>Title Lorem ipsum dolor sit</article>
            <article className='item-desc'>Lorem ipsum dolor sit amet, quis dictum mauris erat aliquam, ac in pede pharetra quis non et.</article>
            <select className='item-line'>
              <option value='0'>Canon EOS 5D</option>
              <option value='1'>Canon EOS 6D</option>
              <option value='2'>Canon EOS 7D</option>
            </select>
          </div>
          <div className='ctl-block'>
            <div className='button-bar remove'>
              <a className='button-remove'><img src='/icon-trash.svg' /></a>
            </div>
            <div className='button-bar count'>
              <span className='item-price'>75.00 &euro;</span>
              <div className='count-ctl'>
                <a className='button btn-inc'><img src='/icon-plus.svg' /></a>
                <span className='label-count'>5</span>
                <a className='button btn-dec'><img src='/icon-minus.svg' /></a>
              </div>
            </div>
          </div>
        </div>
        <div className='line-item'>
          <div className='img-wrapper'>
            <div className='img-border no-image'>
              <img src='/lineitem.svg' />
            </div>
          </div>
          <div className='desc-block'>
            <article className='item-title'>Title Lorem ipsum dolor sit</article>
            <article className='item-desc'>Lorem ipsum dolor sit amet, quis dictum mauris erat aliquam, ac in pede pharetra quis non et.</article>
            <select className='item-line'>
              <option value='0'>Canon EOS 5D</option>
              <option value='1'>Canon EOS 6D</option>
              <option value='2'>Canon EOS 7D</option>
            </select>
          </div>
          <div className='ctl-block'>
            <div className='button-bar remove'>
              <a className='button-remove'><img src='/icon-trash.svg' /></a>
            </div>
            <div className='button-bar count'>
              <span className='item-price'>75.00 &euro;</span>
              <div className='count-ctl'>
                <a className='button btn-inc'><img src='/icon-plus.svg' /></a>
                <span className='label-count'>5</span>
                <a className='button btn-dec'><img src='/icon-minus.svg' /></a>
              </div>
            </div>
          </div>
        </div>
        <div className='line-item'>
          <div className='img-wrapper'>
            <div className='img-border no-image'>
              <img src='/lineitem.svg' />
            </div>
          </div>
          <div className='desc-block'>
            <article className='item-title'>Title Lorem ipsum dolor sit</article>
            <article className='item-desc'>Lorem ipsum dolor sit amet, quis dictum mauris erat aliquam, ac in pede pharetra quis non et.</article>
            <select className='item-line'>
              <option value='0'>Canon EOS 5D</option>
              <option value='1'>Canon EOS 6D</option>
              <option value='2'>Canon EOS 7D</option>
            </select>
          </div>
          <div className='ctl-block'>
            <div className='button-bar remove'>
              <a className='button-remove'><img src='/icon-trash.svg' /></a>
            </div>
            <div className='button-bar count'>
              <span className='item-price'>75.00 &euro;</span>
              <div className='count-ctl'>
                <a className='button btn-inc'><img src='/icon-plus.svg' /></a>
                <span className='label-count'>5</span>
                <a className='button btn-dec'><img src='/icon-minus.svg' /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id='total-price'>
        <span>225.00 &euro;</span>
      </div>
    </div>);
  }
}

export default App;
