import classes from './App.module.scss';
import React from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import Header from "components/Header";
import SignIn from "components/SignIn";
import ChatRoom from "components/Chat/ChatRoom";
import {Auth} from "@firebase/auth";
import {getAuth} from "firebase/auth";
import { SnapshotSubscriberContext } from 'common/contexts';

export default function App() {

  const auth: Auth = getAuth();
  const [user] = useAuthState(auth);
  let [subscriptions, setSubscriptions] = React.useState([])

  return (
    <SnapshotSubscriberContext.Provider value={{subscriptions, setSubscriptions}}>
      <section>
        {user ? <Header photoURL={user.photoURL!}/> : null}
      </section>

      <section>
        {user ? <ChatRoom/> : <SignIn/>}
      </section>
    </SnapshotSubscriberContext.Provider>
  )
}
