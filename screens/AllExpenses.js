import { useContext } from "react";
import ExpensesOutput from "../components/Expenses Output/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

function AllExpenses(){
    const expensesContext = useContext(ExpensesContext);

    return <ExpensesOutput expenses={expensesContext.expenses} expensesPeriod="Total" fallBackText="No registered Expenses Found"/>
}

export default AllExpenses;