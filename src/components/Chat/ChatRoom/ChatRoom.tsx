import classes from "./ChatRoom.module.scss";
import React, {ChangeEvent, FormEvent, useContext, useEffect, useRef, useState} from "react";
import {addDoc, collection, getFirestore, limit, onSnapshot, orderBy, query, Timestamp} from "firebase/firestore";
import {CollectionReference, Firestore, Query} from "@firebase/firestore"
import Filter from "bad-words";
import {COLLECTION_MESSAGE, DOCUMENTS_LIMIT, ORDER_BY_FIELD_PATH_DEFAULT} from "common/constants";
import ChatMessage from "components/Chat/ChatMessage";
import {Auth} from "@firebase/auth";
import {getAuth} from "firebase/auth";
import {SnapshotSubscriberContext} from "common/contexts";

const filter: Filter = new Filter({placeHolder: '*'});  // profanity will be replaced with stars

export default function ChatRoom() {

  const auth: Auth = getAuth();
  const firestore: Firestore = getFirestore();
  let { subscriptions, setSubscriptions } = useContext(SnapshotSubscriberContext)

  const scrollRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Array<any>>([]);  // TODO: change "any"
  const [mostRecentMessageId, setMostRecentMessageId] = useState<string>("");
  const [formMessage, setFormMessage] = useState<string>('');
  const messagesRef: CollectionReference = collection(firestore, COLLECTION_MESSAGE);
  // get the most recent messages given the limit
  const q: Query = query(messagesRef, orderBy(ORDER_BY_FIELD_PATH_DEFAULT, "desc"), limit(DOCUMENTS_LIMIT));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let messages: Array<any> = [];
    querySnapshot.forEach((doc) =>
      messages = [{...doc.data(), id: doc.id}, ...messages]);
    setMessages(messages);
  });

  useEffect(() => {
    setSubscriptions([...subscriptions, unsubscribe]);
  }, []);

  useEffect(() => {
    if (messages.length === 0 || messages[0].id === mostRecentMessageId) return;  // only permit checks on new messages
    scrollRef.current!.scrollIntoView();
    setMostRecentMessageId(messages[0].id);
  }, [messages]);

  // const getMessages = async (): Promise<void> => {
  //   let messages: Array<any> = [];
  //   const querySnapshot: QuerySnapshot = await getDocs(q);
  //   // ensure to reverse the messages so that they appear correctly on the page
  //   querySnapshot.forEach((doc) =>
  //     messages = [{...doc.data(), id: doc.id}, ...messages]);
  //   setMessages(messages);
  // };

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();

    // reset the form value to an empty string instantly for a "snappier" chat feeling
    setFormMessage('');

    // TODO: add another boolean value to disable button use if a message hasn't been created yet?

    // clean the message of profanity and send the message
    const cleanedText: string = filter.clean(formMessage);
    const docData: object = {
      uid: auth.currentUser?.uid,
      text: cleanedText,
      createdAt: Timestamp.now(),
    };
    addDoc(messagesRef, docData);
    scrollRef.current!.scrollIntoView();
  };

  return <>

    <main>
      <div className={classes.messages}>
        {messages.map((message, index) => <ChatMessage key={index} message={message}/>)}
      </div>

      <div ref={scrollRef}/>
    </main>

    <form className={classes.form} onSubmit={sendMessage}>
      <input className={classes.formInput} autoFocus value={formMessage}
             onChange={(e: ChangeEvent<HTMLInputElement>) => setFormMessage(e.target.value)}/>
      <button className={classes.formBtn} disabled={formMessage === ''} type="submit">Send</button>
    </form>
  </>;
}