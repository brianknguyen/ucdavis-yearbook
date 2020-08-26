const React = require('react');
const Router = require('react-router-dom');

const Login = function() {
  
  var Data = {"picture": "red", "message": "fdsfdfsf", "name": "Indie Flower", "major": "whatever"};
  let textMessage = React.createRef();
  let textPicture = React.createRef();
  let textName = React.createRef();
  let textMajor = React.createRef();
  
  const ChangeMessage = (event) => {
    
    event.target.style.background = 'grey';
    
    Data.message = textMessage.current.value;
    Data.name = textName.current.value;
    Data.major = textMajor.current.value;
    
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/sharePostcard", true); 
    xhr.setRequestHeader("Content-Type", "application/json");
  
    let Person = JSON.stringify(Data);
    xhr.send(Person);
    
  }
  
  const uploadpicture = () => {
    
    var selectedFile = document.getElementById('fileChooser').files[0];
    // store it in a FormData object
    const formData = new FormData();
    // name of field, the file itself, and its name
    formData.append('newImage',selectedFile, selectedFile.name);

    // build a browser-style HTTP request data structure
    const xhr = new XMLHttpRequest();
    // it will be a POST request, the URL will this page's URL+"/upload" 
    xhr.open("POST", "/upload", true);
  
    // callback function executed when the HTTP response comes back
    xhr.onloadend = function(e) {
        // Get the server's response body
        console.log(xhr.responseText);
        // now that the image is on the server, we can display it!
        let newImage = document.getElementById("serverImage");
        newImage.src = "http://ecs162.org:3000/images/mtank/"+selectedFile.name;
        Data.picture = selectedFile.name;
        //document.getElementById("picturelabel").style.marginTop = "20px";
        document.getElementById("newLabel").innerHTML = "Replace Image";
    }
    // actually send the request
    xhr.send(formData);
    
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
  
  const login = {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    maxWidth: '60%',
    margin: 'auto',
    paddingTop: '20px',
    paddingBottom: '20px'
  }
  
  const headerStyle = {
    margin: 'auto',
    display: 'block',
    height: '120px',
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '20px'
  }
  
  const vert = {
    display: 'flex',
    flexDirection: 'column'
  }
  
  const myStyle2 = {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center'
  }
  
  const myStyle3 = {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: '50px'
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
    fontFamily: 'Quicksand',
    border: '2px dotted black',  
    maxWidth: '200px',
    height: '200px',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '20px'
  }
   
  const Box = {
    textAlign: 'center',
    margin: 'auto',
    maxWidth: '140px',
    minheight: '60px',
    lineHeight: '1.1em',
    border: '1px solid black', 
    transition: '0.3s',
    cursor: 'pointer',
    marginBottom: '20px'
  }
  
  return(
    <div style = {Text}>
      <div style = {header}>
        <img src = 'https://cdn.glitch.com/0b60f419-baef-41ae-a04a-f9f67990c687%2FUC_Davis_Logo.png?v=1591511607594' style = {headerStyle}></img>
      </div>
      
      <form>
      
        <div style = {myStyle}> 
          Create Your Yearbook Entry
        </div>

        <div style = {AddPicture}>
          <img id="serverImage"/>
          <section id="imageBorder">
            <label id="newLabel" for="fileChooser">Choose Image</label>
            <input type="file" id="fileChooser" accept="image/png, .jpeg, .jpg, image/gif" onClick = {uploadpicture}></input>
          </section>
        </div>
       
        <div id = "picturelabel" style = {myStyle3}> 
           Picture (To upload a picture, click "Choose Image" and select a picture, then click "Choose Image" again)
         </div>

        <div style = {login}> 
          <div style = {vert}>
            <div style = {myStyle2}><input ref ={textName}/>
            </div>

            <div style = {myStyle2}> 
              Name
            </div>
          </div>

          <div style = {vert}>
            <div style = {myStyle2}><input ref={textMessage}/>
            </div>

            <div style = {myStyle2}> 
              Bio 
            </div>
          </div>
            
          <div style = {vert}>
            <div style = {myStyle2}><input ref={textMajor}/>
            </div>

            <div style = {myStyle2}> 
              Major 
            </div>  
          </div>
        </div>
        
        <div style = {Box}  onClick = {ChangeMessage} onMouseOver = {changeColor} onMouseLeave = {changeBack}>
          Submit
        </div>
        
        <div style = {Box} onMouseOver = {changeColor} onMouseLeave = {changeBack}>
          <h1><Router.Link to="/">Homepage</Router.Link></h1>
        </div>
        
      </form>
      
    </div>      
  );
  
};

module.exports = Login;