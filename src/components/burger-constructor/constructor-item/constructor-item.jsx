import PropTypes from "prop-types";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./constructor-item.module.css";
import clsx from "clsx";
import { ingredientPropTypes } from "../../../utils/common-prop-types";

const ConstructorItem = ({ item, type }) => {
  return (
    <div className={clsx(styles.wrapper, "mb-4")}>
      <div style={{ width: "32px" }}>
        {type === "" && <DragIcon type="primary" />}
      </div>
      <div className={styles.infoContainer}>
        <ConstructorElement
          type={type}
          isLocked={type.length}
          text={item.name}
          price={item.price}
          thumbnail={item.image}
        />
      </div>
    </div>
  );
};

ConstructorItem.propTypes = {
  item: ingredientPropTypes.isRequired,
  type: PropTypes.string.isRequired,
};

export default ConstructorItem;
