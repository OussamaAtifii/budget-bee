import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const BudgetLimitsPage = () => {
  return (
    <>
      <header className="flex justify-between pb-8">
        <h1 className="font-semibold text-3xl">Budget Limits</h1>
        <Avatar>
          <AvatarFallback>OU</AvatarFallback>
        </Avatar>
      </header>
      <div className="flex justify-center items-center h-1/2">
        <p>{"It's not quite ready yet."}</p>
      </div>
    </>
  )
}

export default BudgetLimitsPage
