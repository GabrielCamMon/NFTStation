import useStore from "./userStore";

export const user = useStore((state) => state.userMetaMask);

export const getUserAction = async () => {
  const getUser = useStore((state) => state.getUserMetaMask);
};
