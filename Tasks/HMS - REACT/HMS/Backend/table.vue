import { useContext, useEffect, useMemo } from "react";
import { FilterCntxObj } from "../context/FilterContext";
import { RouteContextObj } from "../context/RouteContext";
import { getPathValues } from "../utils/helpers";
import { formatDigits } from "../utils/helpers";

export const Table = ({ data, table }) => {
  if (!table) return null;

  const { tableStyle, columns } = table;
  const { activeItem } = useContext(RouteContextObj);
  const currentModule = activeItem?.name || '';

  const { query, getModuleFilters } = useContext(FilterCntxObj);
  const selected = getModuleFilters(currentModule);

  const getColumns = useMemo(
    () =>
      columns
        .filter(col => col.isShow)
        .sort((a, b) => a.sequence - b.sequence),
    [columns]
  );

  useEffect(() => {
  }, [getColumns])

  const filteredData = useMemo(() => {
    let result = data;
    if (selected && Object.keys(selected).length > 0) {
      result = result.filter(row => {
        return Object.entries(selected).every(([filterName, selectedValues]) => {
          if (!Array.isArray(selectedValues) || selectedValues.length === 0) return true;

          const matchesThisFilter = getColumns.some(col => {
            const columnMatches = col.key === filterName || col.path === filterName;
            if (!columnMatches) return false;

            const cellValue = getPathValues(row, col.path);
            const text = Array.isArray(cellValue)
              ? cellValue.join(", ")
              : String(cellValue || "");

            const textLower = text.toLowerCase();

            return selectedValues.some(value => {
              // return textLower.includes(String(value).toLowerCase())
              return textLower === String(value).toLowerCase();
            }
            );
          });

          return matchesThisFilter;
        });
      });
    }
    if (query && query.trim() !== "") {
      result = result.filter(row => {
        const matchesQuery = getColumns.some(col => {
          if (!col.isSearchable) return false;

          const cellValue = getPathValues(row, col.path);
          const text = Array.isArray(cellValue)
            ? cellValue.join(", ")
            : String(cellValue || "");

          return text.toLowerCase().includes(query.toLowerCase());
        });

        return matchesQuery;
      });
    }

    return result;
  }, [data, query, getColumns, selected]);
  // filteredData = {}
  if (filteredData.length === 0) {
    return (
      <div className="table-container-wrapper no-data-container">
        <p className="no-data-message">No data matching</p>
      </div>
    );
  }

  return (
    <div className={tableStyle.wrapper || "table-container-wrapper w-full"}>
      <div className="table-wrapper hide-scrollbar">
        <table className={tableStyle?.tableCss || "tbl"}>
          <thead>
            <tr>
              {getColumns.map(col => (
                <th
                  key={col.key}
                  className={tableStyle.headerCss}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredData.map((row, rowIndex) => (
              <tr
                key={row.id || rowIndex}
                className={tableStyle.row}
              >
                {getColumns.map(col => {
                  const cellValues = getPathValues(row, col.path)
                    .map(val =>
                      col.key === "yearsOfExperience"
                        ? formatDigits(val, 2)
                        : val
                    )
                    .join(", ");

                  return (
                    <td
                      key={col.key}
                      className={tableStyle.cellCss}
                    >
                      {col.iconPath ? (
                        <div className="flex items-center gap-2">
                          <img
                            src={col.iconPath}
                            alt={col.label || ""}
                            className="w-4 h-4"
                          />
                          <span>{cellValues}</span>
                        </div>
                      ) : (
                        cellValues
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


