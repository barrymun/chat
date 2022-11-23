import {Unsubscribe} from "@firebase/auth";

export interface SnapshotSubscriberContextInterface {
  subscriptions: Array<Unsubscribe>;
  setSubscriptions: Function;
}

interface CreatedAt {
  nanoseconds: number;
  seconds: number;
}

export interface Message {
  id: string;
  uid: string;
  text: string;
  createdAt: CreatedAt;
}