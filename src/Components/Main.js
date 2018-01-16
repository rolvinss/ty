// This is the central page from where we centralized our data flow.
// the other compoents like ActorInNewsDetails, HomePage are retrieved from Here

import React, { Component } from 'react';
import axios from 'axios';
import HomePage from './HomePage/HomePage';
import ActorInNewsDetails from './ActorInNewsDetails/ActorInNewsDetails';

import './Main.css';



class Main extends Component {
  constructor(props) {
  super(props);
  this.state =
  {

  ActorListView: false,//this is used to disappaer list of actors when we select one of the actor for more information
  HomePageView: true, //this is used to conditionally check if we have to view HomePageView or not
  ActorInNewsDetailsView: false, //this is used to conditionally check if we have to view ActorInNewsDetails or not
  ActorSearch: '', //this state receives data from HomePage input box this is the only text we got from user
  ActorList:[], //this stores all the array from axios funtion related to actor list.
  selectedActorID: false, //this is the state which stores the actor id (tmdb id)  for which we have to take our search for next level
  selectedActorName: '', //this is the state which stores the actor full name (tmdb ifull name)  for which we have to take our search for next level
  };
  }

//this function is called from child component HomePage to update the status of searchbox and store the related list of actors related to the search item given
  searchActor = (event) => {
    event.preventDefault();
    this.setState({
      ActorSearch: event.target.value,
      ActorListView: true,
    }, function(){
      console.log('dsahj',this.state.ActorSearch);
      console.log('MovieListView',this.state.ActorListView);
      axios.get( `https://api.themoviedb.org/3/search/person?api_key=7e606d4051e82d4ad888f0a9ceb164be&language=en-US&query=${this.state.ActorSearch}`)
            .then( response => {
                    const actors = response.data.results.slice(0,6);
                    this.setState({ActorList: actors},function(){ console.log(this.state.ActorList)})
              });
    });
  }
//this function updates the state of actual id and name for the actor we wish to select and view their item related to it.
  actorSelectHandler = (id,name) => {
    this.setState({
      selectedActorID: id,
      selectedActorName: name,
      ActorListView:false,
      HomePageView: false,
    },function(){
      console.log('selectedActorID', this.state.selectedActorID );
      console.log('selectedActorIDname', this.state.selectedActorName);
    })
  }


  render(){
    let ActorList = null; //this is the view of actors list which is present after inputing something in the text box.
      if (this.state.ActorListView) {
          ActorList = this.state.ActorList.map(ActorList => {
              return (
                <article >
                <div className="col-md-4">
                   <div className="single-blog-item">
                            <div className="blog-thumnail">
                                <a href=""><img src={`http://image.tmdb.org/t/p/w185/${ActorList.profile_path}`} className="img-thumnail img_Actor" style={{width: '100%'}} alt="blog-img"/></a>
                            </div>
                            <div className="blog-content">
                                <h4><a>{ActorList.name}</a></h4>
                                <div className="text-center">
                                  <button onClick={() => this.actorSelectHandler(ActorList.id,ActorList.name)} className="mx-auto btn-default btn-lg"> <i className="fa fa-share" aria-hidden="true"></i> &nbsp; View Details</button>
                                </div>
                            </div>
                            <span className="blog-date">Popularity Score: {ActorList.popularity}</span>
                        </div>
                </div>
                </article>
              );
          });
      }
    return (
      <div>
        <HomePage changed={this.searchActor}/>
         {ActorList}
        <ActorInNewsDetails id={this.state.selectedActorID} name={this.state.selectedActorName}/>
      </div>
    );
  }
}

export default Main;
