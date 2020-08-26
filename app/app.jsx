const React = require('react');
const ReactDOM = require('react-dom');
const Router = require('react-router-dom');

/* Import Components */
const HelloWorld = require('./HelloWorld');
const Login = require('./Login');
const Search = require('./Search');
const Show = require('./Show');

class App extends React.Component{
    render(){
        return(
            <Router.BrowserRouter>
              <Router.Route exact = {true} path = '/' component = {HelloWorld}/>
              <Router.Route path = '/Login' component = {Login}/>
              <Router.Route path = '/Search' component = {Search}/>
              <Router.Route path = '/Show' component = {Show}/>
            </Router.BrowserRouter>
        );
    }
}



ReactDOM.render(<App/>, document.getElementById('main'));