import {Unsubscribe} from "@firebase/auth";

export interface SnapshotSubscriberContextInterface {
  subscriptions: Array<Unsubscribe>;
  setSubscriptions: Function;
}