import React, { useRef, useEffect, useState } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import { parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { useField } from '@rocketseat/unform';
import 'react-datepicker/dist/react-datepicker.css';

export default function DateInput({ name }) {
  registerLocale('pt', pt);
  setDefaultLocale('pt');

  const ref = useRef(null);
  const { fieldName, registerField, defaultValue } = useField(name);
  const [selected, setSelected] = useState(
    defaultValue && parseISO(defaultValue)
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <DatePicker
      name={fieldName}
      ref={ref}
      selected={selected}
      onChange={date => setSelected(date)}
      timeInputLabel="Horário:"
      dateFormat="dd/MM/yyyy HH:mm"
      showTimeInput
      locale="pt"
      minDate={new Date()}
      autoComplete="off"
      placeholderText="Selecione a date e horário do evento"
    />
  );
}
