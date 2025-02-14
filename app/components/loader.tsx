import {
	ActivityIndicator,
	StyleSheet,
	View,
	Text,
	useColorScheme,
} from "react-native";

const Loader = ({ text }: { text: string }) => {
	const colorScheme = useColorScheme();
	const color = colorScheme === "dark" ? "white" : "purple";
	const backgroundColor = colorScheme === "dark" ? "purple" : "white";

	return (
		<View style={[styles.container, { backgroundColor }]}>
			<Text style={{ color, fontSize: 20 }}>Loading {text} ...</Text>
			<Text>
				<ActivityIndicator size="large" color="#0000ff" />;
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "purple",
		gap: 20,
	},
});
export default Loader;
