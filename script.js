"use strict";

function pageLoad(){
console.log("Ready for submission!");
watchForSubmit();
}

var userText = "";

function userInput() {
userText = $("#user-input-info").val();
return(userText);
}

function watchForSubmit() {
$("#search-form").submit(event => {
console.log("Submission received!");
event.preventDefault();
getUserName(userInput);
});
}

function getUserName() {
fetch(`https://api.github.com/users/${userInput()}/repos`)
.then(response => response.json())
.then(responseJson => displayResults(responseJson))
.catch(error => alert("Unable to locate user, please try again."));
}

function displayResults(responseJson){
console.log(responseJson);
$("#results-display").empty();
let responseDisplay = "";
responseJson.forEach(userRepo => {
responseDisplay+= `<div class = "panel"><h3>${userRepo.name}</h3></div>
<a href="${userRepo.html_url}">Repo URL Link</a>`
});
$("#results-display").html(responseDisplay);
$(".results-display-container").removeClass("hidden");
}

$(pageLoad);
