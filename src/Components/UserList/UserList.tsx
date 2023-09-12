import { useEffect, useState } from "react";
import { UserItem } from "../UserItem/UserItem";
import fetchService from "../../service/fetchService";
import { User } from "../../../Types/User";
import { useUserContext } from "../../Context/useContext";

export function UserList(): JSX.Element {

  const [users, setUsers] = useState([] as User[]);
  
  const currentUser = useUserContext();
  const token = currentUser.details.jwt;

  useEffect(() => {
    fetchService.getUsers(token).then((data) => setUsers(data));
  }, [])

  return (
    <>
      {users.map((user) => (
        <UserItem user={user} key={user.username} />
      ))}
    </>
  );
}
