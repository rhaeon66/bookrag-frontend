import "./globals.css";

// TODO: set proper metadata and shared layout (header, providers) for the BookRAG chat UI.
export const metadata = {
  title: "BookRAG",
  description: "Ask questions about the book, answered only from its content.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
