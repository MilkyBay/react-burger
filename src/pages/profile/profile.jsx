import styles from "./styles.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import { paths } from "../../utils/paths";
import clsx from "clsx";

const ProfilePage = () => {
  console.log();

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttonsWrapper}>
        <NavLink
          className={clsx(styles.navButton, "text text_type_main-medium")}
          // to={{ pathname: `/list/${id}` }}
          // to={paths.profile}
          to={{ pathname: `/profile` }}
          activeClassName={styles.buttonsActive}
        >
          Профиль
        </NavLink>
        <NavLink
          className={clsx(styles.navButton, "text text_type_main-medium")}
          to={paths.login}
          activeClassName={styles.buttonsActive}
        >
          История заказов
        </NavLink>
        <NavLink
          className={clsx(styles.navButton, "text text_type_main-medium")}
          to={paths.login}
          activeClassName={styles.buttonsActive}
        >
          Выход
        </NavLink>
        <p
          className={clsx(styles.note, "text text_type_main-default", "mt-20")}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div className={styles.formsWrapper}>
        <Input type="email" placeholder="Имя" value={""} />
        <Input type="email" placeholder="E-mail" value={""} />
        <PasswordInput value={""} />
      </div>
    </div>
  );
};

export default ProfilePage;
