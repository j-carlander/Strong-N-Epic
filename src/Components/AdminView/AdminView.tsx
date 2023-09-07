import { useState } from "react";
import { UserList } from "../UserList/UserList";
import styles from "./AdminView.module.css";
import { WorkoutsList } from "../WorkoutsList/WorkoutsList";
import { WorkoutDialogForm } from "../WorkoutForm/WorkoutDialogForm";

type ActiveView = "USERS" | "WORKOUTS";

export function AdminView(): JSX.Element {
  const [activeView, setActiveView] = useState<ActiveView>("USERS");

  return (
    <article className={styles.wrapper}>
      <div className={styles["btn-container"]}>
        <button
          onClick={() => setActiveView("USERS")}
          className={
            activeView === "USERS"
              ? `${styles["change-view-btn"]} ${styles.active}`
              : `${styles["change-view-btn"]}`
          }>
          Users
        </button>
        <button
          onClick={() => setActiveView("WORKOUTS")}
          className={
            activeView === "WORKOUTS"
              ? `${styles["change-view-btn"]} ${styles.active}`
              : `${styles["change-view-btn"]}`
          }>
          Workouts
        </button>
      </div>
      <section className={styles.container}>
        {activeView === "USERS" && <UserList />}
        {activeView === "WORKOUTS" && <WorkoutDialogForm />}
        {activeView === "WORKOUTS" && <WorkoutsList />}
      </section>
    </article>
  );
}
