import "react";
import classes from './App.module.scss';
import {useAuthState} from "react-firebase-hooks/auth";
import { auth } from "common/constants";
import SignIn from "components/SignIn";
import ChatRoom from "components/ChatRoom";

export default function App() {

  const [user] = useAuthState(auth);
  console.log(user)

  return (
    <div>
      {/* TODO */}
      <header/>

      <section>
        {user ? <ChatRoom/> : <SignIn/>}
      </section>
    </div>
  )
}
