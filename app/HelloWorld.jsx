const React = require('react');
const Spring = require('react-spring');
const Router = require('react-router-dom');

/* the main page for the index route of this app */
const HelloWorld = function() {
  
  const useAnimation = (ref) => {
    const spring = Spring.useSpring({
        ref: ref,
        from: {
          opacity: 0
        },
        to: { 
          opacity: 1
        }
    });
    return spring;
  }
  
  function moreOpaque(e) {
    e.target.style.opacity = '1'
  }
  
  function lessOpaque(e) {
    e.target.style.opacity = '0.6'
  }
  
  const text1 = React.useRef();
  const text2 = React.useRef();
  const text3 = React.useRef();
  const text4 = React.useRef();
  const text5 = React.useRef();
  const text6 = React.useRef();
  const text7 = React.useRef();
  const text8 = React.useRef();
  const text9 = React.useRef();
  
  const Spring1 = useAnimation(text1);
  const Spring2 = useAnimation(text2);
  const Spring3 = useAnimation(text3);
  const Spring4 = useAnimation(text4);
  const Spring5 = useAnimation(text5);
  const Spring6 = useAnimation(text6);
  const Spring7 = useAnimation(text7);

  
  
  //Spring.useChain([Spring1, Spring2, Spring3, Spring4, Spring5, Spring6, Spring7])
  Spring.useChain([text1, text2, text3, text4, text5, text6, text7])
  
  const myStyle2 = {
    display: 'flex',
    margin: 'auto',
    justifyContent: 'space-around',
    maxWidth: '70%',
    fontSize: '40px'
  };
  
  const backgroundStyle = {
    backgroundImage: 'url(https://cdn.glitch.com/0b60f419-baef-41ae-a04a-f9f67990c687%2FBackground.jpg?v=1591506274295)',
    margin: 'auto',
    height: '800px',
    backgroundPosition: 'center',
    backgroundSize: '1000px 550px',
    backgroundRepeat: 'no-repeat',
    color: '#B3A369'
  }
  
  const myStyle = {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '10px',
    color: 'white'
  }
  
   const box = {
    border: '2px solid black',
    margin: '10px',
    padding: '5px',
    textAlign: 'center',
    color: 'white',
    opacity: '0.6',
    transition: '0.3s'
  }
  
  return (
      <div style = {backgroundStyle}>

        <div style = {myStyle2}>
          <Spring.animated.h1 style={Spring1}> Welcome</Spring.animated.h1>
          <Spring.animated.h1 style={Spring2}> To</Spring.animated.h1>
          <Spring.animated.h1 style={Spring3}> The</Spring.animated.h1>
          <Spring.animated.h1 style={Spring4}> Class</Spring.animated.h1>
          <Spring.animated.h1 style={Spring5}> of</Spring.animated.h1>
          <Spring.animated.h1 style={Spring6}> 2020</Spring.animated.h1>
          <Spring.animated.h1 style={Spring7}> Yearbook</Spring.animated.h1>
        </div>

        <div style = {myStyle}>
            <img 
              src = "https://cdn.glitch.com/c83bb59a-1fc9-4907-a50e-c48fb3ce62a4%2Fuc-davis-aggies-4-logo-png-transparent.png?v=1590444161420"
              height = {200}>
            </img>
        </div>

        <div style = {myStyle}>
            <h1 style = {box} onMouseOver = {moreOpaque} onMouseLeave = {lessOpaque}><Router.Link to="/Login">Upload Profile</Router.Link></h1>
            <h1 style = {box} onMouseOver = {moreOpaque} onMouseLeave = {lessOpaque}><Router.Link to="/Search">Search</Router.Link></h1>
        </div>
        <div style = {myStyle}>
            <h1 style = {box} onMouseOver = {moreOpaque} onMouseLeave = {lessOpaque}><Router.Link to="/Show">View the Yearbook</Router.Link></h1>
        </div>

      </div>
  );
  
};

  

module.exports = HelloWorld;