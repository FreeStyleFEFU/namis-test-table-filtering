import { format, isAfter, isBefore } from "date-fns";
import ru from "date-fns/locale/ru";

export const mapNullableValue = <T>(value: T | null) =>
  value === null ? "NULL" : String(value);

export const mapNullableDateTime = (value: string | null) =>
  value === null
    ? "NULL"
    : format(new Date(value), "dd.MM.yyyy HH:mm", { locale: ru });

export const sortById = <T>(
  items: T & { id: number }[],
  sort: "inc" | "desc",
) =>
  items.sort((a, b) => {
    const idA = a.id;
    const idB = b.id;

    if (idA < idB) {
      return sort === "inc" ? -1 : 1;
    }
    if (idA > idB) {
      return sort === "inc" ? 1 : -1;
    }

    return 0;
  });

export const sortByString = <T>(
  items: T & { title: string | null }[],
  sort: "inc" | "desc",
) =>
  items.sort((a, b) => {
    const titleA = a.title;
    const titleB = b.title;

    if (titleA === null) {
      if (titleB !== null) {
        return 1;
      }

      return 0;
    }

    if (titleB === null) {
      return -1;
    }

    if (titleA < titleB) {
      return sort === "inc" ? -1 : 1;
    }
    if (titleA > titleB) {
      return sort === "inc" ? 1 : -1;
    }

    return 0;
  });

export const sortByDate = <T>(
  items: T & { dttmCreated: string | null }[],
  sort: "inc" | "desc",
) =>
  items.sort((a, b) => {
    const dateA = a.dttmCreated;
    const dateB = b.dttmCreated;

    if (dateA === null) {
      if (dateB !== null) {
        return 1;
      }

      return 0;
    }

    if (dateB === null) {
      return -1;
    }

    if (isBefore(new Date(dateA), new Date(dateB))) {
      return sort === "inc" ? -1 : 1;
    }

    if (isAfter(new Date(dateA), new Date(dateB))) {
      return sort === "inc" ? 1 : -1;
    }

    return 0;
  });
