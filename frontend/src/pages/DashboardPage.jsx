import { CategoriesChart } from '@/components/CategoriesChart'
import { TransactionsChart } from '@/components/TransactionsChart'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { getAvatarWords } from '@/utils/utils'

const DashboardPage = () => {
  return (
    <>
      <header className="flex justify-between pb-8">
        <h1 className="font-semibold text-3xl">Dashboard</h1>
        <Avatar>
          <AvatarFallback>{getAvatarWords()}</AvatarFallback>
        </Avatar>
      </header>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <TransactionsChart />
        </div>
        <CategoriesChart />
      </div>
    </>
  )
}

export default DashboardPage
