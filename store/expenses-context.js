import { createContext, useReducer } from "react";

// const DUMMY_EXPENSES = [
//     {
//         id: 'e1',
//         description: 'A pair of shoes',
//         amount: 59.99,
//         date: new Date('2024-12-25')
//     },
//     {
//         id: 'e2',
//         description: 'A pair of trousers',
//         amount: 89.99,
//         date: new Date('2024-01-05')
//     },
//     {
//         id: 'e3',
//         description: 'Some Bananas',
//         amount: 5.99,
//         date: new Date('2024-12-01')
//     },
//     {
//         id: 'e4',
//         description: 'A Book',
//         amount: 14.99,
//         date: new Date('2024-12-19')
//     },
//     {
//         id: 'e5',
//         description: 'Another Book',
//         amount: 18.59,
//         date: new Date('2024-02-18')
//     },
//     {
//         id: 'e6',
//         description: 'A pair of trousers',
//         amount: 89.99,
//         date: new Date('2024-01-05')
//     },
//     {
//         id: 'e7',
//         description: 'Some Bananas',
//         amount: 5.99,
//         date: new Date('2024-12-01')
//     },
//     {
//         id: 'e8',
//         description: 'A Book',
//         amount: 14.99,
//         date: new Date('2024-12-19')
//     },
//     {
//         id: 'e9',
//         description: 'Another Book',
//         amount: 18.59,
//         date: new Date('2024-02-18')
//     },
//     {
//         id: 'e10',
//         description: 'Another Book',
//         amount: 18.59,
//         date: new Date('2024-02-18')
//     }
// ]

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount , date}) => {},
    setExpenses: (expenses) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date}) => {}
});

function expensesReducer(state, action){
    switch(action.type){
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{...action.payload, id: id}, ...state]
        case 'SET':
            // for keeping up the newly added items at the top coz after using firebase it adds the items added latest to bottom  of the response data
            const inverted = action.payload.reverse(); 
            return action.payload;
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = {...updatableExpense, ...action.payload.data};
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;
    }
}

function ExpensesContextProvider({children}){
    // useReducer can be used to manage complex states 
    // const [expenseState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES); // before using firebase backend API
    const [expenseState, dispatch] = useReducer(expensesReducer, []);

    function addExpense(expenseData){
        dispatch({ type : 'ADD', payload: expenseData});
    }

    function setExpenses(expenses){
        dispatch({type: 'SET', payload: expenses});
    }

    function deleteExpense(id){
        dispatch({type: 'DELETE', payload: id});
    }

    function updateExpense(id, expenseData){
        dispatch({type: 'UPDATE', payload : {id: id, data: expenseData}});
    }

    const value = {
        expenses: expenseState,
        addExpense: addExpense,
        setExpenses: setExpenses,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    }

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider;