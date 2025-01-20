import { getSupabaseUser } from "./auth";
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

export async function addSavings(object: any) {
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
    const user = await getSupabaseUser();

    if (!user.data.user) {
        throw new Error("User not logged in");
    }

    const startDate = new Date(year, month, 1).toISOString();
    let endDate = new Date(year, month + 1, 1).toISOString();
    if (month == 11) {
        endDate = new Date(year + 1, 0, 1).toISOString();
    }


    const { data, error } = await supabase.from("transactions").select('*')
        .eq('user_id', user.data.user.id)
        .gte('time_of_expense', startDate)
        .lt('time_of_expense', endDate)
        .order('expense_date', { ascending: false })
        ;
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
export async function addBudget(object: any) {
    const { data, error } = await supabase
        .from('budget')
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
export async function getBudget(month: any, year: any) {
    const user = await getSupabaseUser();

    if (!user.data.user) {
        throw new Error("User not logged in");
    }

    const { data, error } = await supabase
        .from('budget')
        .select("*")
        // Filters
        .eq('user_id', user.data.user.id)
        .eq('month', month)
        .eq('year', year)



    if (data) {
        return data;
    } else {
        throw error;
    }
}
export async function updateBudget(object: any, month: any, year: any) {
    const { data, error } = await supabase
        .from('budget')
        .update(object)
        .eq('month', month)
        .eq('year', year)
        .select()


    if (data) {
        return data;
    } else {
        throw error;
    }
}
export async function getChartData() {
    const query = `
      SELECT
        b.label,
        b.expense AS budget,
        COALESCE(SUM(t.amount), 0) AS actual
      FROM
        budget b
      LEFT JOIN
        transactions t
      ON
        b.label = t.transaction_type
      GROUP BY
        b.label, b.expense;
    `;

    // Call the query using Supabase's SQL function
    const { data, error } = await supabase.rpc('sql', { query });
    if (error) {
        console.error('Error fetching chart data:', error);
        throw error;
    }
    return data;
}