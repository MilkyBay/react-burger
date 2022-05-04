import PropTypes from "prop-types";
import styles from "./ingredient-item.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import { ingredientPropTypes } from "../../../utils/common-prop-types";

const IngredientItem = ({ item, onOpen, addToCart, count }) => {
  const { name, image, price, _id } = item;
  return (
    <div key={_id} className={styles.wrapper}>
      {count > 0 && <Counter size="default" count={count} />}
      <img
        src={image}
        alt="ingredient_img"
        className={clsx(styles.img, "ml-4 mr-4")}
        onClick={() => onOpen(item)}
      />
      <div
        className={clsx(styles.price, "mt-1", "mb-1")}
        onClick={() => addToCart(item)}
      >
        <p className="text text_type_digits-default mr-2">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <div className={styles.nameWrapper}>
        <p className="text text_type_main-default">{name}</p>
      </div>
    </div>
  );
};

IngredientItem.propTypes = {
  item: ingredientPropTypes.isRequired,
  onOpen: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};

export default IngredientItem;
