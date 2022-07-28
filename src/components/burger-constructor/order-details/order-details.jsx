import styles from "./order-details.module.css";
import clsx from "clsx";
import done from "../../../assets/done.svg";
import { useSelector } from "react-redux";

const OrderDetails = () => {
    const orderNumber = useSelector((state) => state.data.order);
    return (
        <>
          <p className={clsx(styles.glowDigits, "text text_type_digits-large mt-4")}>
              {orderNumber}
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
