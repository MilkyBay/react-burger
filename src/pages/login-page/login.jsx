import styles from "./styles.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { paths } from "../../utils/paths";
import {Redirect, useHistory, useLocation} from "react-router-dom";
import {useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {postLogin} from "../../services/slices/authSlice";

const LoginPage = ({ }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const isLogged = useSelector((state) => state.auth.isLogged);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const onEnterClick = async () => {
    const successfulLogin = await dispatch(postLogin({ "email": email, "password": password }));
    if (successfulLogin) {
      history.replace({ pathname: paths.root });
    }
  }

  const onRestorePasswordClick = useCallback(() => {
    history.replace({ pathname: paths.forgotPassword });
  }, [history]);

  const onRegisterClick = useCallback(() => {
    history.replace({ pathname: paths.register });
  }, [history]);

  if (isLogged) {
    console.log('123', location.state.from.pathname);
    return (
        <Redirect to={ location.state.from.pathname || paths.root }/>
    );
  }

  console.log('LOGIN!');

  return (
    <div className={styles.wrapper}>
      <div className={styles.topSide}>
        <p className="text text_type_main-medium">Вход</p>
        <Input type="email" placeholder="E-mail" onChange={onEmailChange} value={email}/>
        <PasswordInput className={styles.sosat} onChange={onPasswordChange} value={password}/>
        <Button size="medium" type="primary" onClick={onEnterClick}>
          Войти
        </Button>
      </div>
      <div className={styles.textWithButton}>
        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь?
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
