import _, { uniqueId } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import userProfile from "./asset/img/user-profile.png";

function Chat({ socket, username, room, idUser }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [reload, setReload] = useState(0);
  const refInputChat = useRef();
  const refContentMessage = useRef();

  const sendMessage = async () => {
    if (_.isEmpty(currentMessage?.replaceAll(" ", ""))) return;
    const date = new Date(Date.now());
    const messageData = {
      idUser: idUser,
      room: room,
      author: username,
      message: currentMessage,
      time: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
    };
    // messages.push(messageData);
    await socket.emit("send_message", messageData);
    setCurrentMessage("");
  };

  useEffect(() => {
    const listener = (data) => {
      // console.log(data);
      // if (idUser === data.idUser) return;
      messages.push(data);
      setMessages(messages);
      console.log("Receive message: ", data);
      setReload(uniqueId());
      refInputChat.current.focus();
    };
    socket.on("receive_message", listener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    if (refContentMessage) {
      console.log(refContentMessage);
      refContentMessage.current.scroll({
        top: 10000,
      });
    }
  }, [messages.length]);

  return (
    <div className="container">
      <div className="chat-header">
        <h3 className="heading text-center">Live Chat: {room}</h3>
      </div>
      <div className="chat-body" id="id-chat-body">
        <div className="messaging">
          <div className="inbox_msg">
            <div className="mesgs">
              <div className="msg_history" key={reload} ref={refContentMessage}>
                {messages?.map((mess, index) => {
                  if (mess.idUser === idUser) {
                    return (
                      <div className="outgoing_msg mr-3" key={index}>
                        <div className="sent_msg">
                          <p>{mess.message}</p>
                          <span className="time_date"> {mess.time}</span>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div className="incoming_msg" key={index}>
                      <div className="incoming_msg_img">
                        <img src={userProfile} alt="sunil" />
                      </div>
                      <div className="received_msg">
                        <div className="received_withd_msg">
                          <b className="author">{mess.author}</b>
                          <p>{mess.message}</p>
                          <span className="time_date"> {mess.time}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="chat-footer mt-3">
        <input
          className="text-chat"
          type="text"
          ref={refInputChat}
          placeholder="Input something..."
          value={currentMessage}
          autoFocus
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button className="btn-send" type="button" onClick={sendMessage}>
          <i className="fa fa-paper-plane icon-send" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}

export default Chat;
