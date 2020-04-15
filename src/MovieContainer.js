import React, { Component } from 'react'
import StackGrid , { transitions } from "react-stack-grid";
import CardComponent from './CardComponent'
import axios from 'axios'
import spinner from './images/loader.gif'
import InfiniteScroll from "react-infinite-scroll-component";

const { scaleDown } = transitions;
export default class MovieContainer extends Component {
    constructor(props) {
        super(props)
        this.state= ({
            images: [],
            responses: [],
            pages: 1
        })
        this.searchUnsplash = this.searchUnsplash.bind(this)
    }
    async searchUnsplash() {
        this.setState(prev => ({
          pages: prev.pages+1
        }))
        console.log("page count is",this.state.pages)
        let response = await 
        axios
            .get(
          `     https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=843c44eea75c6f1f4a15f3b22fbf5ada&page=${this.state.pages}`)

        response = response.data.results
        console.log(response, "page responses")
        this.setState(prev => ({
          responses: [...prev.responses, response]
        }))
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
