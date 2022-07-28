import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css";

const ModalOverlay = ({ children }) => {
    return (
        <div className={styles.overlay}>{children}</div>
    );
};

ModalOverlay.propTypes = {
    children: PropTypes.element.isRequired,
};

export default ModalOverlay;