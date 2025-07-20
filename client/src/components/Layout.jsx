// components/Layout.jsx
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-app-gradient text-white">
      <Navbar />
      <main className="flex-1 px-4 md:px-8 py-6">{children}</main>
    </div>
  );
}
