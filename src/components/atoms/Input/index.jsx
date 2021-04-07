import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error, Currency } from './styles';
import Colors from '../../../styles/colors.json';

const Input= ({
  name,
  leftIcon: LeftIcon,
  dataType,
  disabled,
  ...rest
}) => {
  const inputRef = useRef(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      clearValue(ref) {
        ref.value = '';
        inputRef.current?.setAttribute('value', '');
      },
      setValue(_, value) {
        if (inputRef.current) {
          inputRef.current.value = value;
        }
      },
    });
  }, [fieldName, registerField]);

  const format = (value) => value * 0.01;
  const stringToNumber = (value)=> {
    const newValue = parseInt(value.replace(/\./g, ''), 10);
    return newValue >= 0 ? newValue : 0;
  };
  const handleChange = useCallback((event) => {
    const { target: input } = event;

    const value = stringToNumber(input.value);
    const valueFormatted = value === 0 ? '0.00' : format(value).toFixed(2);
    if (inputRef.current) {
      inputRef.current.value = valueFormatted;
    }
  }, []);

  const inputType = () => {
    switch (dataType) {
      case 'currency':
        return (
          <input
            onFocus={handleInputFocus}
            type="number"
            step="any"
            maxLength={18}
            onBlur={handleInputBlur}
            defaultValue={defaultValue}
            disabled={disabled}
            onChange={handleChange}
            ref={inputRef}
            {...rest}
          />
        );
      default:
        return (
          <input
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            defaultValue={defaultValue}
            disabled={disabled}
            ref={inputRef}
            {...rest}
          />
        );
    }
  };

  return (
    <Container
      disabled={disabled}
      gotError={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
    >
      {LeftIcon && <LeftIcon size={20} />}
      {dataType === 'currency' && <Currency>R$</Currency>}
      {inputType()}

      {error && (
        <Error title={error}>
          <FiAlertCircle color={Colors.danger} size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
