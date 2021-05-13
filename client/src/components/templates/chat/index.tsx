import { FC } from "react";
import { ContentChat } from "components/templates";
import { HeaderChat, SendField } from "components/common";
import "components/style/style.scss";

export const Chat: FC = () => {
  return (
    <>
      <div className={`widget`}>
        <div className={`widget__wrapper  `}>
          <HeaderChat />
          <ContentChat />
          <SendField />
        </div>
      </div>
    </>
  );
};
