import React from "react";
import classNames from "classnames";

import styles from "./Button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  color?: "primary" | "reset" | "error";
  disabled?: boolean;
}

export const Button = ({
  children,
  onClick,
  type = "button",
  className,
  color = "primary",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={classNames(styles.button, className, {
        [styles.primary]: color === "primary",
        [styles.reset]: color === "reset",
        [styles.error]: color === "error",
      })}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
