import classes from "./ChatMessage.module.scss";
import {Auth} from "@firebase/auth";
import {getAuth} from "firebase/auth";
import {Message} from "common/interfaces";

interface Props {
  message: Message;
}

export default function ChatMessage({message}: Props) {
  const auth: Auth = getAuth();
  const {id, uid, text, createdAt} = message;
  const createdAtClass: string = uid === auth.currentUser?.uid ? 'sentTs' : 'receivedTs';
  const messageClass: string = uid === auth.currentUser?.uid ? 'sent' : 'received';

  /**
   * returns the HH:MM that the message was sent
   * TODO: look into using the moment.js library for more comprehensive time AND date display
   * @param seconds
   */
  const getTimeSent = (seconds: number): string => new Date(seconds * 1000).toISOString().substring(11, 16);

  return <>
    <span className={`${classes.createdAt} ${classes[createdAtClass]}`}>
      {getTimeSent(createdAt.seconds)}
    </span>
    <span className={`${classes.message} ${classes[messageClass]}`}>
      {text}
    </span>
  </>;
}