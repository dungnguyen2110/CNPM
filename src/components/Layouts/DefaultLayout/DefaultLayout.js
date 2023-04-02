import Navbar from "../components/Navbar";
import styles from "./DefaultLayout.module.scss";
function DefaultLayout({ children }) {
  return (
    <div>
      <div className={styles.container}>
        <Navbar />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
