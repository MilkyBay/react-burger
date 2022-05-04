import { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import ConstructorItem from "./constructor-item/constructor-item";
import clsx from "clsx";
import OrderDetails from "./order-details/order-details";
import ModalOverlay from "../modal/modal-overlay/modal-overlay";
import Modal from "../modal/modal/modal";
import { statePropTypes } from "../../utils/common-prop-types";

const BurgerConstructor = (props) => {
  const { state, setState } = props;
  const { orderedIngredients } = state;
  const [orderDone, setOrderDone] = useState(null);
  return (
    <div className={clsx(styles.wrapper, "pt-25", "pl-4", "pr-4")}>
      {orderedIngredients.length === 0 ? (
        <div className={styles.noElements}>
          <p className="text text_type_main-large">
            Вы не выбрали ни одного ингредиента
          </p>
        </div>
      ) : (
        <>
          <div className={clsx(styles.topSide, "pr-2")}>
            {orderedIngredients.map((item, index, array) => (
              <ConstructorItem
                key={index}
                item={item}
                index={index}
                arrayLength={array.length}
              />
            ))}
          </div>
          <div className={clsx(styles.bottomSide, "pt-10")}>
            <div className={clsx(styles.price, "mr-10")}>
              <p className="text text_type_digits-medium">610</p>
              <CurrencyIcon type="primary" />
            </div>
            <Button
              type="primary"
              size="large"
              onClick={() => setOrderDone(true)}
            >
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

BurgerConstructor.propTypes = {
  state: statePropTypes.isRequired,
  setState: PropTypes.func.isRequired,
};

export default BurgerConstructor;
