import React, { useEffect } from "react";
import { connect } from "react-redux";
import socketIOClient from "socket.io-client";
import { setCharacters } from "../../actions";
const HOST = "http://192.168.1.5:8000/";

const Socket = ({ character, setCharacters }) => {
  useEffect(() => {

    const socket = socketIOClient(HOST);
    console.log("conecting....");

    socket.on("connect", () => {
      console.log("connected!!!");
      socket.emit("addCharacter", character);
      socket.on("charactersNotify", (characters) => {
          console.log("characters>>>>", characters);
        setCharacters(characters);
      });
    });


  }, []);

  return <></>;
};

const mapStateToProps = (state) => {
  return {
    character: state.character,
  };
};

const mapDispatchToProps = {
  setCharacters,
};

export default connect(mapStateToProps, mapDispatchToProps)(Socket);
