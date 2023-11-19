import React, { FC, useRef, useState } from "react";
import clsx from "clsx";

import { useClickOutside } from "../../../hooks/click-outside";

import selectStyles from "../Select/Select.module.scss";
import styles from "./DropdownCheckboxes.module.scss";

export type Checkbox = { name: string; value: string | number };

export type DropdownCheckboxesProps = {
  items: Checkbox[];
  selectedItems?: Checkbox[];
  onChange?(value: Checkbox[]): void;
  className?: string;
};
export const DropdownCheckboxes: FC<DropdownCheckboxesProps> = (props) => {
  const { items, onChange, className, selectedItems = [] } = props;

  const ref = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  useClickOutside(ref, () => setIsVisible(false));

  const selectedValues = selectedItems.map(({ value }) => value);

  const changeOption = (checkbox: Checkbox) => {
    let newCheckboxes = [...selectedItems];

    const foundItemIndex = selectedItems.findIndex(
      ({ value }) => value === checkbox.value,
    );

    if (foundItemIndex === -1) {
      newCheckboxes = [...newCheckboxes, checkbox];
    } else {
      newCheckboxes.splice(foundItemIndex, 1);
    }

    if (onChange !== undefined) onChange(newCheckboxes);
  };

  return (
    <div className={clsx(selectStyles.root, className)} ref={ref}>
      <button
        type="button"
        onClick={() => setIsVisible((prevIsVisible) => !prevIsVisible)}
        className={selectStyles.titleContainer}
      >
        <h3 className={selectStyles.title}>
          {selectedItems.map(({ name }) => name).join(", ")}
        </h3>
        <div className={selectStyles.toggler}>&#9660;</div>
      </button>
      {isVisible && (
        <ul className={selectStyles.list}>
          {items.map((item, index) => (
            <li
              className={clsx(
                selectStyles.option,
                selectedValues.includes(item.value) && styles.optionSelected,
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
