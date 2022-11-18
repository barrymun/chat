import {auth} from "common/constants";

export default function SignOut() {
  return auth.currentUser && (
    <button type="button" onClick={() => auth.signOut()}>Sign Out</button>
  );
}