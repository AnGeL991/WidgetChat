import { useEffect, useRef, FC } from "react";
import { useStateLogic } from "_hooks";

export const ScrollToBottom: FC = () => {
  const { conversation } = useStateLogic();
  const divRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  return <div ref={divRef} />;
};
