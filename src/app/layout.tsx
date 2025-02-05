import "./globals.css";
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <head>
          <title>Task Manager</title>
        </head>
        <body className="bg-gray-200 p-5">{children}</body>
      </html>
    );
  }
  