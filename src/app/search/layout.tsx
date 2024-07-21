import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Search',
  openGraph: {
    title: 'Search',
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