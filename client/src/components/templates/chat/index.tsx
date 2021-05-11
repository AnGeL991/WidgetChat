import { FC } from "react";
import { ContentChat, TelegramButton } from "components/templates";
import { HeaderChat, SendField } from "components/common";
import { useToggleLogic } from "_hooks";
import "components/style/style.scss";

export const Chat: FC = () => {
  const { handleToggle, open } = useToggleLogic();
  return (
    <>
      <div className={`widget ${open && "widget--active"}`}>
        <div
          className={`widget__wrapper ${open && "widget__wrapper--active"} `}
        >
          <HeaderChat />
          <ContentChat />
          <SendField />
        </div>
      </div>
      <TelegramButton {...{ open, onClick: handleToggle }} />
    </>
  );
};
