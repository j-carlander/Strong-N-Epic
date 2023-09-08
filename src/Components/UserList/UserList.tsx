import { useEffect, useState } from "react";
import { UserItem } from "../UserItem/UserItem";
import fetchService from "../../service/fetchService";
import { User } from "../../../Types/User";

export function UserList(): JSX.Element {

  const [users, setUsers] = useState([] as User[]);

  useEffect(() => {
    fetchService.getUsers().then((data) => setUsers(data));
  }, [])

  return (
    <>
      {users.map((user) => (
        <UserItem user={user} key={user.username} />
      ))}
    </>
  );
}
