"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HeaderDashboard } from "./component/UI";
const queryClient = new QueryClient();
import "./styles/dashboard.scss";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex">
      <section className="basis-1/4">
        <HeaderDashboard />
      </section>
      <section className="basis-3/4 mx-2">
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </section>
    </main>
  );
}
