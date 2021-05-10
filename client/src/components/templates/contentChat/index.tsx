import { FC, useMemo } from "react";
import { ScrollToBottom } from "components/common";
import { Message } from "components/templates";
import { useStateLogic } from "_hooks";

export const ContentChat: FC = () => {
  const { conversation } = useStateLogic();

  const message = useMemo(
    () =>
      conversation.map((el, index) => {
        return (
          <Message
            key={index}
            {...{ message: [el.message], client: el.client, time: el.time }}
          />
        );
      }),
    [conversation]
  );

  return (
    <div className="widget__body">
      <div className="message__time">
        <span>Today</span>
      </div>
      {message}
      <ScrollToBottom />
    </div>
  );
};
