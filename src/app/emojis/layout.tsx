import Header from '@/components/Header'

export default function ImagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Header />
      <div className="h-screen gap-6 overflow-auto bg-gradient-to-bl from-sky-50 via-pink-50 to-purple-100 px-16 py-20">
        {children}
      </div>
    </div>
  )
}
