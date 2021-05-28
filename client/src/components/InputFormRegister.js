/* eslint-disable react/prop-types */
import React from "react";
import Style from "../../public/assets/css/Register.module.css";

export default function InputFormRegister({
    type,
    name,
    id,
    label,
    value,
    handleChange,
    placeholder,
}) {
    return (
        <div className={Style.groupInputRegister}>
            <label htmlFor={id} className={Style.labelRegister}>
                {label}
            </label>
            <input
                type={type}
                name={name}
                id={id}
                onChange={handleChange}
                value={value}
                className={Style.inputRegister}
                placeholder={placeholder}
            />
        </div>
    );
}
