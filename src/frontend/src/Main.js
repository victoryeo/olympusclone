import React, { Component } from 'react'
import logocircle from './images/logo.circle.png'
import busd from './images/busd.png'
import busdreward from './images/busdreward.png'
import selltax from './images/selltax.png'
import CoinGecko from 'coingecko-api'

const API_KEY = process.env.REACT_APP_API_KEY
const CONTRACT_ADDR = process.env.REACT_APP_CONTRACT_ADDR

const endpoint = "https://graphql.bitquery.io";

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            olympusBalance: 0,
            busdBalance: 0,
            busdReward: 0,
            buybackBalance: 0,
            tokenLastPrice: 0,
            selectedAddress: null,
            totalOlympusReceived: 0,
        }
    }

    async componentDidMount() {
        console.log('componentDidMount')

        const CoinGeckoClient = new CoinGecko();
        let data = await CoinGeckoClient.coins.fetchTickers('olympus');
        console.log(data.data.tickers[0].last)
        this.setState({
            tokenLastPrice: data.data.tickers[0].last
        })
    }

    changeAddress = async(address) => {
        this.setState({
          selectedAddress: address
        })
        console.log(`${API_KEY}`)
        console.log(`${CONTRACT_ADDR}`)
        console.log(`${this.state.selectedAddress}`)
        const BSC_URL1 = `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${CONTRACT_ADDR}&address=${this.state.selectedAddress}&tag=latest&apikey=${API_KEY}`
        
        const BSC_URL2 = `https://api.bscscan.com/api?module=account&action=balance&address=${this.state.selectedAddress}&tag=latest&apikey=${API_KEY}`

        const RECEIVED_TOKEN_QUERY = `
        {
            ethereum(network: bsc) {
                dexTrades(
                    date: {since: "2021-07-06", till: "2021-08-22"},
                    baseCurrency: {is: "${CONTRACT_ADDR}"},
                    any: [{txTo: {is: "${this.state.selectedAddress}"}}]
                ) {
                baseCurrency {
                    symbol
                    address
                }
                baseAmount
                quoteCurrency {
                    symbol
                    address
                }
                quoteAmount
                trades: count
                quotePrice
                side
                }
            }
        }
        `;

        if (this.state.selectedAddress != undefined) {
            const resp = await fetch(BSC_URL1, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })
            console.log(resp)
            const data = await resp.json()
            console.log(data)
            if (data.message === "OK") {
                console.log('OK')
                this.setState({
                    olympusBalance: data.result
                })                
            }

            const resp2 = await fetch(BSC_URL2, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })
            console.log(resp2)
            const data2 = await resp2.json()
            console.log(data2)
            if (data2.message === "OK") {
                console.log('OK')
                this.setState({
                    buybackBalance: data2.result
                })                
            }

            // total tokens purchased or received by user
            const resp3 = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: RECEIVED_TOKEN_QUERY })
            })

            const data3 = await resp3.json()
            console.log(data3.data)
            console.log(data3.data.ethereum.dexTrades.length)
            if (data3.data.ethereum.dexTrades.length == 0) {
                this.setState({totalBpayReceived: 0})
            } else if (data3.data.ethereum.dexTrades.length > 0) {
                let receivedAmt = 0;
                for(const trade of data3.data.ethereum.dexTrades) {
                    console.log(trade)
                    receivedAmt += trade.baseAmount
                }
                this.setState({totalBpayReceived: receivedAmt})
            }
        }
    }

    render() {
        return (
            <div>
                <section className="section-container">
                <div className="row">
                    <div className="col-md-3">
                        <div className="card-header">
                            <img src={logocircle} height='64' alt="Logo" className="card-header_img"/>
                            <div  className="card-header_center">
                                <div  className="info">
                                {this.state.selectedAddress ? this.state.olympusBalance : "Please connect wallet to view"}
                                </div>
                            </div>
                            <h4 className="card-header_btm">TOTAL OLYMPUS HOLDINGS</h4>
                        </div>
                        <div className="btn-main">
                            <span className="mas">BUY OLYMPUS</span>
                            <button type="button" name="Hover" className="">BUY OLYMPUS</button>
                        </div>
                    </div>
                    
                    <div className="col-md-3">
                        <div className="card-header">
                            <img src={busd} height='64' alt="Logo" className="card-header_img"/>
                            <div className="card-header_center">
                                <div className="info"> 
                                {this.state.selectedAddress ? `$${this.state.busdBalance}` : "Please connect wallet to view"} 
                                </div>
                                
                            </div>
                            <h4 className="card-header_btm">TOTAL BUSD PAID</h4>
                
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card-header">
                        <img src={busdreward} height='64' alt="Logo" className="card-header_img"/>
                            <div className="card-header_center">
                                <div className="info"> 
                                {this.state.selectedAddress ? `$${this.state.busdReward}` : "Please connect wallet to view"} 
                                </div>
                                
                            </div>
                            <h4 className="card-header_btm">PENDING BUSD REWARDS</h4>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card-header">
                        <img src={selltax} height='64' alt="Logo" className="card-header_img"/>
                            <div className="card-header_center">
                                <div className="info"> 
                                5.00%
                                </div>
                                
                            </div>
                            <h4 className="card-header_btm">CURRENT SELL TAX</h4>
                        </div>
                    </div>
                </div>
                </section>
                <p></p>
                <div>
                    <section className="section-container">
                        <div className="holdersBx"> 
                            TOTAL PAID TO HOLDERS 
                            <div className="gradient-text-outer">
                                <h2 className="gradient-text">$ 1077003</h2> BUSD 
                            </div>
                        </div>
                    </section>
                    <p></p>
                    <section className="section-container">
                        <div className="holdersBx"> 
                            ZEUS BUYBACK BALANCE 
                            <div className="gradient-text-outer">
                                <h2 className="gradient-text">${this.state.buybackBalance}</h2> BUSD 
                            </div>
                        </div>
                    </section>
                    <p></p>
                    <section className="section-container">
                        <div className="holdersBx"> 
                            Token price 
                            <div className="gradient-text-outer">
                                <h2 className="gradient-text">${this.state.tokenLastPrice}</h2> USD
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}

export default Main;