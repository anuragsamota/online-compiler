// let editor;

// window.onload = function() {
//     editor = ace.edit("editor");
//     editor.setTheme("ace/theme/monokai");
//     editor.session.setMode("ace/mode/c_cpp");
// }

// function changeLanguage() {

//     let language = $("#language").val();

//     if (language == 'c' || language == 'cpp' )editor.session.setMode("ace/mode/c_ccp");
//     else if(language == 'php')editor.session.setMode("ace/mode/php");
//     else if(language == 'python')editor.session.setMode("ace/mode/python");
//     else if(language == 'node')editor.session.setMode("ace/mode/javascript");

// }
// function executeCode() {

//     $.ajax({

//         URL: "/ide/app/compiler.php",

//         method: "POST",

//         date: {
//             language: $("#languages").val(),
//             code: editor.getSession().getValue()
//         },

//         success: function(response) {
//             $(".output").text(response)
//         }
//     })
// }

//grabbing dom elements
const runBtn = document.getElementById("run-btn");
const output = document.getElementById("output");
const langSelector = document.getElementById("languages");

let editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/python");

let language;

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST',// *GET, POST, PUT, DELETE, etc.
      mode: 'cors', 
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}


langSelector.onchange =()=> {
  language = langSelector.value;
  if (language == 'c' || language == 'cpp' )editor.session.setMode("ace/mode/c_ccp");
  else if(language == 'python')editor.session.setMode("ace/mode/python");
  else if(language == 'node')editor.session.setMode("ace/mode/javascript");
  console.log(language)
}


runBtn.onclick = async () => {
  let resp;
    if(language === 'node'){
      resp = await postData('/nodejs',{
        code : editor.getSession().getValue(),
    })
    }else if(language==='python'){
      resp = await postData('/python',{
          code : editor.getSession().getValue(),
      })
    }else if(language=='c'){
      resp = await postData('/c',{
        code : editor.getSession().getValue(),
      })
    }else if(language == 'cpp'){
      resp = await postData('/cpp',{
        code : editor.getSession().getValue(),
      })
    }


    
    if(resp.res != ""){
      output.innerHTML = resp.res;
      output.style.color = "black";
    }
    if(resp.err != ""){
      output.innerHTML = resp.err
      output.style.color = "red"
    }
}
