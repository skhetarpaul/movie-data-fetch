import React, { Component } from 'react'


import './CardComponent.css'

export default class CardComponent extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            like: false
        })
        this.toggleClick = this.toggleClick.bind(this)
    }
    toggleClick = () => {
        this.setState(prev => ({
            like: !prev.like
        }))
    }
    render() {
        let liked = this.state.like
        let buttonLike
        if(liked) {
            buttonLike =<i onClick={this.toggleClick} className="fa fa-3x fa-heartbeat" aria-hidden="true"></i>
        }
        else{
            buttonLike = <i className="fa fa-heart fa-3x" aria-hidden="true" onClick={this.toggleClick}></i>
        }
        return (
            
                <div className="content">
                    <div className="content-overlay"></div>
                    <img className = "content-image"
                        src={this.props.src}
                        alt={this.props.alt}
                    />
                        <div class="content-details fadeIn-bottom">
                            <h3 class="content-title">{this.props.alt}</h3>
                            <p class="content-text">{this.props.description}</p>
                            <br />
                            <br/>
                            {buttonLike}
                        </div>
                   
                </div>
        )
    }
}
