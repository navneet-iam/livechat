const socket = io('https://shielded-wildwood-47849.herokuapp.com/');

// take DOM element in respective JS variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')

const messageContainer = document.querySelector(".container")

var audio = new Audio('sound.mp3');

// this is a function to append event info to the container
const append = (message, position)=>{
    // create an empty element in the div
    const messageElement = document.createElement('div');
    // fill the innertext of element with the message received
    messageElement.innerText = message;
    // add the message css in that div
    messageElement.classList.add('message');
    // locating the position using left or right css
    messageElement.classList.add(position);
    // append the message element in the container
    // The Element.append() method inserts a set of Node objects or DOMString objects after the last child of the Element.
    messageContainer.append(messageElement);
    if (position=='left'){
        audio.play();
    }
}

// if form is getting submitted, send message to the server
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})

// ask name of the new user and let the server know
const naam = prompt("enter your name to join chat");
socket.emit('new-user-joined', naam);

socket.on('user-joined', naam =>{
    append(`${naam} joined the chat`, 'left');
})

socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left');
})

socket.on('left', naam =>{
    append(`${naam} left the chat`, 'left');
})