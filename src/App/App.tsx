import classes from './App.module.scss';
import {useAuthState} from "react-firebase-hooks/auth";
import Header from "components/Header";
import SignIn from "components/SignIn";
import ChatRoom from "components/Chat/ChatRoom";
import {Auth} from "@firebase/auth";
import {getAuth} from "firebase/auth";

export default function App() {

  const auth: Auth = getAuth();
  const [user] = useAuthState(auth);

  return (
    <div>
      <section>
        {user ? <Header photoURL={user.photoURL!}/> : null}
      </section>

      <section>
        {user ? <ChatRoom/> : <SignIn/>}
      </section>
    </div>
  )
}
