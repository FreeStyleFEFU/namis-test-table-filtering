import React, { FunctionComponent, useRef, useState } from "react";
import clsx from "clsx";

import { useClickOutside } from "../../../hooks/click-outside";

import styles from "./Select.module.scss";

export type SelectItem = { name: string; value: string | number };

export type SelectProps = {
  items: SelectItem[];
  selectedItem?: SelectItem;
  onChange?(value: SelectItem): void;
  className?: string;
};
export const Select: FunctionComponent<SelectProps> = (props) => {
  const {
    items,
    onChange,
    className,
    selectedItem = { name: "Выберите опцию", value: 0 },
  } = props;

  const ref = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  useClickOutside(ref, () => setIsVisible(false));

  const changeOption = (value: SelectItem) => {
    if (onChange !== undefined) onChange(value);
    setIsVisible(false);
  };

  return (
    <div className={clsx(styles.root, className)} ref={ref}>
      <button
        type="button"
        onClick={() => setIsVisible((prevIsVisible) => !prevIsVisible)}
        className={styles.titleContainer}
      >
        <h3 className={styles.title}>{selectedItem.name}</h3>
        <div className={styles.toggler}>&#9660;</div>
      </button>
      {isVisible && (
        <ul className={styles.list}>
          {items.map((item, index) => (
            <li
              className={clsx(
                styles.option,
                selectedItem.value === item.value && styles.optionDisabled,
              )}
              key={index}
              onClick={() => changeOption(item)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
