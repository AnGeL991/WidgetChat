import { FC } from "react";
import { Message } from "components/templates";
import { useStateLogic } from "_hooks";
export const ContentChat: FC = () => {
  const { conversation } = useStateLogic();
  console.log(conversation);
  const message = conversation.map((el,index) => (
    <Message key={index} message={[el.message]} client={el.client} />
  ));

  return (
    <div className="widget__body">
      <div className="message__time">
        <span>Today</span>
      </div>
      {message}
    </div>
  );
};
