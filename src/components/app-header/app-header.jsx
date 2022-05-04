import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import clsx from "clsx";

const AppHeader = () => {
  const headerElement = clsx(
    styles.headerElement,
    "pl-5",
    "pr-5",
    "pt-4",
    "pb-4"
  );
  return (
    <header className="pb-4 pt-4">
      <div className={styles.wrapper}>
        <div className={styles.leftSide}>
          <div className={headerElement}>
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default pl-2">Конструктор</p>
          </div>
          <div className={clsx(headerElement, styles.inactive, "ml-2")}>
            <ListIcon type="secondary" />
            <p className="text text_type_main-default pl-2">Лента заказов</p>
          </div>
        </div>
        <div className={clsx(styles.centralSide, "pt-2", "pb-2")}>
          <Logo />
        </div>
        <div className={styles.rightSide}>
          <div className={clsx(headerElement, styles.inactive)}>
            <ProfileIcon type="secondary" />
            <p className="text text_type_main-default pl-2">Личный кабинет</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
