import { useRef } from "react";
import { Location, NavLink, useLocation } from "react-router-dom";
import styles from "./PageHeader.module.css";
import blackLogo from "../../assets/img/SiteLogoBlack.png";
import memoryService from "../../service/memoryService";
import { useUserContext } from "../../Context/useContext";


export function PageHeader(): JSX.Element {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const currentUser = useUserContext();

  function logOut() {
    memoryService.removeSessionValue("USER_INFO");
    currentUser.setDetails({jwt: '', role: '', username: '', bookedWorkouts: []});
  }

  const currentLocation: Location = useLocation();
  return (
    <header className={styles.header}>
      <h1 className={styles["page-title"]}>Strong'N'Epic</h1>
      {currentLocation.pathname !== "/" && currentLocation.pathname !== "/login" && currentLocation.pathname !== "/register" && (
        <div className={styles["top-bar"]}>
          {currentUser.details.role === "ADMIN" && (
            <div>
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
            </div>
          )}
          <div className={currentUser.details.role === "ADMIN" ? styles["current-user-admin-options"] : styles["current-user-user-options"]}>
            <p className="currently-logged-in">Currently logged in as {currentUser.details.username} </p>
            <button className={styles["sign-out-btn"]} onClick={logOut}>
              <i className="fa fa-sign-out"></i>
            </button>
          </div>
        </div>
      )}
      <div>
        <img className={styles.logo} src={blackLogo} alt="Strong'N'Epic" />
      </div>
      {currentUser.details.role !== "ADMIN" && currentUser.details.role !== "USER" && (
        <div className={styles.logRegContainer}>
          <NavLink to={"/register"}><button className={styles.logRegBtn}>Register</button></NavLink>
          <NavLink to={"/login"}><button className={styles.logRegBtn}>Login</button></NavLink>
        </div>
      )}
    </header>
  );
}
