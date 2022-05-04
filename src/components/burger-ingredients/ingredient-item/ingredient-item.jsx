import PropTypes from "prop-types";
import styles from "./ingredient-item.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import { ingredientPropTypes } from "../../../utils/common-prop-types";

const IngredientItem = (props) => {
  const { item, onOpen, addToCart } = props;
  const { name, image, price } = item;
  return (
    <div key={item._id} className={styles.wrapper}>
      <Counter size="default" count={0} />
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
};

export default IngredientItem;
