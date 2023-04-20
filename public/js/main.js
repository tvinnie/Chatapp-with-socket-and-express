const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

//Get username and room from URL
const { username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})


const socket = io();


// Join chatroom
socket.emit('joinRoom',{ username, room});


//Message from server
socket.on('message', message => {
    console.log(message)
    outputMessage(message);

    //Scroll down auto
    chatMessages.scrollTop = chatMessages.scrollHeight;
})


//Message submit on form
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //Get message text input
    const msg = e.target.elements.msg.value;

    //Emiting a message to the server
    socket.emit('chatMessage', msg);

    // Clear input on the input field
    e.target.elements.msg.value = ''
    e.target.elements.msg.focus();
})

//Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `
    <p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">${message.text}</p>
    `;
    document.querySelector('.chat-messages').appendChild(div);
}