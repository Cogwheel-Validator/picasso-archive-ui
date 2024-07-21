import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About the App',
  openGraph: {
    title: 'About the App',
  },
}

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}