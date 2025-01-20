/* eslint-disable react/react-in-jsx-scope */
import { DialogHeader, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from '../ui/button';
import { z } from "zod"

import { addTransaction } from '@/utils/transactions'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { METHOD_OF_PAYMENT, TRANSACTION_TYPES } from '@/utils/consts';
import { Textarea } from '../ui/textarea';

import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


const FormSchema = z.object({
    transactionType: z
        .string({
            required_error: "Please select an transaction type.",
        }),

    amount: z
        .string({
            required_error: "Please input the amount.",
        }),

    dateofExpense: z.date({
        required_error: "A date of birth is required.",
    }),
    reason: z
        .string({
            required_error: "Please input the reason.",
        }),
    methodOfPayment: z
        .string({
            required_error: "Please select an method of payment.",
        }),

})

export default function AddInputModal({ transactionType, closeModal }: any) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            transactionType,
        }
    })
    function save(data: any) {
        // let object = {
        //     type: '34ß',

        // }
        console.log(data);
        // return

        addTransaction({
            tranaction_type: data.transactionType,
            reason: data.reason,
            amount: data.amount,
            method_of_payment: data.methodOfPayment,
            expense_date: data.dateofExpense
        }).then((val) => {
            console.log({ val })
            closeModal(true)
        })


    }
    return <DialogContent className="max-w-2xl w-full">
        <DialogHeader>
            <DialogTitle className='text-xl'>Add Inputs</DialogTitle>
            <DialogDescription>
                According to your choice ,add key value.
            </DialogDescription>

        </DialogHeader>

        <div className=' w-full '>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(save)} className="w-full  grid gap-4 justify-center  grid-cols-2 ">
                    <FormField
                        control={form.control}
                        name="transactionType"
                        render={({ field }) => (
                            <FormItem className="space-y-0">
                                <FormLabel>Transaction Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a verified email to display" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {TRANSACTION_TYPES.map((item, index) => <SelectItem value={item} key={index}>{item}</SelectItem>
                                        )}

                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="methodOfPayment"

                        render={({ field }) => (
                            <FormItem className="space-y-0">
                                <FormLabel>Method of Payment</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a verified email to display" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {METHOD_OF_PAYMENT.map((item, index) => <SelectItem value={item} key={index}>{item}</SelectItem>
                                        )}

                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dateofExpense"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Date of birth</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}

                                        />
                                    </PopoverContent>
                                </Popover>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="amount"

                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Amount</FormLabel>
                                <FormControl className="relative">
                                    <Input placeholder="Amount" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="reason"
                        render={({ field }) => (
                            <FormItem className='col-span-2'>
                                <FormLabel>Reason</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Reason"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button variant='outline' onClick={() => closeModal(false)}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                </form>

            </Form>

        </div>


    </DialogContent>
}