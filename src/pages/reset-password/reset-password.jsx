import styles from "./styles.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { paths } from "../../utils/paths";
import { useHistory } from "react-router-dom";
import { useCallback } from "react";

const ResetPasswordPage = () => {
  const history = useHistory();

  const onLoginClick = useCallback(() => {
    history.replace({ pathname: paths.login });
  }, [history]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.topSide}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <PasswordInput />
        <Input type="email" placeholder="Введите код из письма" />
        <Button size="medium" type="primary">
          Сохранить
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

export default ResetPasswordPage;
