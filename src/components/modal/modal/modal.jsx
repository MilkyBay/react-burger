import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";

const Modal = ({ modalName, onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose(null);
      }
    };

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [modalRef, onClose]);

  return ReactDOM.createPortal(
    <ModalOverlay>
      <div
        className={clsx(styles.modal, "pt-10", "pr-10", "pl-10", "pb-15")}
        ref={modalRef}
      >
        <button className={styles.closeBtn} onClick={() => onClose(null)}>
          <CloseIcon type="primary" />
        </button>
        <div className={styles.name}>
          <p className="text text_type_main-large">{modalName}</p>
        </div>
        {children}
      </div>
    </ModalOverlay>,
    document.getElementById("modal")
  );
};

Modal.propTypes = {
  modalName: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default Modal;
