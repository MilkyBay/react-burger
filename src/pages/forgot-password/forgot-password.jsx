import styles from "./styles.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { paths } from "../../utils/paths";
import { useHistory } from "react-router-dom";
import { useCallback } from "react";

const ForgotPasswordPage = () => {
  const history = useHistory();

  const onLoginClick = useCallback(() => {
    history.replace({ pathname: paths.login });
  }, [history]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.topSide}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <Input type="email" placeholder="Укажите e-mail" />
        <Button size="medium" type="primary">
          Восстановить
        </Button>
      </div>
      <div className={styles.textWithButton}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
        </p>
        <Button type="secondary" size="medium" onClick={onLoginClick}>
          Войти
        </Button>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
