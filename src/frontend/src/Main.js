import React, { Component } from 'react'
import logocircle from './images/logo.circle.png'
import busd from './images/busd.png'

const API_KEY = process.env.REACT_APP_API_KEY
const CONTRACT_ADDR = process.env.REACT_APP_CONTRACT_ADDR

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            olympusBalance: 0,
            busdBalance: 0,
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
        const BSC_URL = `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${CONTRACT_ADDR}&address=${this.state.selectedAddress}&tag=latest&apikey=${API_KEY}`
        console.log(BSC_URL)
        if (this.state.selectedAddress != undefined) {
            const resp = await fetch(BSC_URL, {
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
        }
    }

    render() {
        return (
            <div class="row">
                <div class="col-md-3">
                    <div class="card-header">
                        <img src={logocircle} height='64' alt="Logo" class="card-header_img"/>
                        <div  class="card-header_center">
                            <div  class="info">
                            {this.state.selectedAddress ? this.state.olympusBalance : "Please connect wallet to view"}
                            </div>
                        </div>
                        <h3 class="card-header_btm">TOTAL OLYMPUS HOLDINGS</h3>
                    </div>
                    <div class="btn-main">
                        <span class="mas">BUY OLYMPUS</span>
                        <button type="button" name="Hover" class="">BUY OLYMPUS</button>
                    </div>
                </div>
                
                <div class="col-md-3">
                    <div class="card-header">
                        <img src={busd} height='64' alt="Logo" class="card-header_img"/>
                        <div class="card-header_center">
                            <div class="info"> 
                            {this.state.selectedAddress ? `$${this.state.busdBalance}` : "Please connect wallet to view"} 
                            </div>
                            
                        </div>
                        <h3 class="card-header_btm">TOTAL BUSD PAID</h3>
            
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;