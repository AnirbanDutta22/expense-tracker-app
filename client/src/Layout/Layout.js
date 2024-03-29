import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow flex items-start justify-center h-[calc(100vh-20%)] bg-light-blue-50">
        {children}
      </div>
    </div>
  );
}
