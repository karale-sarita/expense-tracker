import supabase from "./supabase";



export async function getSavings() {
    const { data, error } = await supabase.from("savings").select();
    if (data) {
        // console.log(data);

        return data;
    } else {
        throw error;
    }
}

export async function addSavings(object) {
    const { data, error } = await supabase
        .from('savings')
        .insert([
            object
        ])
        .select()

    if (data) {
        console.log(data);

        return data;
    } else {
        throw error;
    }
}



// TODO: remove above

export async function getTransactionsForMonth(month: number, year: number) {
    const startDate = new Date(year, month, 1).toISOString();
    let endDate = new Date(year, month + 1, 1).toISOString();
    if (month == 11) {
        endDate = new Date(year + 1, 0, 1).toISOString();
    }


    const { data, error } = await supabase.from("transactions").select('*')
        .gte('time_of_expense', startDate)
        .lt('time_of_expense', endDate);
    if (data) {
        return data;
    } else {
        throw error;
    }
}



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function addTransaction(object: any) {
    const { data, error } = await supabase
        .from('transactions')
        .insert([
            object
        ])
        .select()

    if (data) {
        return data;
    } else {
        throw error;
    }
}