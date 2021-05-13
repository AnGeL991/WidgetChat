import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "store";

export const useStateLogic = () => {
  const dispatch = useDispatch();

  const onSubmit = (action: any, props: any) => {
    dispatch(action(...props));
  };
  const { conversation, loading } = useSelector(
    (state: ApplicationState) => state.chat
  );

  return { onSubmit, conversation, loading };
};
