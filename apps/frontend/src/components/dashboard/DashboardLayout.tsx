import type { ReactNode } from "react";
import DashboardNavbar from "./DashboardNavbar";
import ChatAssistant from "./chat/ChatAssistant";
import Footer from "../layout/Footer";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col justify-between relative transition-colors">
      <div>
        <DashboardNavbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {children}
        </main>
      </div>

      <Footer />

      <ChatAssistant />
    </div>
  );
};

export default DashboardLayout;