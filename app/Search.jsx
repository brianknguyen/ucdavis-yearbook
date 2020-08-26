const React = require('react');
const Router = require('react-router-dom');

var idNum = [];

const Search = function() {
  
  let textName = React.createRef();
  var Searched = {"name": "red"};
  var count = 0;
  
  const SearchFor = (event) => {
    
    Searched.name = textName.current.value;
    
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/search", false); 
    xhr.setRequestHeader("Content-Type", "application/json");
  
    let Person = JSON.stringify(Searched);
    xhr.send(Person);
 
    let part2 = JSON.parse(xhr.response);
    
    for (var i = 0; i < part2.length; i++){
      idNum[i] = part2[i].rowIdNum;
    }
      document.getElementById("main2").innerHTML = "";
      for (var i = 0; i < part2.length; i++){
        
        var node = document.createElement("div"); // Name
        var node2 = document.createElement("div"); // Major
        var node3 = document.createElement("div");  // Bio
        var node4 = document.createElement("img");  // Picture
        var overdiv = document.createElement("div");  

        let pictureId = "picture"+i;

        node.setAttribute("class", "name");
        node3.setAttribute("class", "bio");
        node2.setAttribute("class", "major");
        node4.setAttribute("class", pictureId);
        overdiv.setAttribute("class", "overdiv");


        var textnode = document.createTextNode(part2[i].name);
        var textnode2 = document.createTextNode(part2[i].major);
        var textnode3 = document.createTextNode(part2[i].bio); // Create a text node

        node4.src = "http://ecs162.org:3000/images/mtank/"+part2[i].picture;

        node.appendChild(textnode); 
        node2.appendChild(textnode2); 
        node3.appendChild(textnode3); 

        node4.onclick = overlayPic;

        overdiv.appendChild(node4);
        overdiv.appendChild(node);
        //overdiv.appendChild(node2);
        //overdiv.appendChild(node3);

        var maindiv = document.getElementById("main2");

        maindiv.appendChild(overdiv);

    }
}
  
  var idnum = {"idNum": "0"}
  
  function overlayPic(e) {
    let picId = e.target.className.toString();
    picId = picId.charAt(picId.length-1);
    
    idnum.idNum = idNum[picId];

    const newXhr = new XMLHttpRequest();
    newXhr.open("POST", "/overlay", false); 
    newXhr.setRequestHeader("Content-Type", "application/json;charse=UTF-8");
  
    let Request = JSON.stringify(idnum);
    newXhr.send(Request);
    
    let overlayJSON = newXhr.response;
    let newOverlay = overlayJSON.substring(1, overlayJSON.length - 1);
    overlayJSON = JSON.parse(newOverlay);
    //console.log(overlayJSON);
    document.getElementById("closeUp").addEventListener("click", off);
    on(overlayJSON);
    
  }
  
  function on(overlayJSON) {
    document.getElementById("overlay").style.display = "block";
    let newImage = document.getElementById("popUpImg");
    newImage.src = "http://ecs162.org:3000/images/mtank/"+overlayJSON.picture;
    document.getElementById("nameBox").innerHTML = overlayJSON.name;
    document.getElementById("majorBox").innerHTML = overlayJSON.major;
    document.getElementById("bioBox").innerHTML = overlayJSON.bio;
  }

  function off() {
    document.getElementById("overlay").style.display = "none";
  }  
  
  
  function Hide() {
    document.getElementById("main2").innerHTML = "";
  }
  
  function changeColor(e) {
    e.target.style.color = 'white'
  }
  
  function changeBack(e) {
    e.target.style.color = '#002855'
  }
  
  const header = {
    backgroundColor: '#002855',
    padding: '20px'
  }
  
  const headerStyle = {
    margin: 'auto',
    display: 'block',
    height: '120px',
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '20px'
  }
  
  const myStyle = {
   display: 'flex',
   justifyContent: 'center',
   textAlign: 'center'
  };
  
  const Text = {
    fontSize: '20px',
    backgroundColor: '#E5D3B3',
    color: '#002855',
    paddingBottom: '20px'
  }
  
  const AddPicture = {
    border: '3px dotted black',  
    maxWidth: '200px',
    height: '200px',
    display: 'flex',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto'
  }

  const Box = {
    textAlign: 'center',
    margin: 'auto',
    maxWidth: '200px',
    minheight: '60px',
    lineHeight: '1.1em',
    border: '1px solid black', 
    transition: '0.3s',
    cursor: 'pointer',
    marginTop: '25px'
    
  }
  
  return(
    <div style = {Text}>
      
      <div style = {header}>
        <img src = 'https://cdn.glitch.com/0b60f419-baef-41ae-a04a-f9f67990c687%2FUC_Davis_Logo.png?v=1591511607594' style = {headerStyle}></img>
      </div>
      
      <form>
      
        <div style = {myStyle}> 
          Search For:
        </div>

        <div style = {myStyle}><input ref ={textName}/>
        </div>

        <div style = {myStyle}> 
          Name (Case sensitive, must be exact name submitted)
        </div>
        
        <div style = {Box}  onClick = {SearchFor} onMouseOver = {changeColor} onMouseLeave = {changeBack}>
          Submit
        </div>
        <div style = {Box} onClick = {Hide} onMouseOver = {changeColor} onMouseLeave = {changeBack}>
          <h1><Router.Link to="/">Homepage</Router.Link></h1>
        </div>
        
      </form>
      
      <div style = {myStyle}> 
          Click on person's picture below to see their profile!
      </div>
    </div>      
  );
  
};

module.exports = Search;