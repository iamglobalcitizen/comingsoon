// COUNTDOWN

var deadline = new Date("Feb 12, 2020 00:00:01").getTime(); 
var x = setInterval(function() { 
var now = new Date().getTime(); 
var t = deadline - now; 
var days = Math.floor(t / (1000 * 60 * 60 * 24)); 
var hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60)); 
var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)); 
var seconds = Math.floor((t % (1000 * 60)) / 1000); 
document.getElementById("countdown").innerHTML = days + " days &nbsp;| &nbsp;"  
+ hours + " hrs &nbsp;| &nbsp;" + minutes + " mins &nbsp;| &nbsp;" + seconds + " s"; 
    if (t < 0) { 
        clearInterval(x); 
        document.getElementById("countdown").innerHTML = "Visit https://www.iamglobalcitizen.com.au"; 
    } 
}, 1000); 


