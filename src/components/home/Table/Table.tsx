import React, { CSSProperties, FC, useEffect, useMemo, useState } from "react";

import { DataItem, ReactLevels } from "../../../types/data";
import { SortIds } from "../../../types/select";

import {
  mapNullableDateTime,
  mapNullableValue,
  sortByDate,
  sortById,
  sortByString,
} from "../../../utils/table";

import { Select, SelectItem } from "../../common/Select/Select";
import {
  Checkbox,
  DropdownCheckboxes,
} from "../../common/DropdownCheckboxes/DropdownCheckboxes";

import styles from "./Table.module.scss";

import {
  reactLevelItems,
  sortByIdAOrTimeSelectItems,
  sortByStringSelectItems,
  tagsItems,
  technicalTaskSelectItems,
} from "../../../mock/select";

type TableColumn = {
  head_title: string;
  width?: number;
};

const tableColumns: TableColumn[] = [
  { head_title: "ID", width: 100 },
  { head_title: "Фильтр" },
  { head_title: "Описание" },
  { head_title: "Создан" },
  { head_title: "Уровень", width: 150 },
  { head_title: "Действует", width: 100 },
  { head_title: "Флаги", width: 100 },
];

type TableProps = {
  items: DataItem[];
};
export const Table: FC<TableProps> = (props) => {
  const { items } = props;

  const [technicalTaskSelectedItem, setTechnicalTaskSelectedItem] =
    useState<SelectItem>(technicalTaskSelectItems[0]);
  const { value } = technicalTaskSelectedItem;

  const [selectedIdOrTimeSortItem, setSelectedIdOrTimeSortItem] =
    useState<SelectItem>(sortByIdAOrTimeSelectItems[0]);
  const [selectedTitleSortItem, setSelectedTitleSortItem] =
    useState<SelectItem>(sortByStringSelectItems[0]);
  const [selectedLevel, setSelectedLevel] = useState<SelectItem>(
    reactLevelItems[0],
  );

  const [inputValue, setInputValue] = useState("");

  const [selectedTags, setSelectedTags] = useState<Checkbox[]>([]);

  const technicalTaskSelectedItemDescription = useMemo(
    () =>
      technicalTaskSelectItems.find(
        (item) => item.value === technicalTaskSelectedItem.value,
      )?.description ?? "",
    [technicalTaskSelectedItem],
  );

  let selectItems = sortByIdAOrTimeSelectItems;
  let selectedItem = selectedIdOrTimeSortItem;

  let filteredItems = [...items];

  if (value === 1) {
    if (selectedIdOrTimeSortItem.value === SortIds.Increasing) {
      filteredItems = sortById(filteredItems, "inc");
    } else if (selectedIdOrTimeSortItem.value === SortIds.Descending) {
      filteredItems = sortById(filteredItems, "desc");
    }
  } else if (value === 2) {
    selectItems = sortByStringSelectItems;
    selectedItem = selectedTitleSortItem;

    if (selectedTitleSortItem.value === SortIds.Increasing) {
      filteredItems = sortByString(filteredItems, "inc");
    } else if (selectedTitleSortItem.value === SortIds.Descending) {
      filteredItems = sortByString(filteredItems, "desc");
    }
  } else if (value === 3) {
    if (selectedIdOrTimeSortItem.value === SortIds.Increasing) {
      filteredItems = sortByDate(filteredItems, "inc");
    } else if (selectedIdOrTimeSortItem.value === SortIds.Descending) {
      filteredItems = sortByDate(filteredItems, "desc");
    }
  } else if (value === 4) {
    filteredItems = filteredItems.filter(({ title }) =>
      title !== null
        ? title.toLowerCase().includes(inputValue.toLowerCase())
        : inputValue.length === 0,
    );
  } else if (value === 5) {
    filteredItems = filteredItems.filter(({ description }) =>
      description !== null
        ? description.replaceAll(" ", "").includes(inputValue)
        : inputValue.length === 0,
    );
  } else if (value === 6) {
    selectItems = reactLevelItems;
    selectedItem = selectedLevel;

    if (selectedLevel.value !== ReactLevels.None) {
      filteredItems = filteredItems.filter(
        ({ reactLevel }) => reactLevel === selectedLevel.value,
      );
    }
  } else if (value === 7 && selectedTags.length > 0) {
    const selectedTagsValues = selectedTags.map(({ value }) => value);

    filteredItems = filteredItems.filter(({ tags }) =>
      tags.some((tag) => selectedTagsValues.includes(tag)),
    );
  }

  const onSelectedSortItemChange = (item: SelectItem) => {
    if (value === 2) setSelectedTitleSortItem(item);
    else if (value === 6) setSelectedLevel(item);
    else setSelectedIdOrTimeSortItem(item);
  };

  useEffect(() => {
    setSelectedIdOrTimeSortItem(sortByIdAOrTimeSelectItems[0]);
    setSelectedTitleSortItem(sortByStringSelectItems[0]);
    setInputValue("");
    setSelectedLevel(reactLevelItems[0]);
    setSelectedTags([]);
  }, [technicalTaskSelectedItem]);

  return (
    <div className={styles.root}>
      <Select
        items={technicalTaskSelectItems}
        selectedItem={technicalTaskSelectedItem}
        onChange={setTechnicalTaskSelectedItem}
      />

      <p className={styles.description}>
        {technicalTaskSelectedItemDescription}
      </p>

      {(value === 1 || value === 2 || value === 3 || value === 6) && (
        <Select
          items={selectItems}
          selectedItem={selectedItem}
          onChange={onSelectedSortItemChange}
          className={styles.sortSelect}
        />
      )}

      {(value === 4 || value === 5) && (
        <input
          className={styles.input}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
      )}

      {value === 7 && (
        <DropdownCheckboxes
          items={tagsItems}
          selectedItems={selectedTags}
          onChange={setSelectedTags}
        />
      )}

      <table className={styles.table}>
        <thead>
          <tr>
            {tableColumns.map(({ head_title, width }, index) => (
              <th
                key={index}
                className={styles.tableHeadItem}
                style={{ "--width": width } as CSSProperties}
              >
                {head_title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredItems.map(
            ({
              id,
              tags,
              reactLevel,
              enabled,
              dttmCreated,
              description,
              title,
            }) => (
              <tr key={id}>
                <td className={styles.tableItem}>{id}</td>
                <td className={styles.tableItem}>{mapNullableValue(title)}</td>
                <td className={styles.tableItem}>
                  {mapNullableValue(description)}
                </td>
                <td className={styles.tableItem}>
                  {mapNullableDateTime(dttmCreated)}
                </td>
                <td className={styles.tableItem}>
                  {mapNullableValue(reactLevel)}
                </td>
                <td className={styles.tableItem}>
                  {mapNullableValue(enabled)}
                </td>
                <td className={styles.tableItem}>
                  {tags.map((tag, index) => (
                    <p key={index}>{tag}</p>
                  ))}
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
};
