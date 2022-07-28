import PropTypes from "prop-types";
import styles from "./ingredient-item.module.css";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import { ingredientPropTypes } from "../../../utils/common-prop-types";
import { useDrag } from 'react-dnd';

const IngredientItem = ({ item, setCurrent, count }) => {
    const { name, image, price, _id } = item;
    const [{ opacity }, dragRef] = useDrag({
      type: 'ingredient',
      item: { id: item._id },
      collect: (monitor) => ({
          opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    });
    return (
        <div
            key={_id}
            className={styles.wrapper}
            style={{opacity}}
            ref={dragRef}
            onClick={() => setCurrent(item)}
        >
          {count > 0 && <Counter size="default" count={count} />}
          <img
            src={image}
            alt="ingredient_img"
            className={clsx(styles.img, "ml-4 mr-4")}
          />
          <div className={clsx(styles.price, "mt-1", "mb-1")}>
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
  setCurrent: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};

export default IngredientItem;
