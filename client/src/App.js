import "./App.css";
import io from "socket.io-client";
import _ from "lodash";
import { useState } from "react";
// import Chat from "./Chat";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

function App() {
  const socket = io.connect("http://localhost:3001");
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (_.isEmpty(userName) || _.isEmpty(room)) return;
    socket.emit("join_room", room);
  };
  return (
    <div className="App">
      <div class="container">
        <div class="d-flex justify-content-center h-100">
          <div class="card">
            <div class="card-header">
              <h3 className="mt-5">Join A Chat</h3>
              <div class="d-flex justify-content-end social_icon">
                <span>
                  <i class="fa fa-facebook-square"></i>
                </span>
                <span>
                  <i class="fa fa-google-plus-square"></i>
                </span>
                <span>
                  <i class="fa fa-twitter-square"></i>
                </span>
              </div>
            </div>
            <div class="card-body">
              <form>
                <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fa fa-user"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Input your name..."
                    onChange={(event) => {
                      setUserName(event.target.value);
                    }}
                  />
                </div>
                <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fa fa-comments-o"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Input RoomID..."
                    onChange={(event) => {
                      setRoom(event.target.value);
                    }}
                  />
                </div>
                <div class="row align-items-center remember">
                  <input type="checkbox" />
                  Remember Me
                </div>
                <div class="form-group">
                  <input
                    type="submit"
                    value="Join"
                    class="btn float-right login_btn"
                    onClick={joinRoom}
                  />
                </div>
              </form>
            </div>
            <div class="card-footer">
              <div class="d-flex justify-content-center links">
                Don't have an account?<a href="/#">Sign Up</a>
              </div>
              <div class="d-flex justify-content-center">
                <a href="/#">Forgot your password?</a>
              </div>
            </div>
          </div>
        </div>
      </div>

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
      {/* <Chat socket={socket} username={userName} room={room} /> */}
    </div>
  );
}

export default App;
