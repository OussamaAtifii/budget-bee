import { CategoriesChart } from '@/components/CategoriesChart'
import { TransactionsChart } from '@/components/TransactionsChart'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useAxios from '@/hooks/useAxios'
import { formatCurrency, getAvatarWords } from '@/utils/utils'
import { useEffect, useState } from 'react'

const DashboardPage = () => {
  const axios = useAxios()
  const [totals, setTotals] = useState({
    totalExpense: 0,
    totalIncome: 0,
    dailyAvg: 0,
  })

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const response = await axios.get('/transaction/totals')
        setTotals((prevData) => ({
          ...prevData,
          totalExpense: response.data.totalExpense,
          totalIncome: response.data.totalIncome,
          dailyAvg: response.data.dailyAvg,
        }))
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchTotals()
  }, [axios])

  return (
    <>
      <header className="flex justify-between pb-8">
        <h1 className="font-semibold text-3xl">Dashboard</h1>
        <Avatar>
          <AvatarFallback>{getAvatarWords()}</AvatarFallback>
        </Avatar>
      </header>
      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Expenses</CardTitle>
          </CardHeader>
          <CardContent className="text-xl font-bold">
            <p>{formatCurrency(totals.totalExpense)}€</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Income</CardTitle>
          </CardHeader>
          <CardContent className="text-xl font-bold">
            <p>{formatCurrency(totals.totalIncome)}€</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Average Daily Expense</CardTitle>
          </CardHeader>
          <CardContent className="text-xl font-bold">
            <p>{formatCurrency(totals.dailyAvg)}€</p>
          </CardContent>
        </Card>
        <div className="sm:col-span-2">
          <TransactionsChart />
        </div>
        <CategoriesChart />
      </div>
    </>
  )
}

export default DashboardPage
