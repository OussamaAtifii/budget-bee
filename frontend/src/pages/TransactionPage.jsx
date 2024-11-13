import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { columns } from '@/components/transactions/Columns'
import { DataTable } from '@/components/transactions/DataTable'

import useAxios from '@/hooks/useAxios'
import { getAvatarWords } from '@/utils/utils'
import { useEffect, useState } from 'react'
import CreateTransactionModal from '@/components/transactions/CreateTransactionModal'

const TransactionPage = () => {
  const axios = useAxios()
  const [categories, setCategories] = useState([])
  const [transactions, setTransactions] = useState([])
  const [paymentMethods, setPaymentMethods] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    category: 'all',
    paymentMethod: 'all',
  })
  const [filteredTransactions, setFilteredTransactions] = useState([])

  const getUserTransactions = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/transaction/user')
      setTransactions(response.data)
      setFilteredTransactions(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get('/category')
        setCategories(response.data)
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    const getpaymentMethods = async () => {
      try {
        const response = await axios.get('/payment-method')
        setPaymentMethods(response.data)
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    getUserTransactions()
    getCategories()
    getpaymentMethods()
  }, [axios])

  const handleCategoryFilter = (category) => {
    setFilters((prev) => ({
      ...prev,
      category,
    }))

    if (category === 'all') return setFilteredTransactions(transactions)

    const filtered = transactions.filter((transaction) => {
      return transaction.category === category
    })

    setFilteredTransactions(filtered)
  }

  const handlePaymentMethodFilter = (paymentMethod) => {
    setFilters((prev) => ({
      ...prev,
      paymentMethod,
    }))

    if (paymentMethod === 'all') return setFilteredTransactions(transactions)

    const filtered = transactions.filter((transaction) => {
      return transaction.paymentMethod === paymentMethod
    })

    setFilteredTransactions(filtered)
  }

  return (
    <>
      <header className="flex justify-between pb-8">
        <h1 className="font-semibold text-3xl">Transactions</h1>
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>{getAvatarWords()}</AvatarFallback>
        </Avatar>
      </header>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between flex-row-reverse">
          <div className="hidden sm:flex gap-2">
            <Select
              onValueChange={handleCategoryFilter}
              defaultValue={filters.category}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              onValueChange={handlePaymentMethodFilter}
              defaultValue={filters.paymentMethod}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payment Methods</SelectItem>
                {paymentMethods.map((paymentMethod) => (
                  <SelectItem key={paymentMethod.id} value={paymentMethod.name}>
                    {paymentMethod.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <CreateTransactionModal
            categories={categories}
            paymentMethods={paymentMethods}
            reloadTransactions={getUserTransactions}
          />
        </div>
        <DataTable
          key={transactions.length}
          columns={columns(getUserTransactions)}
          data={filteredTransactions}
          loading={loading}
        />
      </div>
    </>
  )
}

export default TransactionPage
