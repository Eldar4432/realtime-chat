import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.title}>Eldar Aibekov - Real Time Chat</div>
    </header>
  );
};

export default Header;
