import { View, Text ,StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Button from "./Button";


function ErrorOverlay({message, onConfirm}){
    return <View style={styles.container}>
        <Text style={[styles.Text, styles.title]}>An error occurred!!</Text>
        <Text style={styles.Text}>{message}</Text>
        <Button onPress={onConfirm}>Okay</Button>
    </View>
}

export default ErrorOverlay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    },
    Text: {
        color: "white",
        textAlign: "center",
        marginBottom: 8
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    }
});