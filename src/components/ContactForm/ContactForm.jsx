import { useReducer } from 'react';
import propTypes from 'prop-types';
import s from './contactForm.module.css';

const initialState = {
  name: '',
  number: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'name': {
      return {
        ...state,
        name: action.payload,
      };
    }
    case 'number': {
      return {
        ...state,
        number: action.payload,
      };
    }
    case 'reset': {
      return initialState;
    }
    default:
      return state;
  }
}

function ContactForm({ data }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    dispatch({
      type: name,
      payload: value,
    });
  };

  const handleSubmit = () => {
    data(state);
    dispatch({
      type: 'reset',
    });

  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <label className={s.contacts__label}>
        Name
        <br />
        <input
          className={s.input}
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <br />
      <label className={s.contacts__label}>
        Number
        <br />
        <input
          className={s.input}
          type="tel"
          name="number"
          value={state.number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <br />
      <button type="submit" className={s.button}>Add contact</button>
    </form>
  );
}

export default ContactForm;

ContactForm.propTypes = {
  data: propTypes.func,
};
