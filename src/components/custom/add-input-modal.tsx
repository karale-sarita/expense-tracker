/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react'
import { DialogHeader, DialogFooter, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from '../ui/button';
import { z } from "zod"
import { format } from "date-fns"

import { addSavings, addTransaction } from '@/utils/transactions'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '../ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { METHOD_OF_PAYMENT, TRANSACTION_TYPES } from '@/utils/consts';
import { Textarea } from '../ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { CalendarIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';



const FormSchema = z.object({
    transactionType: z
        .string({
            required_error: "Please select an transaction type.",
        }),

    amount: z
        .string({
            required_error: "Please input the amount.",
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

export default function AddInputModal({ transactionType, closeModal }) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            transactionType,
        }
    })
    function save(data) {
        // let object = {
        //     type: '34ß',

        // }
        console.log(data);

        addTransaction({
            tranaction_type: data.transactionType,
            reason: data.reason,
            amount: data.amount,
            method_of_payment: data.methodOfPayment
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
                <form onSubmit={form.handleSubmit(save)} className="w-full  grid gap-2 justify-center  grid-cols-2 space-y-6">
                    <FormField
                        control={form.control}
                        name="transactionType"
                        render={({ field }) => (
                            <FormItem>
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
                            <FormItem>
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
                        name="amount"

                        render={({ field }) => (
                            <FormItem className='col-span-2'>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
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