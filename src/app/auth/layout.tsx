import { Navbar } from "@/components/navbar";

export default function LayoutNavbar({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return(
        <div>
            <Navbar />
            <div className="flex-grow container mx-auto p-4 mb-5">
                {children}
            </div>
        </div>
    )
}