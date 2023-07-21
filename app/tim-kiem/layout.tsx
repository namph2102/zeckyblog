import { Footer } from "../component";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto">
      <div className="min-h-[60vh]">{children}</div>
      <Footer />
    </div>
  );
}
