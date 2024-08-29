import "./StocksTable.css";
import { Stock } from "../../types/types";
import { formatDate } from "../../utils/formatDate";

type StocksTableProps = {
  stocks: Stock[];
};

export default function StocksTable({ stocks }: StocksTableProps) {
  if (stocks.length === 0) {
    return <div className="no-stocks">No stocks to display</div>;
  }

  return (
    <table className="stocks-table">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Price</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock, index) => (
          <tr key={index}>
            <td>{stock.symbol}</td>
            <td>{Math.round(stock.price)}$</td>
            <td>{formatDate(stock.lastUpdated)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
