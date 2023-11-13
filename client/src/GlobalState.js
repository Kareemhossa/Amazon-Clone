import { useEffect } from "react";
//React Router and Redux
import {
  useDispatch,
  //  useSelector
} from "react-redux";
import { loginUser, setLoading } from "./Redux/userSlice";
// Firebase Func
import { auth } from "./FireBase/firebase";

//handle the user registration and login and add to redux
export const useGlobalState = () => {
  // const user = useSelector((state) => state.user.user);
  // console.log(user?.name);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          loginUser({
            uid: authUser.uid,
            name: authUser.displayName,
            email: authUser.email,
          })
        );
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    });

    return unsubscribe;
  }, [dispatch]);
};

export const GB_CURRENCY = Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
