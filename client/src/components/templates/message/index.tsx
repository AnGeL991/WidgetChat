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
        src="https://scontent-frx5-1.xx.fbcdn.net/v/t31.18172-8/17504333_1947328018822736_4971666958044418282_o.jpg?_nc_cat=110&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=tbhaoX8JARcAX8mhbUY&_nc_ht=scontent-frx5-1.xx&oh=70926f017701f5a96b1a6a9a544b6bb8&oe=609A9CB8"
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
