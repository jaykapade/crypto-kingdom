import React from "react";
import { Avatar, Table } from "antd";
import { useGetExchangesQuery } from "../services/cryptoApi";
import millify from "millify";
import HTMLReactParser from "html-react-parser";
import Loader from "./Loader";

const Exchanges = () => {
  const { data: cryptoExchanges } = useGetExchangesQuery();
  // console.log(cryptoExchanges);

  const columns = [
    {
      title: "Exchanges",
      dataIndex: "icon",
      key: "icon",
      render: ({ iconUrl, name }) => (
        <>
          <Avatar className="exchange-image" src={iconUrl} alt="exchange" />
          {name}
        </>
      ),
    },
    { title: "24h Trade Volume", dataIndex: "volume", key: "volume" },
    { title: "Markets", dataIndex: "markets", key: "markets" },
    { title: "Change", dataIndex: "change", key: "change" },
  ];

  const data = [];

  cryptoExchanges?.data?.exchanges?.map(
    ({
      id,
      iconUrl,
      name,
      volume,
      numberOfMarkets,
      marketShare,
      description,
    }) =>
      data.push({
        key: id,
        icon: { iconUrl, name },
        volume: millify(volume),
        markets: millify(numberOfMarkets),
        change: `${millify(marketShare)}%`,
        description,
      })
  );

  console.log(data);

  return cryptoExchanges ? (
    <Table
      columns={columns}
      expandable={{
        expandedRowRender: (record) =>
          HTMLReactParser(record.description || ""),
        rowExpandable: (record) => record.description,
      }}
      dataSource={data}
    />
  ) : (
    <Loader />
  );
};

export default Exchanges;
