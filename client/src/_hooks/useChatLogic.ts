/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, ChangeEvent } from "react";
import { socket } from "_socket";
import { useStateLogic } from "_hooks";
import { chatAction, IConversation } from "store/chat";
import { ActionChatInDB } from "./utils";

export const useChatLogic = () => {
  const today = new Date();
  const { setConversation } = chatAction;
  const [message, setMessage] = useState("");
  const { onSubmit, conversation } = useStateLogic();
  const addConversation = (conversation: IConversation[]) =>
    onSubmit(setConversation, [conversation]);

  const handleSetMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  };

  const sendMessage = () => {
    setMessage("");
    const conversation = {
      client: true,
      message: message,
      time: today.getTime(),
    };

    if (message) {
      socket.emit("message", message, socket.id);
      ActionChatInDB(conversation);
      addConversation([conversation]);
    }
  };
  useEffect(() => {
    if (conversation.length === 0) {
      const conversat = {
        client: false,
        message: "Hello, how can i help you?",
        time: today.getTime(),
      };
      addConversation([conversat]);
    }
  }, [conversation]);

  useEffect(() => {
    socket.on("response", (msg: string) => {
      const conversation = {
        client: false,
        message: msg,
        time: today.getTime(),
      };
      ActionChatInDB(conversation);
      addConversation([conversation]);
    });
  }, [socket]);

  return {
    message,
    sendMessage,
    handleSetMessage,
    addConversation,
  };
};
