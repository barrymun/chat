import React from "react";
import {SnapshotSubscriberContextInterface} from "common/interfaces";

export const SnapshotSubscriberContext = React.createContext<SnapshotSubscriberContextInterface>({
  subscriptions: [],
  setSubscriptions: undefined,
});