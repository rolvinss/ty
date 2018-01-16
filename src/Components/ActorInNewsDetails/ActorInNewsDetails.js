import React, { Component } from 'react';
import  axios from 'axios';

import './ActorInNewsDetails.css';

class ActorInNewsDetails extends Component{
  constructor(props) {
  super(props);
  this.state =
  {
    selectedActorID: false,
    selectedActorName: '',
    actorDetails: [],
    newsArticles: [],
    news: false,

  };
  }
updateState = (id,name) => {
  this.setState({
    selectedActorID: id,
    selectedActorName:name,
  },function(){
    console.log('selectedActorID from actorIndetails',this.state.selectedActorID);
    console.log('selectedActorIDnamefsd from actorIndetails',this.state.selectedActorName);
    axios.get( `https://api.themoviedb.org/3/person/${this.state.selectedActorID}?api_key=7e606d4051e82d4ad888f0a9ceb164be&`)
          .then( response => {
                  this.setState({actorDetails: response.data},function(){ console.log(this.state.actorDetails.name)})
            });
    axios.get( `https://newsapi.org/v2/everything?q=${this.props.name}&apiKey=fd95c1edd0544293ac46f28cc807cedb`)
            .then( response => {
              const newsArticles = response.data.articles.slice(0,10);
                  this.setState({newsArticles: newsArticles, news: true},function(){ console.log(this.state.news);console.log(this.state.newsArticles)})
           });

  })
}
  render(){
    let articles = null;
    if (this.state.news) {
        articles = this.state.newsArticles.map(newsArticles => {
            return (
              <div className="row">
                <div className="col-md-4">
                  <img src={newsArticles.urlToImage} alt="" className="img-thumbnail img_card " alt="image not available"/>
                </div>
                <div className="col-md-8">
                <div className="row">
                <div className="card">
                    <div className="card-block">
                      <h3> {newsArticles.title}</h3>
                   </div>
                </div>
                </div>
                <div className="row">
                <div className="card">
                    <div className="card-block">
                      <h4>Author: {newsArticles.author}</h4>
                    </div>
                </div>
                </div>
                <div className="row">
                  <div className="card" >
                    <div className="card-body">
                      <h3 className="card-title">Description</h3>
                      <p className="card-text">{newsArticles.description}</p>
                      <a href={newsArticles.url} className="btn btn-primary">Go To Source Website</a>
                    </div>
                  </div>
                </div>
                </div>
                <hr className="my-4"/>
                <br />
              </div>
            );
        });
    }

    let details = null;
    if(this.state.selectedActorID){
      details = (
        <div className="jumbotron">
            <div className="row">
              <h2 className="display-2 text-center">{this.props.name}</h2>
            </div>
            <div className="row">
              <div className="col-md-4">
  <img src={`http://image.tmdb.org/t/p/w185/${this.state.actorDetails.profile_path}`} alt="" className=" img_Actor_Detail img-thumbnail "/>
              </div>
              <div className="col-md-8">
              <div className="row">
              <div className="card">
                  <div className="card-block">
                    <h4>Birth Date: {this.state.actorDetails.birthday}</h4>
                 </div>
              </div>
              </div>
              <div className="row">
              <div className="card">
                  <div className="card-block">
                    <h4>Place of Birth: {this.state.actorDetails.place_of_birth}</h4>
                  </div>
              </div>
              </div>
              <div className="row">
                <div className="card" >
                  <div className="card-body">
                    <h3 className="card-title">Biography</h3>
                    <p className="card-text">{this.state.actorDetails.biography}</p>
                  </div>
                </div>
              </div>
              </div>
            </div>
            <hr className="my-4"/>
            <div className="row">
              <h2 className="display-2 text-center">Trending Articles Related to {this.props.name}</h2>
            </div>
       </div>
      );
    }

    return(
      <div>
      <div>
        <button className="btn btn-default btn-lg text-center mt-3 col-md-4 col-md-offset-4" onClick={() => this.updateState(this.props.id,this.props.name)}>Show More About {this.props.name}</button>
      </div>
      {details}
      {articles}
      </div>
    );

  }

}

export default ActorInNewsDetails;
