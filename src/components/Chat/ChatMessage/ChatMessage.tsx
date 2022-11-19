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