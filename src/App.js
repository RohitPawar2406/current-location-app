import React from 'react'
var W3CWebSocket = require('websocket').w3cwebsocket;

const App = () => {
const onClick = () => {
var client = new W3CWebSocket('ws://localhost:8000/', 'echo-protocol');

client.onerror = function() {
    console.log('Connection Error');
};

client.onopen = function() {
    console.log('WebSocket Client Connected');

    function sendNumber() {
        if (client.readyState === client.OPEN) {
          navigator.geolocation.getCurrentPosition(function(position) {
            client.send(JSON.stringify({
              lat: position.coords.latitude,
              lng: position.coords.longitude 
            }));
            setTimeout(sendNumber, 2000);
          });
        }
    }
    sendNumber();
};

client.onclose = function() {
    console.log('echo-protocol Client Closed');
};

client.onmessage = function(e) {
    if (typeof e.data === 'string') {
        console.log("Received: '" + e.data + "'");
    }
};}

  return (
    <div>
      <button onClick={onClick} >Click to send location</button>
    </div>
  )
}

export default App;
