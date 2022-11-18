import "react";
import classes from './App.module.scss';
import {useAuthState} from "react-firebase-hooks/auth";
import { auth } from "common/constants";
import SignIn from "components/SignIn";
import ChatLog from "components/ChatLog";

export default function App() {

  const [user] = useAuthState(auth);
  console.log(user)

  return (
    <div>
      {/* TODO */}
      <header/>

      <section>
        {user ? <ChatLog/> : <SignIn/>}
      </section>
    </div>
  )
}
