import { memo, useEffect, useRef, useState } from "react";
import { Location, NavLink, useLocation } from "react-router-dom";
import styles from "./PageHeader.module.css";
import blackLogo from "../../assets/img/SiteLogoBlack.png";
import { useCurrentUser } from "../../hooks/currentUserHook";

type Props = {
  loggedIn: boolean;
}

export function PageHeader({loggedIn}: Props): JSX.Element {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const {currentUser} = useCurrentUser(loggedIn);

  const currentLocation: Location = useLocation();
  return (
    <header className={styles.header}>
      <h1 className={styles["page-title"]}>Strong'N'Epic</h1>
      {currentLocation.pathname !== "/" && (
        <div className={styles["top-bar"]}>
          <button
            className={styles["open-menu-btn"]}
            onClick={() => {
              dialogRef.current?.show();
            }}>
            &#9776;
          </button>
          <dialog className={styles.dialog} ref={dialogRef}>
            <button
              className={styles["close-menu-btn"]}
              onClick={() => {
                dialogRef.current?.close();
              }}>
              &#10006;
            </button>
            <nav>
              <ul>
                <li>
                  <NavLink to={"/workout"}>Book Workout</NavLink>
                </li>
                <li>
                  <NavLink to={"/admin"}>Admin Page</NavLink>
                </li>
              </ul>
            </nav>
          </dialog>
          <div className={styles["current-user-options"]}>
            <p>Currently logged in as {currentUser} </p>
            <button className={styles["sign-out-btn"]}>
              <i className="fa fa-sign-out"></i>
            </button>
          </div>
        </div>
      )}
      <div>
        <img className={styles.logo} src={blackLogo} alt="Strong'N'Epic" />
      </div>
      <div className={styles.logRegContainer}>
        <NavLink to={"/register"}><button className={styles.logRegBtn}>Register</button></NavLink>
        <NavLink to={"/login"}><button className={styles.logRegBtn}>Login</button></NavLink>
      </div>
    </header>
  );
}
