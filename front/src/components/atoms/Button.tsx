
import React from 'react';

interface ButtonProps {
    onClick?: () => void;
    label: string;
    style:string;
    type?:'submit' | 'reset' | 'button';
}

const Button: React.FC<ButtonProps> = ({ onClick, label, style, type }) => (
    <button type={type} onClick={onClick} className={style} >
        {label}
    </button>
);

export default Button;
