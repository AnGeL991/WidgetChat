import { FC } from "react";
import { FiSend } from "react-icons/fi";
import { useChatLogic } from "_hooks";

export const SendField: FC = () => {
  const { message, sendMessage, handleSetMessage } = useChatLogic();

  return (
    <div className="send">
      <input
        className="send__input"
        type="text"
        placeholder="Send message..."
        value={message}
        onChange={handleSetMessage}
      />
      <FiSend className="send__icon" onClick={sendMessage} />
    </div>
  );
};
