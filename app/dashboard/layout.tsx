"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
          <section className="lg:basis-1/4 lg:static bg-main fixed top-0 right-0 left-0 border_line-style border-r-2 ">
            <div className="sticky top-4 lg:min-h-[90vh]  left-0 bottom-0">
              <HeaderDashboard />
            </div>
          </section>
          <section className="lg:basis-3/4 basis-full lg:mx-2 lg:mt-0 mt-24 lg:px-0 px-4">
            {children}
          </section>
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </main>
  );
}
