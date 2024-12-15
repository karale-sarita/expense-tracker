import { Calendar } from '@/components/ui/calendar'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { createFileRoute } from '@tanstack/react-router'
import { useMemo } from 'react'
import { BiChevronRight } from 'react-icons/bi'
import { FaBan, FaDragon, FaSearch, FaUser, FaWrench } from 'react-icons/fa'
const chartData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 190, fill: "var(--color-other)" },
]
const chartConfig = {
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
import { PieChart, Pie, Label } from 'recharts'

export const Route = createFileRoute('/landing')({
    component: LandingComponent
})


function LandingComponent() {
    const totalVisitors = useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
    }, [])
    return <div className="w-screen -z-0 overflow-auto bg-slate-700 h-screen relative items-center justify-center flex">
        <div className=" z-10 w-full flex flex-col overflow-auto h-full ">
            <div className="  bg-indigo-600/20">
                <div className="flex p-4 gap-3 items-center max-w-screen-2xl mx-auto w-full">
                    <span className="inline-flex gap-3 text-white py-2">
                        <FaDragon className='text-current h-8 w-auto' /> <span className='text-3xl font-bold'>Some title</span>
                    </span>
                    <div className="flex-grow"></div>
                    <div className="max-w-md h-min text-white gap-4 items-center w-full backdrop-blur-sm shadow-md p-3 border-2 border-white rounded-full flex overflow-clip">
                        <FaSearch />
                        <span>Search . . .</span>
                    </div>
                    <div className="bg-slate-900 p-2 h-min rounded-full">
                        <FaUser className='text-indigo-600 w-6 h-6' />
                    </div>
                </div>
            </div>
            <div className="flex-grow border-t border-dashed h-full overflow-auto w-full">
                <div className="flex max-w-screen-2xl mx-auto px-4 flex-col items-center">
                    <div className="flex w-full items-center p-4 px-6"><div className="font-bold text-3xl text-white">
                        Quick access
                    </div>

                    </div>
                    <div className="w-full items-center flex flex-wrap">
                        {[1, 1, 1, 1, 1, 1, 1].map((_) => {
                            return <div className="p-6 min-h-28 w-1/4">
                                <div className="bg-slate-900 cursor-pointer transition-all duration-150 hover:scale-110 hover:-translate-y-2 h-full w-full shadow border border-slate-600 rounded-lg text-white">
                                    <div className="flex w-full items-center flex-col">
                                        <div className="py-10 flex-grow p-4">
                                            <FaWrench className='w-12 h-auto' />
                                        </div>
                                        <div className="border-t border-dashed w-full flex p-2 justify-between items-center">
                                            <span className="text-lg font-semibold">Settings</span>
                                            <BiChevronRight className='w-6 h-6' />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                    <div className="w-full border-b border-dashed my-6"></div>
                    <div className="w-full flex p-4 gap-5">
                        <div className="flex gap-5 flex-col">
                            <Calendar
                                mode="single"
                                className="rounded-md  p-10 border dark bg-slate-900 border-slate-500 text-white"
                            />
                            <Card className="flex flex-col bg-slate-900 dark border-slate-500">
                                <CardHeader className="items-center pb-0">
                                    <CardTitle>Task list progress</CardTitle>
                                    <CardDescription>June 2024</CardDescription>
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
                                                                        Tasks
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
                        </div>
                        <Card className="flex flex-col justify-center items-center dark bg-slate-900 border-slate-500 w-full">
                            <FaBan className='w-24 h-auto text-white/20' />
                            <div className="text-2xl font-bold text-white/20">Nothing to show here!</div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
        <div className='absolute top-0 left-0 bg-indigo-600 bg-[url("https://sliced-react.vercel.app/static/media/bg-main.c01700549d14526fd32c.png")] bg-cover h-2/3 w-full [clip-path:polygon(0%_0%,100%_0%,100%_50%,0%_100%)]'></div>
    </div>
}