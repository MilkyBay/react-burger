import styles from "./styles.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { paths } from "../../utils/paths";
import { useHistory } from "react-router-dom";
import { useCallback } from "react";

const LoginPage = () => {
  const history = useHistory();

  const onRestorePasswordClick = useCallback(() => {
    history.replace({ pathname: paths.forgotPassword });
  }, [history]);

  const onRegisterClick = useCallback(() => {
    history.replace({ pathname: paths.register });
  }, [history]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.topSide}>
        <p className="text text_type_main-medium">Вход</p>
        <Input type="email" placeholder="E-mail" />
        <PasswordInput className={styles.sosat} />
        <Button size="medium" type="primary">
          Войти
        </Button>
      </div>
      <div className={styles.textWithButton}>
        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь?
        </p>
        <Button type="secondary" size="medium" onClick={onRegisterClick}>
          Зарегистрироваться
        </Button>
      </div>
      <div className={styles.textWithButton}>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?
        </p>
        <Button type="secondary" size="medium" onClick={onRestorePasswordClick}>
          Восстановить пароль
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
