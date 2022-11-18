import "react";
import classes from './App.module.scss';
import {useAuthState} from "react-firebase-hooks/auth";
import SignIn from "components/SignIn";
import { auth } from "common/constants";


export default function App() {

  const [user] = useAuthState(auth);
  console.log(user)

  return (
    <div>
      {/* TODO */}
      <header/>

      <section>
        {user ? <>signed in</> : <SignIn/>}
      </section>
    </div>
  )
}
