import  React, { Component } from 'react';

//this is the Component from where we use our  home screen searchbar label.Here we get props from Main.js file. and we use child to parent rendering to change state in Main.js 
class HomePage extends Component {

  render(){
    return (
      <div className="jumbotron">
          <h1 className="display-4 text-center">Check Out Your Celebrity</h1>
          <p className="lead text-center">Search about your favorite celebrity and know the trending topics</p>
          <hr className="my-4"/>
          <div className="row">
            <div className=" input-group input-group-lg col-md-4 col-md-offset-4">
                    <input type="text" className="form-control" onChange={this.props.changed} placeholder="Type your celebrity name..." />
            </div>
        </div>
     </div>
    );
  }
}

export default HomePage;
