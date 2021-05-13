/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, ChangeEvent, KeyboardEventHandler } from "react";
import { socket } from "_socket";
import { useStateLogic } from "_hooks";
import { chatAction, IConversation } from "store/chat";
import { ActionChatInDB } from "./utils";

export const useChatLogic = () => {
  const time = new Date()
    .toTimeString()
    .replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");

  const { setConversation } = chatAction;
  const [message, setMessage] = useState("");
  const { onSubmit, conversation, loading } = useStateLogic();

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
      time,
    };

    if (message) {
      socket.emit("message", message, socket.id);
      ActionChatInDB(conversation);
      addConversation([conversation]);
    }
  };
  const onKey: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };
  useEffect(() => {
    setTimeout(() => {
      if (conversation.length === 0 && !loading) {
        const conversat = {
          client: false,
          message: "Hello, how can i help you?",
          time,
          readed: true,
        };
        addConversation([conversat]);
      }
    }, 400);
  }, [conversation, loading]);

  useEffect(() => {
    socket.on("response", (msg: string) => {
      const conversation = {
        client: false,
        message: msg,
        time: new Date()
          .toTimeString()
          .replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1"),
        readed: false,
      };
      window.parent.postMessage(
        { type: "Conversation", payload: { conversation } },
        "*"
      );
      ActionChatInDB(conversation);
      addConversation([conversation]);
    });
  }, [socket]);

  return {
    message,
    sendMessage,
    handleSetMessage,
    addConversation,
    onKey,
  };
};
