import classes from "./ChatMessage.module.scss";
import { auth } from "common/constants";

interface CreatedAt {
  nanoseconds: number;
  seconds: number;
}

interface Message {
  id: string;
  uid: string;
  text: string;
  createdAt: CreatedAt;
}

interface Props {
  message: Message;  // TODO:
}

export default function ChatMessage({message}: Props) {
  const {id, uid, text, createdAt} = message;
  const messageClass: string = uid === auth.currentUser?.uid ? 'sent' : 'received';

  return <>
    <div className={`${classes.message} ${classes[messageClass]}`}>
      {text}
    </div>
  </>;
}