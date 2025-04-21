import AdminHeader from "./components/adminHeader/AdminHeader";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Admin Header */}
      <AdminHeader />
      <main>{children}</main>
      {/* Admin Footer */}
    </>
  );
}