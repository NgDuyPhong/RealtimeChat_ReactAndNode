import _ from "lodash";
import React, { useEffect, useState } from "react";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");

  const sendMessage = async () => {
    if (_.isEmpty(currentMessage)) return;
    const date = new Date(Date.now());
    const messageData = {
      room: room,
      author: username,
      message: currentMessage,
      time: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
    };
    await socket.emit("send_message", messageData);
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("Receive message: ", data);
    });
  }, [socket]);

  return (
    <div>
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body"></div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Input something..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
