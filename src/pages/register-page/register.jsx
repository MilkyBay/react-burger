import styles from "./styles.module.css";
import {Redirect, useHistory} from "react-router-dom";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { paths } from "../../utils/paths";
import {useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {postRegister} from "../../services/slices/authSlice";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLogged = useSelector((state) => state.auth.isLogged);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onNameChange = (event) => {
    setName(event.target.value);
  }

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const onLoginClick = useCallback(() => {
    history.replace({ pathname: paths.login });
  }, [history]);

  const onRegisterClick = () => {
    dispatch(postRegister({ "email": email, "password": password, "name": name }));
  }

  if (isLogged) {
    return (
        <Redirect to={paths.root}/>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.topSide}>
        <p className="text text_type_main-medium">Регистрация</p>
        <Input type="email" placeholder="Имя" onChange={onNameChange} value={name}/>
        <Input type="email" placeholder="E-mail" onChange={onEmailChange} value={email}/>
        <PasswordInput onChange={onPasswordChange} value={password}/>
        <Button size="medium" type="primary" onClick={onRegisterClick}>
          Зарегистрироваться
        </Button>
      </div>
      <div className={styles.textWithButton}>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?
        </p>
        <Button type="secondary" size="medium" onClick={onLoginClick}>
          Войти
        </Button>
      </div>
    </div>
  );
};

export default RegisterPage;
