import { createFileRoute } from '@tanstack/react-router'

import { Button } from "@/components/ui/button"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ColumnDef } from '@tanstack/react-table'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
// import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
// import { Label } from "@/components/ui/label"
// import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { Label, Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {

} from "@/components/ui/chart"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import React, { useState } from 'react'
import AddInputModal from '@/components/custom/transaction-input-modal'
import { useQuery } from '@tanstack/react-query'
import { MonthPicker } from '@/components/month-picker'
import { TRANSACTION_TYPES } from '@/utils/consts'
import { getTransactionsForMonth } from '@/utils/transactions'
import { PlusIcon } from 'lucide-react'
import { FaMoneyBill } from 'react-icons/fa'
import AddExpenseModal from '@/components/custom/budget-input-modal'
const chartData = [
  { month: "Income", budget: 186, actual: 80 },
  { month: "Savings", budget: 305, actual: 200 },
  { month: "Bills", budget: 237, actual: 120 },
  { month: "Expenses", budget: 73, actual: 190 },
  { month: "Debt", budget: 209, actual: 130 },
]
const chartConfig = {
  budget: {
    label: "budget",
    color: "#2563eb",
  },
  actual: {
    label: "actual",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export const description = "A donut chart with text"

// const queryClient = useQueryClient();  
const pieChart = [
  { browser: "actual", visitors: 100, fill: "var(--color-chrome)" },
  { browser: "budget", visitors: 200, fill: "var(--color-safari)" },
]
const pieChartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig


export const Route = createFileRoute('/expense/dashboard')({
  component: InputExp
})

function InputExp() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBudget, setIsBudget] = useState(false);
  // const data = []
  const addModal = () => {
    setIsOpen(true); // Open the dialog
  };
  const addBudget = () => {
    setIsBudget(true);
  }
  function closeModal(shouldRefetch: boolean) {
    setIsOpen(false); // Close the dialog
    if (shouldRefetch) refetch()
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function closeBudgetModal(shouldRefetch: boolean) {
    setIsBudget(false); // Close the dialog
    if (shouldRefetch) refetch()
  };
  const totalVisitors = React.useMemo(() => {
    return pieChart.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [])

  const [{ month, year }, setMonthYear] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  })
  // Fetch transaction
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["transactions", month, year],
    queryFn: async () => {
      return await getTransactionsForMonth(month, year)

    },

  });

  const [selctedTab, setTab] = useState(TRANSACTION_TYPES[0])

  return (
    <div className="flex overflow-auto h-screen flex-col gap-4 w-full p-8">
      <div className="flex items-center max-w-screen-xl mx-auto w-full">
        <div className='text-2xl font-semibold mb-8 w-full'>Expense Tracker</div>
        <div className="flex-grow"></div>
        <MonthPicker selectedMonth={month} selectedYear={year} onChange={(m, y) => {
          setMonthYear({
            month: m,
            year: y
          })
        }} />

      </div>
      <div className="flex w-full flex-col max-w-screen-xl mx-auto">
        <div className='grid grid-cols-9 gap-4 w-full'>
          <Card className="col-span-3">
            <CardHeader className="items-center pb-0">
              <CardTitle>Budget Vs Actual</CardTitle>
              {/* <CardDescription>January - June 2024</CardDescription> */}
            </CardHeader>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="budget" fill="var(--color-budget)" radius={4} />
                <Bar dataKey="actual" fill="var(--color-actual)" radius={4} />
              </BarChart>
            </ChartContainer>
          </Card>
          <Card className="flex flex-col col-span-2">
            <CardHeader className="items-center pb-0">
              <CardTitle>Pie Chart - Donut with Text</CardTitle>
              <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={pieChartConfig}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={pieChart}
                    dataKey="visitors"
                    nameKey="browser"
                    innerRadius={60}
                    strokeWidth={5}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
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
                                className="fill-foreground text-3xl font-bold"
                              >
                                {totalVisitors.toLocaleString()}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                              >
                                Visitors
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
            {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
          </Card>
          <Card className="flex flex-col col-span-2">
            <CardHeader className="items-center pb-0">
              <CardTitle>Pie Chart - Donut with Text</CardTitle>
              <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={pieChartConfig}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={pieChart}
                    dataKey="visitors"
                    nameKey="browser"
                    innerRadius={60}
                    strokeWidth={5}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
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
                                className="fill-foreground text-3xl font-bold"
                              >
                                {totalVisitors.toLocaleString()}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                              >
                                Visitors
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
            {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
          </Card>
          <Card className="flex flex-col col-span-2">
            <CardHeader className="items-center pb-0">
              <CardTitle>Pie Chart - Donut with Text</CardTitle>
              <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={pieChartConfig}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={pieChart}
                    dataKey="visitors"
                    nameKey="browser"
                    innerRadius={60}
                    strokeWidth={5}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
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
                                className="fill-foreground text-3xl font-bold"
                              >
                                {totalVisitors.toLocaleString()}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                              >
                                Visitors
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
            {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
          </Card>
        </div>
        <div>
          <div className="w-full border-b my-4"></div>
          <div className="w-full flex gap-3 items-center">
            <h3 className="text-xl font-medium">Transactions</h3>
            <div className="flex-grow"></div>
            {/* <Button variant='outline' className='gap-3' onClick={}>
              <FaMoneyBill className='w-4' />
              My Money
            </Button> */}
            <Dialog open={isBudget} onOpenChange={setIsBudget}>
              <DialogTrigger asChild>
                <Button variant='outline' className='gap-3' onClick={addBudget}>
                  <FaMoneyBill className='w-4' />
                  My Money
                </Button>
              </DialogTrigger>
              {isBudget && <AddExpenseModal closeModal={setIsBudget} month={month} year={year} />}

            </Dialog>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button onClick={addModal} className='gap-3'>
                  <PlusIcon className='w-4' />
                  Add transaction</Button>
              </DialogTrigger>
              <AddInputModal closeModal={closeModal} transactionType={selctedTab} />
            </Dialog>



          </div>
          <Tabs value={selctedTab} onValueChange={val => {
            setTab(val)
          }} className="w-full mt-8">
            <TabsList className="grid w-full grid-cols-4">
              {TRANSACTION_TYPES.map((item, index) => <TabsTrigger key={index} value={item}>{item}</TabsTrigger>)}
            </TabsList>
            {TRANSACTION_TYPES.map((item, index) => {
              console.log(data)
              const total = data?.filter(el => el.tranaction_type == item).map(el => (el?.amount ?? 0)).reduce((sum, el) => sum + (el ?? 0), 0);

              return (
                <TabsContent key={index} value={item} className='w-full'>
                  {
                    isLoading ? <div className="w-full p-32 flex justify-center items-center">
                      <div className="w-8 h-8 bg-primary rounded-full animate-ping"></div>
                    </div> :
                      error ? "Something went wrong" :
                        <Table >
                          <TableCaption>A list of your recent invoices.</TableCaption>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[100px]">Invoice</TableHead>
                              <TableHead>Reason</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Method</TableHead>
                              <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {data?.filter(el => el.tranaction_type == item).map((invoice) => {
                              const expenseDate = new Date(invoice.expense_date)
                              // expenseDate.setMinutes(expenseDate.getMinutes() + expenseDate.getTimezoneOffset())
                              return <TableRow key={invoice.id}>
                                <TableCell className="font-medium">{invoice.id}</TableCell>
                                <TableCell>{invoice.reason}</TableCell>
                                <TableCell>{(expenseDate.toDateString())}</TableCell>
                                <TableCell>{invoice.method_of_payment}</TableCell>
                                <TableCell className="text-right">₹ {(invoice.amount ?? 0).toLocaleString()}</TableCell>
                              </TableRow>
                            })}
                          </TableBody>
                          <TableFooter>
                            <TableRow>
                              <TableCell colSpan={4}>Total</TableCell>
                              <TableCell className="text-right">₹ {(total ?? 0).toLocaleString()}</TableCell>
                            </TableRow>
                          </TableFooter>
                        </Table>
                  }

                </TabsContent>
              )
            }
            )}


            <TabsContent value='bills' className='w-full'>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div >)
}