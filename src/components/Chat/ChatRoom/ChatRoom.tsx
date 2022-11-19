import classes from "./ChatRoom.module.scss";
import React, {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import {addDoc, collection, limit, onSnapshot, orderBy, query, Timestamp} from "firebase/firestore";
import {CollectionReference, Query} from "@firebase/firestore"
import {auth, COLLECTION_MESSAGE, DOCUMENTS_LIMIT, firestore, ORDER_BY_FIELD_PATH_DEFAULT} from "common/constants";
import SignOut from "components/SignOut";
import ChatMessage from "components/Chat/ChatMessage";

export default function ChatRoom() {

  const scrollRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Array<any>>([]);  // TODO: change "any"
  const [isFirstRender, setIsFirstRender] = useState<boolean>(false);
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
    // if (isFirstRender) return;
    scrollRef.current!.scrollIntoView();
    setIsFirstRender(true);
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
    setFormMessage('');
    // TODO: add another boolean value to disable button use if a message hasn't been created yet?
    const docData: object = {
      uid: auth.currentUser?.uid,
      text: formMessage,
      createdAt: Timestamp.now(),
    };
    addDoc(messagesRef, docData);
    scrollRef.current!.scrollIntoView();
  };

  return <>
    <SignOut/>

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