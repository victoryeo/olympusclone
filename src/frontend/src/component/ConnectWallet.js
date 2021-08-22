import React from "react";
import twitter from '../images/twitter.png'
import instagram from '../images/instagram.png'
import telegram from '../images/telegram.png'
import email from '../images/email.png'
import logoverticalbar from '../images/logo.verticalbar.png'
import logocircle from '../images/logo.circle.png'

export class ConnectWallet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedAddress: null
    }
  }

  changeAddress = (address) => {
    this.setState({
      selectedAddress: address
    })
  }

  render() {
    return (
      <div className='top'> 
        <img src={logoverticalbar} height='32' alt="" align='left'/>

        <div className='right'> 
          <div className="icons">
          <div className="val-bg">
            <img className="logo" src={logocircle} height='32' alt="Logo"/>
            {this.props.totalBalance}
          </div>
          </div>
          <div className="socialIcons">
            <a data-v-792c4c3e="" href="https://mobile.twitter.com/olympus_token" target="_blank">
              <img src={twitter} height='32' alt=""/></a>
            <a data-v-792c4c3e="" href="https://www.instagram.com/olympusbsc/?hl=en" target="_blank">
              <img src={instagram} height='32' alt=""/></a>
            <a data-v-792c4c3e="" href="https://t.me/OlympusOfficial" target="_blank">
              <img src={telegram} height='32' alt=""/></a>
            <a data-v-792c4c3e="" href="mailto:contact@olympustoken.io" target="_blank">
              <img src={email} height='32' alt=""/></a>
          </div>  
          <div className="btn-main">
            <button
              className="btn btn-warning"
              type="button"
              onClick={this.props.connectWallet}
            >
              {this.state.selectedAddress ? this.state.selectedAddress : "Connect"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}