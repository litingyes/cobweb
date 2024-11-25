import Header from '@/components/Header'

export default function Home() {
  return (
    <div>
      <Header />
      <div className="grid h-screen grid-cols-2 gap-6 bg-gradient-to-bl from-orange-50 via-slate-50 to-emerald-100 px-16  pb-20 pt-36">
        <div>
          <p className="text-5xl">Collect, store and distribute meaningful static data</p>
          <p className="mt-4 text-3xl text-neutral-500">These data can be used to help develop more valuable and meaningful products.</p>
        </div>
        <div></div>
      </div>
    </div>
  )
}
