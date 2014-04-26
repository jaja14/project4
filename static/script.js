var onClose = function() {
 alert("connection lost try to refresh");
  }

var onError = function() {
 alert("we have an error"); 
}

var onMessage = function(message) {
//  themessage = JSON.stringify(message);
  console.log("we have a message: " + message.data);
  chatbox = document.getElementById("chat");
  var otheruser = sessionStorage.otheruser;  
  chatbox.innerHTML += "<p><b>" + otheruser + "</b>: " + message.data + "</p>";
}
var onOpened = function() {
  //figure out otherusername

 if (sessionStorage.otheruser)
  {
     // nothing to do
     // 
  }
  else 
      {
          // if not set then prompt
          sessionStorage.otheruser = prompt("enter the other person's nickname");
      }
    var currentuser = location.href.split('/').reverse()[0];
    var roomid = document.getElementById("roomid").innerHTML;
    var otheruser = sessionStorage.otheruser;
    var otheruserbox = document.getElementById("otheruser");
    otheruserbox.innerHTML = otheruser;
    var chatform = document.getElementById("chatform");
    if (chatform){
            chatform.addEventListener("submit", function(event) {
              event.preventDefault();
             // update the chatroom
             messagebox = document.getElementById("message");
                
             // send a message using ajax to the server 
             sendMessage(otheruser,roomid,messagebox.value);
             
             chatbox = document.getElementById("chat");
             chatbox.innerHTML += "<p><b>" + currentuser + "</b>: " + messagebox.value + "</p>";
             // reset messagebox
             messagebox.value = "";
            });
        
    }
       }
                          
// function used to send messages to the server
// these are then sent to the other user via
// the channel api, look for the /sendmessage route
// in the main.py file
var sendMessage = function(name,roomid,message) {
var xhr = new XMLHttpRequest();
  xhr.open('POST', '/sendmessage/' + name + '/' + roomid, true);
  xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhr.send("message="+message);
};
