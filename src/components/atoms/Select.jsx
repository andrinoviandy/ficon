import React from "react";
import PropTypes from "prop-types";
import ReactSelect from "react-select";
import { useSelector } from "react-redux";

const Select = (props) => {
  const {
    id,
    onChange,
    value,
    options,
    defaultValue,
    isDisabled,
    className,
    height,
    ...rest
  } = props;
  const { dimensionScreenW, check } = useSelector((state) => state.global)
  return (
    <ReactSelect
      id={id}
      onChange={onChange}
      value={value}
      options={options}
      defaultValue={defaultValue}
      isDisabled={isDisabled}
      className={`${className} ${(dimensionScreenW < 768 && check) ? 'bringToBack' : ''}`}
      // styles={{
      //   control: (provided, state) => ({
      //     ...provided,
      //     height: height ? height : '3rem',
      //     borderRadius: "25px",
      //     ...(state.isDisabled && {
      //       backgroundColor: '#DFDFDF',
      //     }),
      //   }),
      //   menu: (provided) => ({
      //     ...provided,
      //     borderRadius: "25px",
      //     zIndex: 2
      //   }),
      //   menuList: (provided) => ({
      //     ...provided,
      //     borderRadius: "25px",
      //   }),
      //   valueContainer: (provided) => ({
      //     ...provided,
      //     height: height ? height : '3rem',
      //     borderRadius: "25px",
      //     alignContent: 'center',
      //     paddingLeft: '1rem',
      //   }),
      // }}
      styles={{
        control: (provided, state) => ({
          ...provided,
          minHeight: '48px',
          borderRadius: '20px',
          ...(state.isDisabled && {
            backgroundColor: '#DFDFDF',
          }),
        }),

        valueContainer: (provided) => ({
          ...provided,
          minHeight: '48px',
          padding: '6px 12px',
          flexWrap: 'wrap',
        }),

        multiValue: (provided) => ({
          ...provided,
          borderRadius: '12px',
          margin: '3px',
        }),

        multiValueLabel: (provided) => ({
          ...provided,
          fontSize: '12px',
          padding: '3px 6px',
        }),

        multiValueRemove: (provided) => ({
          ...provided,
          borderRadius: '0 12px 12px 0',
          ':hover': {
            backgroundColor: '#ef4444',
            color: '#fff',
          },
        }),

        menu: (provided) => ({
          ...provided,
          borderRadius: '20px',
          zIndex: 9999,
        }),
      }}
      {...rest}
    />
  );
};

Select.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.object,
  options: PropTypes.array,
  defaultValue: PropTypes.object,
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Select;