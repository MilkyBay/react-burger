import styles from "./order-details.module.css";
import clsx from "clsx";
import done from "../../../assets/done.svg";

const OrderDetails = () => {
  return (
    <>
      <p
        className={clsx(styles.glowDigits, "text text_type_digits-large mt-4")}
      >
        034536
      </p>
      <p className="text text_type_main-medium mt-8 mb-15">
        идентификатор заказа
      </p>
      <img className={styles.img} alt="checkMark_img" src={done} />
      <p className="text text_type_main-small mt-15 mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-small text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
};

export default OrderDetails;
