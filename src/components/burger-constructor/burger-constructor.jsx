import { useState } from "react";
import { Button, ConstructorElement, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import ConstructorItems from "./constructor-item/constructor-item";
import clsx from "clsx";
import OrderDetails from "./order-details/order-details";
import ModalOverlay from "../modal/modal-overlay/modal-overlay";
import Modal from "../modal/modal/modal";
import { useDispatch, useSelector } from "react-redux";
import { post, setMix, setOrder } from "../../services/slices";
import { useDrop } from "react-dnd/dist/hooks";

const EKey = {
  bun: 'buns',
  sauce: 'sauces',
  main: 'fillings',
};

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.data.ingredients);
  const mix = useSelector((state) => state.data.mix);
  const [orderDone, setOrderDone] = useState(null);

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(elemId) {
      const currentIngredient = ingredients.find(
          (elem) => elem._id === elemId.id
      );
      dispatch(
          setMix({
            ...mix,
            [EKey[currentIngredient.type]]:
                currentIngredient.type === 'bun'
                    ? {
                      ...currentIngredient,
                      price: currentIngredient.price * 2,
                    }
                    : mix[EKey[currentIngredient.type]].concat({
                      ...currentIngredient,
                      index: `${mix[EKey[currentIngredient.type]].length}-${Math.random()}`,
                      sort_order: mix.sauces.length + mix.fillings.length + 1,
                    }),
          })
      );
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const handleOrder = async () => {
    dispatch(setOrder(Math.floor(Math.random() * 100000)));
    const orderedIngredients = { ingredients: Object.values(mix).flat(1).map((item) => item._id) };
    dispatch(post(orderedIngredients));
    setOrderDone(true);
  }

  const deleteItem = (item) => () => {
    const filteredSauces = mix.sauces.filter((ingredient) => ingredient.index !== item.index);
    const filteredFillings = mix.fillings.filter((ingredient) => ingredient.index !== item.index);
    const newMix = {
      buns: mix.buns,
      sauces: filteredSauces.map((elem) => {
        if (item.sort_order < elem.sort_order) return { ...elem, sort_order: elem.sort_order - 1 };
        return elem;
      }),
      fillings: filteredFillings.map((elem) => {
        if (item.sort_order < elem.sort_order) return { ...elem, sort_order: elem.sort_order - 1 };
        return elem;
      }),
    };
    dispatch(setMix(newMix));
  };

  const getTotal = () => {
    return Object.values(mix).flat(1).reduce((prev, item) => prev + item.price, 0);
  }

  return (
    <div
        className={clsx(styles.wrapper, "mt-25", "pl-4")}
        ref={dropTarget}
        style={{borderColor: isHover ? '#8585ad' : 'transparent'}}
    >
      {!mix.fillings.length && !mix.buns._id && !mix.sauces.length && (
        <div className={styles.noElements}>
          <p className="text text_type_main-large">
            Вы не выбрали ни одного ингредиента
          </p>
        </div>
      )}
      {(mix.fillings.length || mix.sauces.length || mix.buns._id) && (
        <>
          <div className={styles.topSide}>
            {mix && mix.buns && mix.buns._id && (
                <div className={clsx(styles.buns, "mb-4", 'mt-2', "pr-4")}>
                  <ConstructorElement
                      price={mix.buns.price / 2}
                      type="top"
                      thumbnail={mix.buns.image}
                      text={`${mix.buns.name} (верх)`}
                      isLocked={true}
                  />
                </div>
            )}
            <div className={clsx(styles.fillings)}>
              {[...mix.sauces, ...mix.fillings]
                  .sort((a, b) => a.sort_order - b.sort_order)
                  .map((item, index, array) => (
                      <ConstructorItems
                          key={item._id + index}
                          index={index}
                          item={item}
                          handleDelete={deleteItem}
                      />
                  ))}
            </div>
            {mix && mix.buns && mix.buns._id && (
                <div className={clsx(styles.buns, 'mt-4', "pr-4")}>
                  <ConstructorElement
                      price={mix.buns.price / 2}
                      type="bottom"
                      thumbnail={mix.buns.image}
                      text={`${mix.buns.name} (низ)`}
                      isLocked={true}
                  />
                </div>
            )}
          </div>
          <div className={clsx(styles.bottomSide, "pt-10", "pr-4")}>
            <div className={clsx(styles.price, "mr-10")}>
              <p className="text text_type_digits-medium">
                {getTotal()}
              </p>
              <CurrencyIcon type="primary" />
            </div>
            <Button type="primary" size="large" onClick={handleOrder}>
              Оформить заказ
            </Button>
          </div>
          {orderDone && (
            <ModalOverlay>
              <Modal onClose={setOrderDone}>
                <OrderDetails />
              </Modal>
            </ModalOverlay>
          )}
        </>
      )}
    </div>
  );
};

export default BurgerConstructor;
