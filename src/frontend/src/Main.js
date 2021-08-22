import React, { Component } from 'react'
import logocircle from './images/logo.circle.png'
import busd from './images/busd.png'

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
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
                            Please connect wallet to view
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
                              Please connect wallet to view 
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