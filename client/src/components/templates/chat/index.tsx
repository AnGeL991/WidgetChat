import { FC } from "react";
import { ContentChat } from "components/templates";
import { HeaderChat, SendField } from "components/common";

import "components/style/style.scss";

export const Chat: FC = () => {
  return (
    <>
      <div className={`widget `}>
        <HeaderChat />
        <ContentChat />
        <SendField />
      </div>
    </>
  );
};
