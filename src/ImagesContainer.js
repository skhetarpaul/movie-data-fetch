import React, { Component } from 'react'
import StackGrid , { transitions } from "react-stack-grid";
import CardComponent from './CardComponent'
import axios from 'axios'
import spinner from './images/loader.gif'

// import ReactBootstrapStyle from 'react-bootstrap.internal.style-links';
const { scaleDown } = transitions;
export default class ImagesContainer extends Component {
    constructor(props) {
        super(props)
        this.state= ({
            images: []
        })
        this.searchUnsplash = this.searchUnsplash.bind(this)
    }
    async searchUnsplash(topic) {
        // this.state.images = [];
        let response = await 
        axios
        .get(
          `https://api.unsplash.com/search/photos?query=Autumn&per_page=20`,
          {
            headers: {
              Authorization:
                "Client-ID bbRCcna4uzk6KzqiKvuCjmzH-grJr1TLB5gt6gKFslE",
              "Accept-Version": "v1"
            }
          }
        )
response = response.data.results
// this.setState({
// images: response
// })
this.setState(prev => ({
  images: [...prev.images, response]
}))
      }
      async componentDidMount(){
        let response = await 
                              axios
                              .get(
                                `https://api.unsplash.com/search/photos?query=Autumn&per_page=20`,
                                {
                                  headers: {
                                    Authorization:
                                      "Client-ID bbRCcna4uzk6KzqiKvuCjmzH-grJr1TLB5gt6gKFslE",
                                    "Accept-Version": "v1"
                                  }
                                }
                              )
        response = response.data.results
        this.setState({
          images: response
        })
      }

    render() {
      let {images} = this.state
      let divRender
      console.log(images, "render method")
      let imageRender = images.length

      if(imageRender===0) {
        divRender = <div>
            <img src={spinner} alt="spinner" />
          </div>
      }
      else {
        divRender = 
        <div>
          <StackGrid
            columnWidth={300}
            monitor-images-loaded
            appear={scaleDown.appear}
            appeared={scaleDown.appeared}
            enter={scaleDown.enter}
            entered={scaleDown.entered}
            leaved={scaleDown.leaved}
          >
            {images.map((image, index) => {
              return <img src={image.urls.small} alt={image.alt_description} />
            })}
          </StackGrid>
          <StackGrid
            columnWidth={300}
            monitor-images-loaded
            appear={scaleDown.appear}
            appeared={scaleDown.appeared}
            enter={scaleDown.enter}
            entered={scaleDown.entered}
            leaved={scaleDown.leaved}
          >
            {images.map((image, index) => {
              return <CardComponent src={image.urls.small} alt={image.alt_description} />
            })}
          </StackGrid>
        </div>
      }
      
        return (
            <div>
                <div class="container">
                    <div class="button-wrapper">
                        <button class="btn" onClick= {() => this.searchUnsplash('Autumn')}>Autumn</button>
                    </div>
                    <div>
                      {divRender}
                    </div>
                </div>
            </div>
        )
    }
}
