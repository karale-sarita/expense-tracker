
import { useEffect } from "react";
import { DialogHeader, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from '../ui/button';
import { z } from "zod"

import { addBudget, getBudget, updateBudget } from '@/utils/transactions'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';


const FormSchema = z.object({
    expense: z
        .string({
            required_error: "Please select an transaction type.",
        }),
    bill: z
        .string({
            required_error: "Please input the budgeted amount.",
        }),
    debt: z
        .string({
            required_error: "Please input the actaul amount.",
        }),
    savings: z.string({
        required_error: "Please input the actaul amount.",
    }),
    // month: z.string().nonempty("Please select a month."),
    // year: z.string().nonempty("Please select a year."),

})
// const FormSchema = z.object({
//     expense: z.string().nonempty("Please select a transaction type."),
//     bill: z.number().min(0, "Please input a valid budgeted amount."),
//     debt: z.number().min(0, "Please input a valid actual amount."),
//     savings: z.number().min(0, "Please input a valid savings amount."),
// });
export default function AddExpenseModal({ month, year, closeModal }: any) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        // defaultValues: {
        //     expense: "",
        //     bill: 0,
        //     debt: 0,
        //     savings: 0,
        // },
    })
    const { reset, setValue } = form;
    useEffect(() => {
        console.log("Fetching budget for", { month, year });

        // Fetch data when modal opens or month/year changes
        async function fetchData() {
            console.log(month)
            const result = await getBudget(month + 1, year); // Assume `getBudget` fetches budget data from Supabase
            console.log({ result })
            if (result) {
                // Pre-fill the form with the fetched data
                reset({
                    expense: result[0].expense || "",
                    bill: result[0].bill || 0,
                    debt: result[0].debt || 0,
                    savings: result[0].savings || 0,
                });
            } else {
                // Reset the form to default values if no data is found
                reset({
                    // expense: "",
                    // bill: 0,
                    // debt: 0,
                    // savings: 0,
                });
            }
        }

        fetchData();
    }, [month, year, reset]);

    function save(data: any) {
        // console.log(data)
        // addBudget({
        //     expense: data.expense,
        //     bill: data.bill,
        //     debt: data.debt,
        //     savings: data.savings,
        //     month: data.month,
        //     year: data.year,

        // }).then((val) => {
        //     console.log({ val })
        //     closeModal(true)
        // })

        getBudget(month + 1, year).then((existingBudget) => {
            console.log({ existingBudget });

            if (existingBudget.length != 0) {
                // Update the budget if it exists
                updateBudget(data, month + 1, year).then((val) => {
                    console.log("Updated:", val);
                    closeModal(true);
                });
            } else {
                // Add a new budget if none exists
                addBudget({
                    expense: data.expense,
                    bill: data.bill,
                    debt: data.debt,
                    savings: data.savings,
                    month: month + 1,
                    year: year,

                }).then((val) => {
                    console.log({ val })
                    closeModal(true)
                })
            }
        });
    }
    return <DialogContent className="max-w-2xl w-full">
        <DialogHeader>
            <DialogTitle className='text-xl'>Add Budget</DialogTitle>
            <DialogDescription>
                Please add Budget before adding expenses ,for the current month
            </DialogDescription>

        </DialogHeader>

        <div className=' w-full '>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(save)} className="grid grid-cols-2 border-2 gap-2 p-4 rounded-md w-full" >

                    <FormField
                        control={form.control}
                        name="expense"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Expense Budget</FormLabel>
                                <FormControl>
                                    <Input placeholder="expense" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="bill"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Bill Budget</FormLabel>
                                <FormControl>
                                    <Input placeholder="bill" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="debt"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Debt Repayment Budget</FormLabel>
                                <FormControl>
                                    <Input placeholder="debt" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="savings"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Savings Budget</FormLabel>
                                <FormControl>
                                    <Input placeholder="savings" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {/* <FormField
                        control={form.control}
                        name="month"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Month</FormLabel>
                                <FormControl>
                                    <select
                                        className="border rounded-md p-2"
                                        {...field}
                                        defaultValue=""
                                    >
                                        <option value="" disabled>
                                            Select Month
                                        </option>
                                        {Array.from({ length: 12 }, (_, i) => (
                                            <option key={i} value={i + 1}>
                                                {new Date(0, i).toLocaleString("default", { month: "long" })}
                                            </option>
                                        ))}
                                    </select>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="year"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Year</FormLabel>
                                <FormControl>
                                    <select
                                        className="border rounded-md p-2"
                                        {...field}
                                        defaultValue=""
                                    >
                                        <option value="" disabled>
                                            Select Year
                                        </option>
                                        {Array.from({ length: 10 }, (_, i) => (
                                            <option key={i} value={new Date().getFullYear() + i}>
                                                {new Date().getFullYear() + i}
                                            </option>
                                        ))}
                                    </select>
                                </FormControl>
                            </FormItem>
                        )}
                    /> */}
                    <div className="w-full flex gap-4 mt-4 justify-end col-span-2">
                        <Button variant='outline' onClick={() => closeModal(false)}>Cancel</Button>
                        <Button type="submit">Submit</Button>
                    </div>
                </form>

            </Form>

        </div>


    </DialogContent>
}