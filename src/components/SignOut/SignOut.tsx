import classes from './SignOut.module.scss';
import {Auth} from "@firebase/auth";
import {getAuth, signOut} from "firebase/auth";
import {useContext} from "react";
import {SnapshotSubscriberContext} from "common/contexts";

export default function SignOut() {
  const auth: Auth = getAuth();
  let {subscriptions} = useContext(SnapshotSubscriberContext);

  const handleSignOut = async (): Promise<void> => {
    subscriptions.forEach((unsubscribe: any) => unsubscribe());
    await signOut(auth)
  };

  return auth.currentUser && (
    <button type="button" className={classes.btn} onClick={handleSignOut}>
      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-logout" width="24" height="24"
           viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
           strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
        <path d="M7 12h14l-3 -3m0 6l3 -3"></path>
      </svg>
    </button>
  );
}