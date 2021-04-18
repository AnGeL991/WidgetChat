import { useState } from "react";

export const useToggleLogic = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen((prev) => !prev);

  return { open, handleToggle };
};
