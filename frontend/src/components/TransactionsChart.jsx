import { useEffect, useState } from 'react'
import useAxios from '@/hooks/useAxios'
import { getChartDescription } from '@/utils/utils'

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

const chartConfig = {
  expense: {
    label: 'Expense',
    color: 'hsl(var(--chart-1))',
  },
  income: {
    label: 'Income',
    color: 'hsl(var(--chart-2))',
  },
}

export function TransactionsChart() {
  const [chartData, setChartData] = useState([])
  const axios = useAxios()

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get('/transaction/monthly')
        setChartData(response.data)
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchChartData()
  }, [axios])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your monthly transactions</CardTitle>
        <CardDescription>{getChartDescription()}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
            <Bar dataKey="income" fill="var(--color-income)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
