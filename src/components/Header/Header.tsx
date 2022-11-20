import classes from "./Header.module.scss";
import React from "react";
import SignOut from "components/SignOut";

interface Props {
  photoURL: string;
}

export default function Header({photoURL}: Props) {
  return <>
    <div className={classes.container}>

      <figure className={classes.figure}>
        <img alt="profile picture" referrerPolicy="no-referrer" className={classes.profile} src={photoURL} />
      </figure>

      <SignOut/>

    </div>
  </>;
}