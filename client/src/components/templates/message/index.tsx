import { FC } from "react";

interface IMessage {
  message: Array<string>;
  client?: boolean;
  time: string;
}

export const Message: FC<IMessage> = ({ message, client, time }) => {
  const messageTime = time.split("", 5);
  const content = message.map((el, index) => (
    <p
      key={index}
      className={`message__context ${client && "message__context--client"}`}
    >
      {el}
      <span
        className={`message__sendTime ${client ? "message__sendTime--left":'message__sendTime--right'}`}
      >
        {messageTime}
      </span>
    </p>
  ));

  return (
    <div
      className={`message 
    ${client && "message--client"}
    `}
    >
      <img
        src="image/User.png"
        alt="support"
        className={`message__img ${client && "message__img--client"}`}
      />
      <div
        className={`message__wrapper ${client && "message__wrapper--client"}`}
      >
        {content}
      </div>
    </div>
  );
};
