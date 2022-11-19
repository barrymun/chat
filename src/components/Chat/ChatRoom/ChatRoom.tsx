import classes from "./ChatRoom.module.scss";
import {useEffect, useState} from "react";
import {collection, query, getDocs, orderBy, limit} from "firebase/firestore";
import {CollectionReference, Query, QuerySnapshot} from "@firebase/firestore"
import {firestore, DOCUMENTS_LIMIT, COLLECTION_MESSAGE, ORDER_BY_FIELD_PATH_DEFAULT} from "common/constants";
import SignOut from "components/SignOut";
import ChatMessage from "components/Chat/ChatMessage";

export default function ChatRoom() {

  const [messages, setMessages] = useState<Array<any>>([]);  // TODO: change "any"
  const messagesRef: CollectionReference = collection(firestore, COLLECTION_MESSAGE);
  // get the most recent messages given the limit
  const q: Query = query(messagesRef, orderBy(ORDER_BY_FIELD_PATH_DEFAULT, "desc"), limit(DOCUMENTS_LIMIT));

  useEffect(() => {
    async function fetch() {
      let messages: Array<any> = [];
      const querySnapshot: QuerySnapshot = await getDocs(q);
      // ensure to reverse the messages so that they appear correctly on the page
      querySnapshot.forEach((doc) =>
        messages = [{...doc.data(), id: doc.id}, ...messages]);
      setMessages(messages);
      console.log(messages)
    }

    fetch();
  }, []);

  return <>
    <SignOut/>

    <div className={classes.messages}>
      {messages.map((message, index) => <ChatMessage key={index} message={message}/>)}
    </div>
  </>;
}