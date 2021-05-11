/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useStateLogic } from "./useStateLogic";
import { chatAction } from "store/chat";

export const useMessageLogic = (open: boolean) => {
  const { onSubmit } = useStateLogic();
  const { conversation } = useStateLogic();
  const [newMessage, setNewMessage] = useState(false);
  const count = conversation.filter((el) => el.readed === false).length;

  const messageHendler = (open: boolean, count: number) => {
    if (!open && count !== 0) {
      setNewMessage(true);
    }
    if (open) {
      setNewMessage(false);
    }
  };

  useEffect(() => {
    if (open && count !== 0) {
      onSubmit(chatAction.setReadedMessage, []);
    }
  }, [open, count]);

  useEffect(() => {
    messageHendler(open, count);
  }, [open, count]);

  return { count, newMessage };
};
