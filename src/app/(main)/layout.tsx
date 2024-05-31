import Navbar from "../components/global/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="mx-28 my-10">{children}</main>
    </>
  );
}
