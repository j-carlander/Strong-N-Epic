import { useEffect, useState } from "react";
import { User } from "../../../Types/User";
import { UserItem } from "../UserItem/UserItem";

const testToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvcnJlQWRtaW4iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2OTM5MTE2MTUsImlzcyI6IlRvRG8gUmVhY3QgVFMiLCJzdWIiOiJzZW5kIGFuZCByZWNlaXZlIGFjY2VzcyB0b2tlbiJ9.coIBFkEiBMBTwwU_bHyafPPDVCbCFNswNW3-Eeqrupk";

export function UserList(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers(): Promise<void> {
      const url = "http://127.0.0.1:8000/api/user";
      const headersList = {
        Authorization: "Bearer " + testToken,
      };
      const options = {
        method: "GET",
        headers: headersList,
      };
      const result = await fetch(url, options);
      if (result.status !== 200) throw new Error("No users found");
      const data = await result.json();

      setUsers(data);
    }

    fetchUsers();
  }, []);
  return (
    <article>
      {users.map((user) => (
        <UserItem user={user} key={user._id} />
      ))}
    </article>
  );
}
