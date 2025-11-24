import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a
        href="https://www.linkedin.com/in/eldar-aibekov-1a0716242/"
        target="_blank"
        rel="noreferrer"
        className={styles.link}
      >
        LinkedIn — Eldar Aibekov
      </a>
    </footer>
  );
};

export default Footer;
