import Header from '@/components/Header'

export default function Home() {
  return (
    <div>
      <Header />
      <div className="grid h-screen grid-cols-2 gap-6 bg-gradient-to-bl from-orange-50 via-slate-50 to-emerald-100 px-16  pb-20 pt-36">
        <div>
          <p className="text-4xl">Collect, store and distribute meaningful static data</p>
        </div>
        <div></div>
      </div>
    </div>
  )
}
