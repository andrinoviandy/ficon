import React from "react";
import PropTypes from "prop-types";
import ReactAsyncSelect from "react-select/async";
import { useSelector } from "react-redux";

const AsyncSelect = (props) => {
  const {
    id,
    loadOptions,
    onChange,
    defaultValue,
    value,
    isDisabled,
    className,
    ...rest
  } = props;
  const { dimensionScreenW, check } = useSelector((state) => state.global)
  return (
    <ReactAsyncSelect
      id={id}
      loadOptions={loadOptions}
      onChange={onChange}
      defaultValue={defaultValue}
      value={value}
      isDisabled={isDisabled}
      className={`${className} ${(dimensionScreenW < 768 && check) ? 'bringToBack' : ''}`}
      styles={{
        control: (provided, state) => ({
          ...provided,
          height: '3rem',
          borderRadius: "25px",
          ...(state.isDisabled && {
            backgroundColor: '#DFDFDF',
          }),
        }),
        menu: (provided) => ({
          ...provided,
          borderRadius: "25px",
          position: 'relative',
        }),
        menuList: (provided) => ({
          ...provided,
          borderRadius: "25px",
        }),
        valueContainer: (provided) => ({
          ...provided,
          height: '3rem',
          borderRadius: "25px",
          alignContent: 'center',
          paddingLeft: '1rem',
        }),
      }}
      {...rest}
    />
  );
};

AsyncSelect.defaultProps = {
  value: {},
};

AsyncSelect.propTypes = {
  id: PropTypes.string,
  loadOptions: PropTypes.func,
  onChange: PropTypes.func,
  defaultValue: PropTypes.object,
  value: PropTypes.object,
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
};

export default AsyncSelect;