import styles from "./Navbar.module.scss";
import { BiUser } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className={styles.navBar}>
      <div className={styles.navBarItem}>
        <HiOutlineMail className={styles.itemIcon} />
        Thông tin
      </div>
      <div className={styles.navBarItem}>
        <BiUser className={styles.itemIcon} />
        Nhắn tin
      </div>
      <div className={styles.signOut}>
        <Link to="#" className={styles.signOutLink}>
          <AiOutlineLogout className={styles.signOutBtn} />
          Log out
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
