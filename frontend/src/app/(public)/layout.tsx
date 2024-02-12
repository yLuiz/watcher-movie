export const metadata = {
  title: 'Tela de Login',
  description: 'Generated by Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang='pt-br'>
      <body className="bg-slate-900">
        <main className="flex items-center justify-center w-full h-[100vh]">
          {children}
        </main>
      </body>
    </html>
  );
}
