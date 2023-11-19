import React, { FC } from "react";

import { Table } from "../../components/home/Table/Table";

import styles from "./Home.module.scss";

import { mockResponse } from "../../mock/data";

export const Home: FC = () => {
  return (
    <div className={styles.root}>
      <Table items={mockResponse.data.items} />
    </div>
  );
};
