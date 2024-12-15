import { createFileRoute } from '@tanstack/react-router'

import { Button } from "@/components/ui/button"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { CopyIcon } from "@radix-ui/react-icons"

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
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
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
import {
  ColumnDef
} from "@tanstack/react-table"
import React, { useState } from 'react'
import AddInputModal from '@/components/custom/add-input-modal'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import supabase from '@/utils/supabase'
import { MonthPicker } from '@/components/month-picker'
import { TRANSACTION_TYPES } from '@/utils/consts'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { getTransactionsForMonth } from '@/utils/transactions'
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

// const invoices = [
//   {
//     invoice: "INV001",
//     paymentStatus: "Paid",
//     totalAmount: "$250.00",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV002",
//     paymentStatus: "Pending",
//     totalAmount: "$150.00",
//     paymentMethod: "PayPal",
//   },
//   {
//     invoice: "INV003",
//     paymentStatus: "Unpaid",
//     totalAmount: "$350.00",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     invoice: "INV004",
//     paymentStatus: "Paid",
//     totalAmount: "$450.00",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV005",
//     paymentStatus: "Paid",
//     totalAmount: "$550.00",
//     paymentMethod: "PayPal",
//   },
//   {
//     invoice: "INV006",
//     paymentStatus: "Pending",
//     totalAmount: "$200.00",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     invoice: "INV007",
//     paymentStatus: "Unpaid",
//     totalAmount: "$300.00",
//     paymentMethod: "Credit Card",
//   },
// ]
export const Route = createFileRoute('/expense/dashboard')({
  component: InputExp
})
export const columns: ColumnDef[] = [
  {
    accessorKey: "id",
    header: "Invoice",
  },
  {
    accessorKey: "reason",
    header: "Reason",
  },
  {
    accessorKey: "payment_method",
    header: "Method",
  },
  {
    accessorKey: "amount",
    header: "Amount",

    // header: () => <div className="text-right">Amount</div>,
    // cell: ({ row }) => {
    //   const amount = parseFloat(row.getValue("amount"))
    //   // const formatted = new Intl.NumberFormat("en-US", {
    //   //   style: "currency",
    //   //   currency: "Rs",
    //   // }).format(amount)

    //   return <div className="text-right font-medium">{formatted}</div>
    // },
  },
]
function InputExp() {
  const [isOpen, setIsOpen] = useState(false);
  // const data = []
  const addModal = () => {
    setIsOpen(true); // Open the dialog
  };
  function closeModal(shouldRefetch: boolean) {
    setIsOpen(false); // Close the dialog
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

  // Save data using Mutation
  // const mutation = useMutation({
  //   mutationFn: async (newData) => {
  //     const { error } = await supabase.from("savings").insert(newData);
  //     if (error) throw new Error(error.message);
  //   },
  //   onSuccess: () => {
  //     // queryClient.invalidateQueries("invoices");
  //     // Refetch invoices after save
  //     setIsOpen(false); // Close the modal
  //   },
  // });

  const handleAdd = async (newData) => {
    // mutation.mutate(newData); // Trigger save
    const { data, error } = await supabase.from("savings").select();
    if (error) throw new Error(error.message);
    setInvoices(data)
    return data;
  };


  return (
    <div className="flex overflow-auto flex-col gap-4 w-full p-8">
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
      <div className="overflow-auto flex w-full flex-col max-w-screen-xl mx-auto">
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
        {/* Tabs */}
        <div>
          <div className="w-full border-b my-4"></div>
          <div className="w-full flex items-center">
            <h3 className="text-xl font-medium">Transactions</h3>
            <div className="flex-grow"></div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className='bg-primary text-primary-foreground' onClick={addModal}>Add</Button>
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
            {TRANSACTION_TYPES.map((item, index) =>
              <TabsContent key={index} value={item} className='w-full'>
                {
                  isLoading ? 'Loading' :
                    error ? "Something went wrong" :
                      <Table >
                        <TableCaption>A list of your recent invoices.</TableCaption>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[100px]">Invoice</TableHead>
                            <TableHead>Reason</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {data?.filter(el => el.tranaction_type == item).map((invoice) => (
                            <TableRow key={invoice.id}>
                              <TableCell className="font-medium">{invoice.id}</TableCell>
                              <TableCell>{invoice.reason}</TableCell>
                              <TableCell>{invoice.paymentStatus}</TableCell>
                              <TableCell>{invoice.paymentMethod}</TableCell>
                              <TableCell className="text-right">{invoice.amount}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                        <TableFooter>
                          <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">$2,500.00</TableCell>
                          </TableRow>
                        </TableFooter>
                      </Table>
                }

              </TabsContent>
            )}


            <TabsContent value='bills' className='w-full'>

              {/* <DataTable columns={columns} data={invoices} /> */}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div >)
}