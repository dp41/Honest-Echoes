export const metadata = {
  title: 'Honest Echoes',
  description: 'Real feedback from real people.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}