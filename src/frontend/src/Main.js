import React, { Component } from 'react'
import logocircle from './images/logo.circle.png'
import busd from './images/busd.png'
import busdreward from './images/busdreward.png'
import selltax from './images/selltax.png'

const API_KEY = process.env.REACT_APP_API_KEY
const CONTRACT_ADDR = process.env.REACT_APP_CONTRACT_ADDR

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            olympusBalance: 0,
            busdBalance: 0,
            busdReward: 0,
            buybackBalance: 0,
            selectedAddress: null
        }
    }

    async componentDidMount() {
        console.log('componentDidMount')
    }

    changeAddress = async(address) => {
        this.setState({
          selectedAddress: address
        })
        console.log(`${API_KEY}`)
        console.log(`${CONTRACT_ADDR}`)
        console.log(`${this.state.selectedAddress}`)
        const BSC_URL1 = `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${CONTRACT_ADDR}&address=${this.state.selectedAddress}&tag=latest&apikey=${API_KEY}`
        console.log(BSC_URL1)
        const BSC_URL2 = `https://api.bscscan.com/api?module=account&action=balance&address=${this.state.selectedAddress}&tag=latest&apikey=${API_KEY}`
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
                </div>
            </div>
        )
    }
}

export default Main;