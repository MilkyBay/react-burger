import React, {useEffect, useRef, useState} from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientsOptions } from "../../utils/data";
import IngredientItem from "./ingredient-item/ingredient-item";
import IngredientsDetails from "./ingredient-details/ingredient-details";
import clsx from "clsx";
import Modal from "../modal/modal/modal";
import { useDispatch, useSelector } from "react-redux";
import { setIngredientInfo, removeIngredientInfo, setMix } from "../../services/slices";

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.data.ingredients);
  const mix = useSelector((state) => state.data.mix);
  const buns = useRef(null);
  const fillings = useRef(null);
  const sauces = useRef(null);
  const [data, setData] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState(null);
  const [ingredientAnchor, setIngredientAnchor] = useState('first');

  const showIngredientDetail = (currentIngredient) => {
    dispatch(setIngredientInfo(currentIngredient));
    setCurrentIngredient(currentIngredient);
  }

  const calculateCount = (currentIngredient) => {
    if (currentIngredient.type === 'bun' && mix.buns._id === currentIngredient._id) return 1;
    if (currentIngredient.type !== 'bun') {
      return [...mix.sauces, ...mix.fillings].filter((item) => item._id === currentIngredient._id).length;
    }
    return 0;
  };

  const onScrollHandler = (e) => {
    const offsetToTitle = 290;
    const position = e.target.scrollTop;
    const saucesOffset = sauces.current.offsetTop - offsetToTitle;
    const fillingsOffset = fillings.current.offsetTop - offsetToTitle;
    if (position < saucesOffset) {
      setIngredientAnchor('first');
    }
    if (position >= saucesOffset && position < fillingsOffset) {
      setIngredientAnchor('second');
    }
    if (position >= fillingsOffset) {
      setIngredientAnchor('third');
    }
  };

  useEffect(() => {
    if (ingredients) {
      setData([
        { key: 'buns', ref: buns, title: 'Булки', data: ingredients.filter((item) => item.type === 'bun') },
        { key: 'sauces', ref: sauces, title: 'Соусы', data: ingredients.filter((item) => item.type === 'sauce') },
        { key: 'fillings', ref: fillings, title: 'Начинки', data: ingredients.filter((item) => item.type === 'main') },
      ]);
    }
  }, [ingredients]);

  useEffect(() => {
    dispatch(setMix(mix));
  }, [mix, dispatch]);

  return (
    <div className={clsx(styles.wrapper, "pt-10")}>
      <p className="text text_type_main-large mb-5">Соберите бургер</p>
      <nav className={clsx(styles.tab, "mb-10")}>
        <a href='#buns'>
          <Tab value="first" active={ingredientAnchor === 'first'} onClick={setIngredientAnchor}>
            {ingredientsOptions.bun.name}
          </Tab>
        </a>
        <a href='#sauces'>
          <Tab value="second" active={ingredientAnchor === 'second'} onClick={setIngredientAnchor}>
            {ingredientsOptions.sauce.name}
          </Tab>
        </a>
        <a href='#fillings'>
          <Tab value="third" active={ingredientAnchor === 'third'} onClick={setIngredientAnchor}>
            {ingredientsOptions.main.name}
          </Tab>
        </a>
      </nav>
      <div className={styles.ingredientsWrapper} onScroll={onScrollHandler}>
        {data.map((item, index) => (
          <div key={item.key + index}>
            <p className="text text_type_main-medium" ref={item.ref} id={item.key}>{item.title}</p>
            <div className={clsx(styles.ingredientsArray, "pt-6", "pb-10", "pl-4", "pr-4")}>
              {item.data.map((element, index) => (
                <IngredientItem
                  key={element.name + index}
                  item={element}
                  setCurrent={showIngredientDetail}
                  count={calculateCount(element)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      {currentIngredient && (
        <Modal modalName={"Детали ингредиента"} onClose={() => {
          setCurrentIngredient(null);
          dispatch(removeIngredientInfo());
        }}>
          <IngredientsDetails element={currentIngredient} />
        </Modal>
      )}
    </div>
  );
};

export default BurgerIngredients;
