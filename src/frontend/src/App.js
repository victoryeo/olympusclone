import React, { Component } from 'react'
import './App.css'
import Main from './Main'
import getWeb3 from './web3/getWeb3'
import { ConnectWallet } from './component/ConnectWallet'
import connectMetamaskWallet from './web3/connectMetamaskWallet'
import disconnectMetamaskWallet from './web3/disconnectMetamaskWallet'

class App extends Component {
  constructor(props) {
    console.log('constructor')
    super(props)
    this.state = {
      account: '',
      totalBalance: '0',
      ethBalance: '0',
      tokenBalance: '0',
      loading: true,
      errorFetch: null,
      selectedAddress: undefined,
    }
    this.web3 = null
    this.connectWallet = React.createRef();
  }

  async componentDidMount() {
    console.log('componentDidMount')
    try {
      this.web3 = await getWeb3
    } catch( err ) {
      console.warn('Error in web3 initialization.', err)
    }

    if (this.web3) {
      console.log(this.web3)
      let accounts = await this.web3.eth.getAccounts()
      console.log(accounts)

      let ethBal = await this.web3.eth.getBalance(accounts[0])
      console.log(ethBal)
      
      this.setState({
	      loading: false,
        account: accounts[0],
        totalBalance: "0",
        tokenBalance: "0",
        ethBalance: ethBal.toString()
      })
    }
  }

  calcTotal = async (etherAmount, etherWeight, daiAmount, daiWeight,
      tokenAmount, tokenWeight) => {
    let totalBal = 0;
    try {
      this.setState({
         totalBalance: totalBal,
      })
    }      
    catch (err) {
      console.error('Error ',err.message)
      this.setState({ loading: false , errorFetch: err.message })
    }
  }

  _connect = async() => {
    let userAddr
    if (this.state.selectedAddress === undefined) {
      userAddr = await connectMetamaskWallet()
    } else {
      userAddr = await disconnectMetamaskWallet()
    }
    console.log(userAddr)
    this.setState({selectedAddress: userAddr})
    this.connectWallet.current.changeAddress(this.state.selectedAddress)
  }

  render(){

    let content
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main
        totalBalance={this.state.totalBalance}
        calcTotal={this.calcTotal}
      />
    }
    return (
      <div className="App">
        <ConnectWallet 
          ref={this.connectWallet}
          connectWallet={() => this._connect()}
          totalBalance={this.state.totalBalance}
        />
        <hr></hr>

        YOUR GATEWAY TO OLYMPUS

        {content}
        
        { this.state.errorFetch && 
          <div style={{marginTop: 10 + 'em'}}> 
            {this.state.errorFetch} 
          </div> }
        <b>{this.state.selectedAddress}</b>        

      </div>
    )
  }
}

export default App