import { FlatList, StyleSheet, useColorScheme, View } from "react-native";
import { CountryType } from "../types/country.types";
import CountryItem from "./CountryItem";

const CountryList = ({ countries }: { countries: CountryType[] }) => {
	const colorScheme = useColorScheme();
	const color = colorScheme === "dark" ? "white" : "black";
	const backgroundColor =
		colorScheme === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.1)";
	return (
		<FlatList
			data={countries}
			renderItem={({ item }) => <CountryItem country={item} />}
			keyExtractor={(item) => item.name.common}
			contentContainerStyle={styles.container}
			ItemSeparatorComponent={() => (
				<View style={[styles.separator, { backgroundColor }]} />
			)}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
	},
	separator: {
		height: 5,
		width: "100%",
		backgroundColor: "rgba(255, 255, 255, 0.2)",
		borderRadius: 5,
	},
});

export default CountryList;
