import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useMemo } from "react";
import sourceData from "./source-data.json";
import type { SourceDataType, TableDataType } from "./types";

/**
 * Example of how a tableData object should be structured.
 *
 * Each `row` object has the following properties:
 * @prop {string} person - The full name of the employee.
 * @prop {number} past12Months - The value for the past 12 months.
 * @prop {number} y2d - The year-to-date value.
 * @prop {number} may - The value for May.
 * @prop {number} june - The value for June.
 * @prop {number} july - The value for July.
 * @prop {number} netEarningsPrevMonth - The net earnings for the previous month.
 */

const tableData: TableDataType[] = (
  sourceData.filter(dataRow => dataRow.employees !== undefined || dataRow.externals !== undefined) as unknown as SourceDataType[]
).map((dataRow, index) => {

  const person = dataRow.employees !== undefined ? dataRow.employees.name : dataRow.externals?.name;

  
  const row: TableDataType = dataRow.employees !== undefined ? {
    person: `${person}`,
    past12Months: `${(parseFloat(dataRow?.employees?.workforceUtilisation?.utilisationRateLastTwelveMonths || '0') * 100)}%`,
    y2d: `${(parseFloat(dataRow?.employees?.workforceUtilisation?.utilisationRateYearToDate || '0') * 100)}%`,
    may: `${(parseFloat(dataRow?.employees?.workforceUtilisation?.lastThreeMonthsIndividually?.find(month => month.month === 'May')?.utilisationRate || '0') * 100)}%`,
    june: `${(parseFloat(dataRow?.employees?.workforceUtilisation?.lastThreeMonthsIndividually?.find(month => month.month === 'June')?.utilisationRate || '0') * 100)}%`,
    july: `${(parseFloat(dataRow?.employees?.workforceUtilisation?.lastThreeMonthsIndividually?.find(month => month.month === 'July')?.utilisationRate || '0') * 100)}%`,
    netEarningsPrevMonth: `${(parseFloat(dataRow?.employees?.workforceUtilisation?.monthlyCostDifference || '0') )} EUR`,
  } : {
    person: `${dataRow.externals?.name}`,
    past12Months: `${(parseFloat(dataRow.externals?.workforceUtilisation?.utilisationRateLastTwelveMonths || '0') * 100)}%`,
    y2d: `${(parseFloat(dataRow.externals?.workforceUtilisation?.utilisationRateYearToDate || '0') * 100)}%`,
    may: `${(parseFloat(dataRow.externals?.workforceUtilisation?.lastThreeMonthsIndividually?.find(month => month.month === 'May')?.utilisationRate || '0') * 100)}%`,
    june: `${(parseFloat(dataRow.externals?.workforceUtilisation?.lastThreeMonthsIndividually?.find(month => month.month === 'June')?.utilisationRate || '0') * 100)}%`,
    july: `${(parseFloat(dataRow.externals?.workforceUtilisation?.lastThreeMonthsIndividually?.find(month => month.month === 'July')?.utilisationRate || '0') * 100)}%`,
    netEarningsPrevMonth: `${(parseFloat(dataRow.externals?.workforceUtilisation?.monthlyCostDifference || '0') )} EUR`,
  };

  return row;
});

console.log(sourceData);

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<TableDataType>[]>(
    () => [
      {
        accessorKey: "person",
        header: "Person",
      },
      {
        accessorKey: "past12Months",
        header: "Past 12 Months",
      },
      {
        accessorKey: "y2d",
        header: "Y2D",
      },
      {
        accessorKey: "may",
        header: "May",
      },
      {
        accessorKey: "june",
        header: "June",
      },
      {
        accessorKey: "july",
        header: "July",
      },
      {
        accessorKey: "netEarningsPrevMonth",
        header: "Net Earnings Prev Month",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: tableData,
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
