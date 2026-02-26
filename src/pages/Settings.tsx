import { PageHeader } from "@/components/PageHeader";

const SettingsPage = () => {
  return (
    <div className="px-8 py-10 max-w-5xl">
      <PageHeader
        title="Settings"
        description="User management, roles, and system configuration."
      />
      <p className="text-sm font-body text-muted-foreground">Settings and authentication coming in Milestone 1 (backend setup).</p>
    </div>
  );
};

export default SettingsPage;
