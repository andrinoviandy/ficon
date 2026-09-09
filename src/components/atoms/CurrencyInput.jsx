import React from 'react';
import CurrencyInputField from 'react-currency-input-field';

const CurrencyInput = ({
  name,
  size = '',
  defaultValue,
  onChange,
  value,
  height,
  disabled = false
}) => {
  return (
    <CurrencyInputField
      className={`input input${size} ${height} input-bordered rounded-[25px] bg-white w-full`}
      name={name}
      placeholder="Rp"
      defaultValue={defaultValue}
      decimalsLimit={2}
      intlConfig={{ locale: "id-ID", currency: "IDR" }}
      onValueChange={(value, name, values) => onChange(value, name, values)}
      value={value}
      disabled={disabled}
    />
  )
};

export default CurrencyInput;