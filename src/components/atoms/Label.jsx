import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

const Label = ({ 
  children, 
  label, 
  tooltip = false, 
  positionTip, 
  dataTip, 
  data, 
  required = false, 
  star = false,
  // Props baru untuk checkbox
  withCheckbox = false,
  checkboxLabel = '',
  checkboxName = '',
  checkboxChecked = false,
  onCheckboxChange = () => {},
  disabled = false,
  classLabel = '',
  icon = null,
  id = '' // Tambahkan ID untuk menghindari konflik
}) => {
  // Generate unique ID jika tidak disediakan
  const labelId = id || `label-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className='form-control'>
      <div className="label p-0 mb-1">
        <div className="flex items-center gap-2">
          {/* Checkbox dipisahkan dari label utama */}
          {withCheckbox && (
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="checkbox"
                name={checkboxName}
                checked={checkboxChecked}
                onChange={onCheckboxChange}
                className="checkbox checkbox-sm"
                id={`${labelId}-checkbox`}
              />
              {checkboxLabel && (
                <span className="text-sm text-gray-600 select-none">{icon} {checkboxLabel}</span>
              )}
            </label>
          )}
          
          {/* Label utama dengan tooltip */}
          <div className="flex items-center">
            <span 
              className={`flex items-center gap-2 label-text text-base text-nowrap font-semibold ${classLabel} ${disabled ? 'text-gray-400' : ''}`}
              id={`${labelId}-text`}
            >
              {icon} {label}
              {star ? <span className='text-red-500'> *</span> : ''}
            </span>
            {tooltip && (
              <span className={`text-xs ml-1 tooltip tooltip-primary ${positionTip ? ('tooltip-' + positionTip) : ''}`} data-tip={dataTip}>
                <FaInfoCircle />
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Children ditempatkan di luar label checkbox */}
      <div className="mt-1">
        {React.isValidElement(children) 
          ? React.cloneElement(children, { 
              ...children.props, 
              disabled: disabled || children.props.disabled,
              // Tambahkan aria-labelledby untuk aksesibilitas
              'aria-labelledby': `${labelId}-text`
            })
          : children}
      </div>
      
      {!data && required && (
        <span className='ml-4 text-xs text-red-400'>*This field is required.</span>
      )}
    </div>
  );
};

export default Label;