import { Label, Pie, PieChart } from 'recharts'

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
import { getChartDescription } from '@/utils/utils'
import useAxios from '@/hooks/useAxios'
import { useEffect, useMemo, useState } from 'react'

export const description = 'A donut chart with text'

const chartConfig = {
  housing: {
    label: 'Housing',
    color: '#E66F50',
  },
  groceries: {
    label: 'Groceries',
    color: '#FF7043',
  },
  transport: {
    label: 'Transport',
    color: '#FF5722',
  },
  utilities: {
    label: 'Utilities',
    color: '#009688',
  },
  healthcare: {
    label: 'Healthcare',
    color: '#2A9D90',
  },
  insurance: {
    label: 'Insurance',
    color: '#FF9800',
  },
  dining: {
    label: 'Dining',
    color: '#FF8A65',
  },
  leisure: {
    label: 'Leisure',
    color: '#4CAF50',
  },
  personal_care: {
    label: 'Personal Care',
    color: '#81C784',
  },
  education: {
    label: 'Education',
    color: '#FF4081',
  },
  childcare: {
    label: 'Childcare',
    color: '#26C6DA',
  },
  taxes: {
    label: 'Taxes',
    color: '#9C27B0',
  },
  gifts: {
    label: 'Gifts',
    color: '#673AB7',
  },
  family_support: {
    label: 'Family Support',
    color: '#FF9800',
  },
  investments: {
    label: 'Investments',
    color: '#D32F2F',
  },
}

export function CategoriesChart() {
  const [chartData, setChartData] = useState([])
  const axios = useAxios()

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get('/transaction/yearly')
        setChartData(response.data)
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchChartData()
  }, [axios])

  const totalExpense = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.expense, 0)
  }, [chartData])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Expense Categories</CardTitle>
        <CardDescription>{getChartDescription()}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="expense"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalExpense.toLocaleString() + '€'}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Expense
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
