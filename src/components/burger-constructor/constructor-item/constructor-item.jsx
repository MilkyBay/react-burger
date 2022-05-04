import PropTypes from "prop-types";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./constructor-item.module.css";
import clsx from "clsx";
import { ingredientPropTypes } from "../../../utils/common-prop-types";

const ConstructorItem = (props) => {
  const { item, index, arrayLength } = props;
  const type = index === 0 ? "top" : index === arrayLength - 1 ? "bottom" : "";
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
  index: PropTypes.number.isRequired,
  arrayLength: PropTypes.number.isRequired,
};

export default ConstructorItem;
