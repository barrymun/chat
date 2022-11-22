import classes from './App.module.scss';
import React, {Suspense} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {Auth} from "@firebase/auth";
import {getAuth} from "firebase/auth";
import {SnapshotSubscriberContext} from "common/contexts";

// regular component imports
import Header from "components/Header";
import Fallback from "components/Fallback";

// code splitting for better performance using lazy imports
const SignIn = React.lazy(() => import("components/SignIn"));
const ChatRoom = React.lazy(() => import("components/Chat/ChatRoom"));

export default function App() {

  const auth: Auth = getAuth();
  const [user] = useAuthState(auth);
  let [subscriptions, setSubscriptions] = React.useState<Array<any>>([])

  return (
    <SnapshotSubscriberContext.Provider value={{subscriptions, setSubscriptions}}>
      <section>
        {user ? <Header photoURL={user.photoURL!}/> : null}
      </section>

      <section>
        {user
          ? <Suspense fallback={<Fallback/>}><ChatRoom/></Suspense>
          : <Suspense fallback={<Fallback/>}><SignIn/></Suspense>
        }
      </section>
    </SnapshotSubscriberContext.Provider>
  )
}
