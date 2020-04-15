import React, { Component } from 'react'
import StackGrid , { transitions } from "react-stack-grid";
import CardComponent from './CardComponent'
import axios from 'axios'
import spinner from './images/loader.gif'

const { scaleDown } = transitions;
export default class MovieContainer extends Component {
    constructor(props) {
        super(props)
        this.state= ({
            images: [],
            responses: []
        })
        this.searchUnsplash = this.searchUnsplash.bind(this)
    }
    async searchUnsplash(topic) {
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
      async componentDidMount(){
        
        let response = await 
        axios
            .get(
          `     https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=843c44eea75c6f1f4a15f3b22fbf5ada`)

        response = response.data.results
        console.log(response, "all responses")
        this.setState({
          responses: response
        })
        let imageArray = []
        response.map((res) => {
            imageArray.push(`https://image.tmdb.org/t/p/original${res.poster_path}`)
        })
        console.log(imageArray, "image array")
 
        this.setState({
          images: imageArray
        })
      }

    render() {
      let {responses} = this.state
      let divRender
      console.log(responses, "render method")
      let responseRender = responses.length

      if(responseRender===0) {
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
            {responses.map((res, index) => {
              return <CardComponent src={`https://image.tmdb.org/t/p/original${res.poster_path}`} alt={res.original_title} description={res.overview} ratings= {res.popularity}/>
            })}
          </StackGrid>
        </div>
      }
      
        return (
            <div>
                <div class="container">
                    {/* <div class="button-wrapper">
                        <button class="btn" onClick= {() => this.searchUnsplash('Autumn')}>Autumn</button>
                    </div> */}
                    <div>
                      {divRender}
                    </div>
                </div>
            </div>
        )
    }
}
