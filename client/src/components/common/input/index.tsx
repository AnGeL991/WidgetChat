import { FC } from "react";
import { FiSend } from "react-icons/fi";
import { useChatLogic } from "_hooks";

export const SendField: FC = () => {
  const { message, sendMessage, handleSetMessage,onKey } = useChatLogic();

  return (
    <div className="send">
      <input
        className="send__input"
        type="text"
        placeholder="Send message..."
        value={message}
        onChange={handleSetMessage}
        onKeyPress={onKey}
      />
      <FiSend className="send__icon" onClick={sendMessage} />
    </div>
  );
};
