import { FC } from "react";
import TelegramSVG from "telegram.svg";
import { useMessageLogic } from "_hooks";

interface ITelegramButton {
  onClick: () => void;
  open: boolean;
}

export const TelegramButton: FC<ITelegramButton> = ({ onClick, open }) => {
  const { count, newMessage } = useMessageLogic(open);
  return (
    <div className="telegram" {...{ onClick }}>
      <span
        className={`telegram__circle ${
          newMessage && "telegram__circle--active"
        }`}
      >
        {count}
      </span>
      <img src={TelegramSVG} alt="TelegramButton" />
      <div
        className={`telegram__message  ${
          newMessage && "telegram__message--active"
        }`}
      >
        New message!
      </div>
    </div>
  );
};
