import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";

const SSOCallbackScreen = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return <Redirect href={"/(tabs)/list"} />;
  }

};

export default SSOCallbackScreen;