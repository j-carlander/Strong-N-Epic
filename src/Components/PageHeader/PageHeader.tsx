import { useRef } from "react";
import { Location, NavLink, useLocation, useNavigate } from "react-router-dom";
import styles from "./PageHeader.module.css";
import blackLogo from "../../assets/img/SiteLogoBlack.png";
import memoryService from "../../service/memoryService";

export function PageHeader(): JSX.Element {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const currentUser = useUserContext();

  function logOut() {
    memoryService.removeSessionValue("USER_INFO");
    currentUser.setDetails({
      jwt: "",
      role: "",
      username: "",
      bookedWorkouts: [],
    });
  }

  // currentUser.role === "ADMIN" ? styles["sign-out-admin-btn"] : styles["sign-out-user-btn"]

  const currentLocation: Location = useLocation();
  return (
    <header className={styles.header}>
      <h1 className={styles["page-title"]}>Strong'N'Epic</h1>
      {currentLocation.pathname !== "/" &&
        currentLocation.pathname !== "/login" &&
        currentLocation.pathname !== "/register" && (
          <div className={styles["top-bar"]}>
            {currentUser.role === "ADMIN" && (
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
            <div
              className={
                currentUser.role === "ADMIN"
                  ? styles["current-user-admin-options"]
                  : styles["current-user-user-options"]
              }>
              <p className="currently-logged-in">
                Currently logged in as {currentUser.username}{" "}
              </p>
              <button className={styles["sign-out-btn"]} onClick={logOut}>
                <i className="fa fa-sign-out"></i>
              </button>
            </div>
          </div>
        )}
      <div>
        <img className={styles.logo} src={blackLogo} alt="Strong'N'Epic" />
      </div>
    </header>
  );
}
