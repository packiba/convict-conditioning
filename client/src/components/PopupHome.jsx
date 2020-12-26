import classNames from "classnames";
import React from 'react'
import Button from './Button'
import {useHttp} from '../hooks/http.hook'
import { useDispatch } from "react-redux";
import {setUser} from '../redux/actions/user'
import {AuthContext} from '../context/AuthContext'

function PopupHome({onClosePopup, popupVisibility, popupType}) {
  const auth = React.useContext(AuthContext)
  const dispatch = useDispatch();

  const {loading, error, request} = useHttp()

  const [form, setForm] = React.useState({name: '', email: ''})
  const [message, setMessage] = React.useState('')

  const type = popupType === 'reg' ? 'Регистрация' : 'Вход'

  React.useEffect(() => {
    setMessage(error)
  }, [error, message])

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const registerHandler = async () => {
    try {
      console.log('reg form', form)
      const data = await request('/api/auth/register', 'POST', {...form})
      console.log(data)
      dispatch(setUser({name: form.name,  email: form.email}))
      auth.login(data.userId, data.name)
      onClosePopup()
    } catch (e) {
      setMessage('error', e.message)
    }
  }

  const loginHandler = async () => {
    try {
      console.log('login form', form)
      const data = await request('/api/auth/login', 'POST', {...form})
      console.log(data)
      auth.login(data.userId, form.name)
      onClosePopup()
    } catch (e) {
      setMessage('error', e.message)
    }
  }

  return (
    <div
      className={classNames(
        "popup-home",
        "pu",
        {"hide": !popupVisibility}
      )}
    >
      <h2 className="popup-title">{type}</h2>
      <input
        placeholder="Введи своё имя"
        id="name"
        type="text"
        name="name"
        className="user-name pu"
        maxLength="30"
        autoComplete="off"
        onChange={changeHandler}
      />
      <input
        placeholder="Введи E-mail"
        id="email"
        type="email"
        name="email"
        className="email pu"
        maxLength="30"
        autoComplete="off"
        onChange={changeHandler}
      />
      <p className="popup-notification pu">{message}</p>
      <div className="popup-buttons pu">
        <Button
          className="pu"
          height="48"
        >
          <span>Отмена</span>
        </Button>
        <Button
          className="pu"
          height="48"
          onClick={popupType === 'reg' ? registerHandler : loginHandler}
          loading={loading}
        >
          <span className="pu">Готово</span>
        </Button>
      </div>
    </div>
  );
}

// Item.defaultProps = {
//   height: "48",
// }

// Button.propTypes = {
//   onClick: PropTypes.func,
//   className: PropTypes.string.isRequired,
// };

export default PopupHome;


