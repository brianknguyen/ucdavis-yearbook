const React = require('react');
const Router = require('react-router-dom');

var Searched = {"name": "red"};

const Show = function() {

   var count = 0;
  
   const Box = {
    textAlign: 'center',
    margin: 'auto',
    maxWidth: '200px',
    minheight: '60px',
    lineHeight: '1.1em',
    border: '1px solid black', 
    transition: '0.2s',
    cursor: 'pointer',
    marginBottom: '20px',
    fontColor: 'black'
   }
   
   const header = {
    backgroundColor: '#002855',
    padding: '20px',
    marginBottom: '35px'
  }
   
  const headerStyle = {
    margin: 'auto',
    display: 'block',
    height: '120px',
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '20px',
    
  }
  
  function Hide() {
    //document.getElementById("main2").style.visibility = "hidden";
    document.getElementById("main2").style.backgroundColor = "white";
    document.getElementById("main2").innerHTML = "";
  }
   
   const Flex = {
     backgroundColor: '#E5D3B3',
   }
   
  function changeColor(e) {
    e.target.style.color = '#B3A369'
  }
  
  function changeBack(e) {
    e.target.style.color = '#002855'
  } 
  
  const ShowYearbook = (event) => {
    
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/show", false); 
    xhr.setRequestHeader("Content-Type", "application/json");
  
    let Person = JSON.stringify(Searched);
    xhr.send(Person);
 
    let part2 = JSON.parse(xhr.response);
    
       if (count == 0) {
       for (var i = 0; i < part2.length; i++){

        var node = document.createElement("div");
        var node2 = document.createElement("div");
        var node3 = document.createElement("div"); 
        var node4 = document.createElement("img"); 
        var overdiv = document.createElement("div"); 

        node.setAttribute("class", "name");
        node3.setAttribute("class", "bio");
        node2.setAttribute("class", "major");
        node4.setAttribute("class", "picture");
        overdiv.setAttribute("class", "overdiv");

        var textnode = document.createTextNode(part2[i].name);
        var textnode2 = document.createTextNode(part2[i].major);
        var textnode3 = document.createTextNode(part2[i].bio); // Create a text node

        node4.src = "http://ecs162.org:3000/images/mtank/"+part2[i].picture;

        node.appendChild(textnode); 
        node2.appendChild(textnode2); 
        node3.appendChild(textnode3); 

        overdiv.appendChild(node4);
        overdiv.appendChild(node);
        overdiv.appendChild(node2);
        overdiv.appendChild(node3);

        var maindiv = document.getElementById("main2");

        //maindiv.appendChild(node);
        //maindiv.appendChild(node2);
        //maindiv.appendChild(node3); 

        maindiv.appendChild(overdiv);
        maindiv.style.backgroundColor = "#E5D3B3";
        count = count + 1;

    }
    }
        //document.getElementById("main2").style.visibility = "visible";
  }
  
  
  return(
   <div> 
      <div style = {header}>
        <img src = 'https://cdn.glitch.com/0b60f419-baef-41ae-a04a-f9f67990c687%2FUC_Davis_Logo.png?v=1591511607594' style = {headerStyle}></img>
      </div>
      <div>
        <div style = {Box} onClick = {ShowYearbook} onMouseOver = {changeColor} onMouseLeave = {changeBack}>
          Show Yearbook!
        </div>
        <div style = {Box} onClick = {Hide} onMouseOver = {changeColor} onMouseLeave = {changeBack}>
          <h1><Router.Link to="/">Homepage</Router.Link></h1>
        </div>
      </div>
  </div>
  );
};

module.exports = Show;