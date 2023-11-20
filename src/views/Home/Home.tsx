import React, { FC } from "react";

import { Table } from "../../components/home/Table/Table";

import { mockResponse } from "../../mock/data";

export const Home: FC = () => {
  return (
    <div>
      <Table items={mockResponse.data.items} />
    </div>
  );
};
