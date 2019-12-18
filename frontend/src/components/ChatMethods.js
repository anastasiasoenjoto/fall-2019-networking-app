import Chatkit from '@pusher/chatkit-client';
import axios from 'axios';

function handleInput(event) {
  const { value, name } = event.target;

  this.setState({
    [name]: value,
  });
}

function connectToRoom(id = 'f5ec86f1-d2c7-44f3-8ed3-32f200e04133') {
  const { currentUser } = this.state;

  this.setState({
    messages: [],
  });

  return currentUser
  .subscribeToRoom({
    roomId: `${id}`,
    messageLimit: 100,
    hooks: {
      onMessage: message => {
        this.setState({
          messages: [...this.state.messages, message],
        });
      },
      onPresenceChanged: () => {
        const { currentRoom } = this.state;
        this.setState({
          roomUsers: currentRoom.users.sort(a => {
            if (a.presence.state === 'online') return -1;

            return 1;
          }),
        });
      },
    },
  })
  .then(currentRoom => {
    const roomName =
      currentRoom.customData && currentRoom.customData.isDirectMessage
        ? currentRoom.customData.userIds.filter(
            id => id !== currentUser.id
          )[0]
        : currentRoom.name;

    this.setState({
      currentRoom,
      roomUsers: currentRoom.users,
      rooms: currentUser.rooms,
      roomName,
    });
  })
  .catch(console.error);
}

function connectToChatkit(event) {
  event.preventDefault();

  const { userId } = this.state;

  if (userId === null || userId.trim() === '') {
    alert('Invalid userId');
    return;
  }

  axios
    .post('http://localhost:3001/chatUsers', { userId })
    .then(() => {
      const tokenProvider = new Chatkit.TokenProvider({
        url: 'http://localhost:3001/chatAuthenticate',
      });

      const chatManager = new Chatkit.ChatManager({
        instanceLocator: 'v1:us1:51ce7520-0dcf-4a08-87e2-018408ae7fe7',
        userId,
        tokenProvider,
      });

      return chatManager
        .connect({
          onAddedToRoom: room => {
            const { rooms } = this.state;
            this.setState({
              rooms: [...rooms, room],
            });
          },
        })
        .then(currentUser => {
          this.setState(
            {
              currentUser,
              showLogin: false,
              rooms: currentUser.rooms,
            },
            () => connectToRoom.call(this)
          );
        });
    })
    .catch(console.error);
}

function sendMessage(event) {
  event.preventDefault();
  const { newMessage, currentUser, currentRoom } = this.state;

  if (newMessage.trim() === '') return;

  currentUser.sendMessage({
    text: newMessage,
    roomId: `${currentRoom.id}`,
  });

  this.setState({
    newMessage: '',
  });
}

export { handleInput, connectToRoom, connectToChatkit, sendMessage }
