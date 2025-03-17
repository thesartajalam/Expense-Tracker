import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/Expenses Output/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses(){
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();
    const expensesContext = useContext(ExpensesContext);

    // the below line is written for to use it with firebase backend API
    // const [fetchedExpenses, setFetchedExpenses] = useState([]);

    useEffect(() => {
        async function getExpenses(){
            setIsFetching(true);
            try{
                const expenses = await fetchExpenses();
                expensesContext.setExpenses(expenses);
            }
            catch (error){
                setError('Could not fetch expenses!!');                
            }
            setIsFetching(false);
            // setFetchedExpenses(expenses);
        };

        getExpenses();
    }, []);

    function errorHanler(){
        setError(null);
    }

    if(error && !isFetching){
        return <ErrorOverlay message={error} onConfirm={errorHanler}/>
    }

    if(isFetching){
        return <LoadingOverlay />
    }

    const recentExpenses = expensesContext.expenses.filter((expense) => { // 
    // const recentExpenses = fetchExpenses.filter((expense) => { // after using firebase backend API
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return (expense.date >= date7DaysAgo) && (expense.data <= date7DaysAgo);
    });

    return <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" fallBackText="No expenses registered for the last 7 days."/>
}

export default RecentExpenses;