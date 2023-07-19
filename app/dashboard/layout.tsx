"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HeaderDashboard } from "./component/UI";
const queryClient = new QueryClient();
import "./styles/dashboard.scss";

import { Provider } from "react-redux";
import { store } from "../sevices/store";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex">
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <section className="basis-1/4 border_line-style border-r-2">
            <div className="sticky top-4 min-h-screen  left-0 bottom-0">
              <HeaderDashboard />
            </div>
          </section>
          <section className="basis-3/4 mx-2">{children}</section>
        </Provider>
      </QueryClientProvider>
    </main>
  );
}
