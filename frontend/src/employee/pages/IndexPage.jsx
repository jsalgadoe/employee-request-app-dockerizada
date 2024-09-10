import { TableDataGrid } from "../../ui/components/employee/TableDataGrid";
import { EmployeeLayout } from "../layout/EmployeeLayout";

export const IndexPage = () => {
  return (
    <EmployeeLayout>
      <div>IndexPage emloyee</div>;
      <TableDataGrid />
    </EmployeeLayout>
  );
};
