import React from "react";
import "./MessageBoxStyle.css";

function MessageBox({ message }) {
  if (!message) return null;

  return <p className={`message-box ${message.type}`}>{message.text}</p>;
}

export default MessageBox;
