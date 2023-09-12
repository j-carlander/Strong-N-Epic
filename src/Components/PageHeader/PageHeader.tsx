import { useRef } from "react";
import { NavLink } from "react-router-dom";
import styles from "./PageHeader.module.css";
import whiteLogo from "../../assets/img/SiteLogoWhite.png";
import memoryService from "../../service/memoryService";
import { useUserContext } from "../../Context/useContext";

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

  return (
    <header className={styles.header}>
      <h1 className={styles["page-title"]}>Strong'N'Epic</h1>

      <div className={styles["top-bar"]}>
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
                  <NavLink to={"/"} className={styles["nav-link"]}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/workout"} className={styles["nav-link"]}>
                    Book Workout
                  </NavLink>
                </li>
                {currentUser.details.role === "ADMIN" ? (
                  <li>
                    <NavLink to={"/admin"} className={styles["nav-link"]}>
                      Admin Page
                    </NavLink>
                  </li>
                ) : null}
              </ul>
            </nav>
          </dialog>
        </div>

        <div className={styles["current-user-options"]}>
          <p className="currently-logged-in">
            Currently logged in as {currentUser.details.username}{" "}
          </p>
          <button className={styles["sign-out-btn"]} onClick={logOut}>
            <i className="fa fa-sign-out"></i>
          </button>
        </div>
      </div>

      <div>
        <NavLink to={"/"} className={styles["nav-link"]}>
          <img className={styles.logo} src={whiteLogo} alt="Strong'N'Epic" />
        </NavLink>
      </div>
    </header>
  );
}
