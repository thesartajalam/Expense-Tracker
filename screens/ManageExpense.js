import { useContext, useLayoutEffect, useState } from "react";
import { View, StyleSheet} from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { NavigationHelpersContext } from "@react-navigation/native";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpense({route, navigation}){
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState();
    const expensesContext = useContext(ExpensesContext);
    const editedExpenseId = route.params?.expenseId;
    // two !! are written in front of editedExpenseId to convert it in the boolean value 
    // that if it is a value then it will be true and false if it is undefined
    const isEditing = !!editedExpenseId;

    const selectedExpense = expensesContext.expenses.find((expense) => expense.id === editedExpenseId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        });
    }, [navigation, isEditing]);

    async function deleteExpenseHandler(){
        setIsSubmitting(true);
        try {
            await deleteExpense(editedExpenseId);
            // setIsSubmitting(false); // optional and don't need to use it here as after this await code we are closing this at the end of the function anyways
            expensesContext.deleteExpense(editedExpenseId);
            navigation.goBack();
            
        } catch (error) {
            setError('Could not delete expense - please try again later');
            setIsSubmitting(false);    
        }

    }

    function cancelHandler(){
        navigation.goBack();
    }

    async function confirmHandler(expenseData){
        isSubmitting(true);
        try {
            if(isEditing){
                expensesContext.updateExpense(editedExpenseId, expenseData);
                await updateExpense(editedExpenseId, expenseData);
            }
            else{
                const id = await storeExpense(expenseData);
                // expensesContext.addExpense({description: 'Test', amount: 19.99, date: new Date('2022-05-19')});
                expensesContext.addExpense({...expenseData, id: id});
            }
            navigation.goBack();
        } catch (error) {
            setError('Could not save data - please try again later!!');
            setIsSubmitting(false);
        }
    }

    function errorHandler(){
        setError(null);
    }

    if(error && !isSubmitting){
        return <ErrorOverlay message={error} onConfirm={errorHandler}/>
    }

    if(isSubmitting){
        return <LoadingOverlay />
    }

    return (
        <View style={styles.container}>
            <ExpenseForm submitButtonLabel={isEditing ? 'Update' : 'Add'} onSubmit={confirmHandler} onCancel={cancelHandler} defaultValues={selectedExpense}/>
            {isEditing && 
            (
                <View style={styles.deleteContainer}>
                    <IconButton icon="trash" color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler}/>
                </View>
            )
            }
        </View>
    );
}

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: "center"
    }
});