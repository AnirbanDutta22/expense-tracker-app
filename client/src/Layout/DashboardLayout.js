import Layout from "./Layout";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <Layout>
      <div className="p-4 pr-0 h-full">
        <Sidebar />
      </div>
      <div className="h-full flex p-4 pl-0 flex-grow">{children}</div>
    </Layout>
  );
}
