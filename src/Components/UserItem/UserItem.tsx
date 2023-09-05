import { User } from "../../../Types/User";
import styles from "./UserItem.module.css";

interface UserItemProps {
  user: User;
}

export function UserItem({ user }: UserItemProps): JSX.Element {
  return (
    <details className={styles.details}>
      <summary>
        <h3>{user.username}</h3>
      </summary>
      <p>{user.role}</p>
    </details>
  );
}
