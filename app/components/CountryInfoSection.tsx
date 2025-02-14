import { StyleSheet, Text, useColorScheme, View } from "react-native";
import React from "react";
import { SectionType } from "../types/country.types";

const CountryInfoSection = ({ section }: { section: SectionType }) => {
	const colorScheme = useColorScheme();

	const color = colorScheme === "dark" ? "white" : "purple";
	const backgroundColor =
		colorScheme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.04)";

	return (
		<View style={[styles.container, { backgroundColor }]}>
			<Text style={[styles.title, { color }]}>{section.title}</Text>
			<Text style={styles.content}>{section.data}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 20,
		padding: 10,
		marginVertical: 1,
		borderRadius: 0,
	},
	title: {
		fontWeight: "bold",
		color: "white",
		textTransform: "capitalize",
	},
	content: {
		color: "#aaa",
		textAlign: "right",
	},
});

export default CountryInfoSection;
