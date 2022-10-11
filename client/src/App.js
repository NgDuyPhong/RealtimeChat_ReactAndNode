import "./App.css";
import io from "socket.io-client";
import _ from "lodash";
import { useState } from "react";
import Chat from "./Chat";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

function App() {
  const socket = io.connect("http://localhost:3001");
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [isShowChat, setShowChat] = useState(false);
  const [idUserChat, setIdUserChat] = useState("");

  const joinRoom = () => {
    if (_.isEmpty(userName) || _.isEmpty(room)) return;
    socket.emit("join_room", room);
    setIdUserChat(`${userName}_${room}_${new Date().getTime()}`);
    setShowChat(true);
  };
  return (
    <div className="App">
      <div className={`container ${isShowChat && "d-none"}`}>
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
              <h3 className="mt-5">Join A Chat</h3>
              <div className="d-flex justify-content-end social_icon">
                <span>
                  <i className="fa fa-facebook-square"></i>
                </span>
                <span>
                  <i className="fa fa-google-plus-square"></i>
                </span>
                <span>
                  <i className="fa fa-twitter-square"></i>
                </span>
              </div>
            </div>
            <div className="card-body">
              <form>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-user"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Input your name..."
                    onChange={(event) => {
                      setUserName(event.target.value);
                    }}
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-comments-o"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Input RoomID..."
                    onChange={(event) => {
                      setRoom(event.target.value);
                    }}
                  />
                </div>
                <div className="row align-items-center remember">
                  <input type="checkbox" />
                  Remember Me
                </div>
                <div className="form-group">
                  <button
                    type="button"
                    className="btn float-right login_btn"
                    onClick={joinRoom}
                  >
                    Join
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center links">
                Don't have an account?<a href="/#">Sign Up</a>
              </div>
              <div className="d-flex justify-content-center">
                <a href="/#">Forgot your Room?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {isShowChat && ( */}
      <div className={`${!isShowChat && "d-none"} chat-room`}>
        <Chat
          socket={socket}
          username={userName}
          room={room}
          idUser={idUserChat}
        />
      </div>
      {/* )} */}

      {/* <h3>Join a chat</h3>
      <input
        type="text"
        placeholder="Input your name..."
        onChange={(event) => {
          setUserName(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Input RoomID..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}>Join</button> */}
    </div>
  );
}

export default App;
