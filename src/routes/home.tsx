import { Button } from '@/components/ui/button'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { BiSun, } from 'react-icons/bi'
import { FaDragon, FaEvernote, FaUser } from 'react-icons/fa'
import { MdFullscreen, MdSettings, MdWindow } from 'react-icons/md'
import { RiAppsFill, RiArrowDownSFill, RiMenu2Fill, RiNotification2Fill, RiPieChart2Fill, RiSearch2Line } from 'react-icons/ri'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Toggle } from '@/components/ui/toggle'
import { useEffect, useState } from 'react'


export const Route = createFileRoute('/home')({
    component: HomeComponent
})


// <Outlet />

function HomeComponent() {
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        function onFullscreenChange() {
            setIsFullscreen(Boolean(document.fullscreenElement));
        }

        document.addEventListener('fullscreenchange', onFullscreenChange);

        return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
    }, []);
    useEffect(()=>{
        if(isFullscreen){
            document.querySelector('body')?.requestFullscreen()
        }else{
            document.exitFullscreen()
        }
    },[isFullscreen])
    return <div className="w-screen dark h-screen bg-slate-700 flex relative">
        <div className="h-screen w-20 flex-col flex justify-center items-center bg-slate-900 shadow-md">
            <div className=" p-4 h-20 flex justify-center items-center w-full text-center">
                <Button className='text-indigo-600' variant='ghost'><FaDragon className='w-8 h-auto' /></Button>
            </div>
            <div className="flex-grow flex flex-col gap-2 items-center overflow-auto py-2 w-full border-slate-700">
                {
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((el, key) => {
                        return <div className='p-2 cursor-pointer text-white hover:bg-indigo-600/30 hover:rounded-md hover:text-indigo-600'>
                            <RiPieChart2Fill className='w-8 h-8' />
                        </div>
                    })
                }
            </div>
            <div className="p-2 w-full text-center">
                <Button className='text-indigo-600' variant='ghost'><MdSettings className='w-8 h-auto' /></Button>
            </div>
        </div>
        <div className="h-full flex flex-col border-l border-r border-r-solid border-dashed border-slate-700 max-w-xs w-full bg-slate-900">
            <div className="flex h-20 border-b border-dashed border-slate-700 gap-3 p-2 items-center">
                <Link to='/landing' className="p-2 font-semibold text-left text-2xl text-indigo-600">
                    Reg Tech App
                </Link>
            </div>
            <div className="flex-grow w-full h-full p-2 gap-2 flex flex-col overflow-auto">
                {[1, 1, 0, 1, 1, 1, 1, 1].map((el, key) => {
                    if (el == 1) {
                        return <div className="w-full flex gap-2 items-center rounded-md hover:bg-slate-400/30 cursor-pointer p-2 text-white">
                            <MdWindow className='w-6 h-6' />
                            <span className="font-semibold text-lg">Some Option</span>
                        </div>
                    } else {
                        return <>
                            <div className="w-full flex gap-2 items-center rounded-md hover:bg-slate-400/30 cursor-pointer p-2 text-white">
                                <RiAppsFill className='w-6 h-6' />
                                <span className="font-semibold flex-grow text-lg">Some Option</span>
                                <RiArrowDownSFill className='w-6 h-6' />
                            </div>
                            <div className="flex w-full">
                                <div className="h-full p-2 py-4 pl-4">
                                    <div className="h-full border-l border-slate-400/30"></div>
                                </div>
                                <div className="flex flex-col w-full">
                                    {[1, 1, 0, 1, 1, 1, 1, 1].map((el, key) => {
                                        return <div className="w-full flex gap-2 items-center rounded-md hover:bg-slate-400/30 cursor-pointer p-2 text-white">
                                            <FaEvernote className='w-6 h-6' />
                                            <span className="font-semibold text-lg">Some Option</span>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </>
                    }
                })}
            </div>
        </div>
        <div className="h-screen w-full overflow-auto flex flex-col">
            <div className="h-full flex flex-col border-r-solid border-dashed border-slate-700 w-full">
                <div className="flex p-4 bg-slate-900 h-20 border-b border-dashed border-slate-700 gap-3 items-center">
                    <Button className='px-4 py-2 text-white hover:text-slate-700' variant='ghost'>
                        <RiMenu2Fill className='w-6 h-6 text-current' />
                    </Button>
                    <div className="flex cursor-pointer gap-2 h-full text-white items-center">
                        <RiSearch2Line className='w-6 h-6' />
                        <div className="text-lg font-semibold">Search...</div>
                    </div>
                    <div className="flex-grow w-full"></div>
                    <Button onClick={_ => {
                        setIsFullscreen(!isFullscreen);
                    }} className='px-4 py-2 text-white hover:text-slate-300' variant='ghost'>
                        <MdFullscreen className='w-6 h-6 text-current' />
                    </Button>
                    <Toggle aria-label="Toggle bold">
                        <BiSun className="h-6 w-6 text-yellow-400 checked:text-white" />
                    </Toggle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className='ring-2 ring-white flex justify-center items-center bg-white'>
                                <RiNotification2Fill className='w-6 h-6 text-slate-900' />
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className=' border-slate-100/60 w-96 overflow-auto flex flex-col bg-indigo-700' align="end">
                            <div className="flex p-2 gap-2 items-center max-w-sm w-full">
                                <span className="text-white text-xl font-medium flex-grow">
                                    Notifications
                                </span>
                                <Button className='text-white/70' variant='link'>View All</Button>
                            </div>
                            <div className="flex-grow flex flex-col gap-2 p-2 bg-white rounded-sm h-96 overflow-auto">
                                {
                                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((el) => {
                                        return <div className="flex p-2 rounded gap-2 bg-slate-500/10">
                                            <Avatar className='ring-2 ring-white flex justify-center items-center bg-slate-800/20'>
                                                <FaUser className='w-6 h-6 text-slate-900' />
                                            </Avatar>
                                            <div className="overflow-auto cursor-pointer">
                                                <div className="text-md overflow-x-clip font-semibold whitespace-nowrap text-ellipsis">Lorem  Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit facilis, unde optio odio quisquam pariatur temporibus, libero dicta magni totam nam! Aliquid excepturi perspiciatis, asperiores sunt fuga culpa. Provident, voluptatem!Ipsum dolor set</div>
                                                <div className="whitespace-nowrap overflow-x-clip text-ellipsis">Lorem Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit deserunt sed ea voluptas dignissimos dolore iste laborum beatae tenetur, sapiente labore nesciunt officiis error aliquid delectus dolores fugit quibusdam vel. Ipsum dolor set</div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className='ring-2 ring-white'>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
                <div className="flex-grow w-full h-full overflow-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    </div>
}