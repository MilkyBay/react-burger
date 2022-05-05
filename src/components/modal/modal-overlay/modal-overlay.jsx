import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css";

const modal = document.getElementById("modal");

const ModalOverlay = ({ children }) => {
  return ReactDOM.createPortal(
    <div className={styles.overlay}>{children}</div>,
    modal
  );
};

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ModalOverlay;
