window.onload = function(){
    var chatbutton = document.getElementById("newchat");
    var namebox = document.getElementById("name");
    chatbutton.addEventListener("click", function(event) {
         event.preventDefault();
         name = namebox.value;
         window.location.href = chatbutton.href + "/" + name;
         sessionStorage.removeItem("otheruser");
           
    });
    
}