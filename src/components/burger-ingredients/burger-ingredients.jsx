import React from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientsOptions } from "../../utils/data";
import IngredientItem from "./ingredient-item/ingredient-item";
import IngredientsDetails from "./ingredient-details/ingredient-details";
import clsx from "clsx";
import ModalOverlay from "../modal/modal-overlay/modal-overlay";
import Modal from "../modal/modal/modal";
import { statePropTypes } from "../../utils/common-prop-types";

const BurgerIngredients = (props) => {
  const { state, setState } = props;
  const { burgerIngredients, orderedIngredients } = state;
  const [currentElement, setCurrentElement] = React.useState(null);

  const addToCart = (item) => {
    setState({
      ...state,
      orderedIngredients: [...orderedIngredients, item],
    });
  };

  return (
    <div className={clsx(styles.wrapper, "pt-10")}>
      <p className="text text_type_main-large mb-5">Соберите бургер</p>
      <nav className={clsx(styles.tab, "mb-10")}>
        <Tab value="one">{ingredientsOptions.bun.name}</Tab>
        <Tab value="two">{ingredientsOptions.sauce.name}</Tab>
        <Tab value="three">{ingredientsOptions.main.name}</Tab>
      </nav>
      <div className={styles.ingredientsWrapper}>
        {burgerIngredients.map((item) => (
          <div key={item.name}>
            <p className="text text_type_main-medium">{item.name}</p>
            <div
              className={clsx(
                styles.ingredientsArray,
                "pt-6",
                "pb-10",
                "pl-4",
                "pr-4"
              )}
            >
              {item.data.map((element, index) => (
                <IngredientItem
                  key={index}
                  item={element}
                  onOpen={setCurrentElement}
                  addToCart={addToCart}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      {currentElement && (
        <ModalOverlay>
          <Modal modalName={"Детали ингредиента"} onClose={setCurrentElement}>
            <IngredientsDetails element={currentElement} />
          </Modal>
        </ModalOverlay>
      )}
    </div>
  );
};

BurgerIngredients.propTypes = {
  state: statePropTypes.isRequired,
  setState: PropTypes.func.isRequired,
};

export default BurgerIngredients;
