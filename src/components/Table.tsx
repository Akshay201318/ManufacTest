import analyticsData from "../data/Wine-Data.json";
import { getClassWiseAnalytics } from "../utility";
import { columnsMap } from "../constants";
import React from "react";
import { TableProps } from "../utility/types";
import './Table.css'

const Table: React.FC<TableProps> = ({ type = "Flavanoids" }) => {
  const data = getClassWiseAnalytics({ data: analyticsData, type });
  return (
    <div className="table-wrapper">
      <h2>{`${type} Stats`}</h2>
      <table>
        <thead>
          <tr>
            <th>Measure</th>
            {data[0].map((ele, index) => (
              <th key={index}>{`Class ${index + 1}`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.values(columnsMap).map((item, index) => {
            return (
              <tr key={index}>
                <td className="measure-heading">{`${type} ${item}`}</td>
                {data[index].map((ele, colIndex) => {
                  return <td key={colIndex}>{ele}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
