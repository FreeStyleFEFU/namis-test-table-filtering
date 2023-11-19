import { SelectItem } from "../components/common/Select/Select";
import { SortIds } from "../types/select";
import { ReactLevels, Tags } from "../types/data";
import { Checkbox } from "../components/common/DropdownCheckboxes/DropdownCheckboxes";

export type TechnicalTaskSelectItem = SelectItem & {
  description: string;
};

export const technicalTaskSelectItems: TechnicalTaskSelectItem[] = [
  {
    name: "Пункт 1",
    value: 1,
    description:
      "Сортировка по возрастанию/убыванию по полю id, чтобы поля со значениями NULL были всегда внизу вне зависимости от сортировки",
  },
  {
    name: "Пункт 2",
    value: 2,
    description:
      "Сортировка по алфавиту а-я/я-а по полю title, чтобы поля со значениями NULL были всегда внизу вне зависимости от сортировки",
  },
  {
    name: "Пункт 3",
    value: 3,
    description:
      "Cортировка по дате по полю dttmCreated, чтобы поля со значениями NULL были всегда внизу вне зависимости от сортировки",
  },
  {
    name: "Пункт 4",
    value: 4,
    description: "Фильтр по части слова по полю title,  регистроНЕзависимое",
  },
  {
    name: "Пункт 5",
    value: 5,
    description:
      "Фильтр по части слова по полю description, неполное совпадение (сжимание нескольких пробелов в один), регистроЗависимое",
  },
  {
    name: "Пункт 6",
    value: 6,
    description:
      'Фильтр: выбор из раскрывающегося списка Boolean по полю reactLevel ("none","warning","critical")',
  },
  {
    name: "Пункт 7",
    value: 7,
    description:
      'Фильтр: выбор из раскравающегося списка CHECK BOX по полю tags, подходящяя сторка та, которая содержит хотя бы один из выборанных «Флагов» ("альфа", "бета", "гамма","омега", "сигма")',
  },
];

export const sortByIdAOrTimeSelectItems: SelectItem[] = [
  {
    name: "Без сортировки",
    value: SortIds.Default,
  },
  {
    name: "По возрастанию",
    value: SortIds.Increasing,
  },
  {
    name: "По убыванию",
    value: SortIds.Descending,
  },
];

export const sortByStringSelectItems: SelectItem[] = [
  {
    name: "Без сортировки",
    value: SortIds.Default,
  },
  {
    name: "а-я",
    value: SortIds.Increasing,
  },
  {
    name: "я-а",
    value: SortIds.Descending,
  },
];

export const reactLevelItems: SelectItem[] = [
  {
    name: ReactLevels.None,
    value: ReactLevels.None,
  },
  {
    name: ReactLevels.Critical,
    value: ReactLevels.Critical,
  },
  {
    name: ReactLevels.Warning,
    value: ReactLevels.Warning,
  },
];

export const tagsItems: Checkbox[] = [
  {
    name: Tags.Alpha,
    value: Tags.Alpha,
  },
  {
    name: Tags.Beta,
    value: Tags.Beta,
  },
  {
    name: Tags.Gamma,
    value: Tags.Gamma,
  },
  {
    name: Tags.Omega,
    value: Tags.Omega,
  },
  {
    name: Tags.Sigma,
    value: Tags.Sigma,
  },
];
