import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { UsersTable } from "@/components/users/UsersTable";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <SummaryCards />
      <UsersTable />
    </div>
  );
}
