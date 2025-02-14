import React from "react";
import { View, Text, StyleSheet, Image, useColorScheme } from "react-native";
import { CountryType } from "../types/country.types";
import { Link } from "expo-router";

// Country list item component showing name, flag and capital
const CountryItem = ({ country }: { country: CountryType }) => {
	const colorScheme = useColorScheme();
	const color = colorScheme === "dark" ? "white" : "purple";

	return (
		<Link
			style={styles.countryContainer}
			href={{
				pathname: "/country/[name]",
				params: { name: country.name.common },
			}}
		>
			<Image source={{ uri: country.flags.png }} style={styles.flag} />
			<View style={styles.textWrapper}>
				<Text style={[styles.countryName, { color }]}>
					{country.name.common}
				</Text>
				<Text style={styles.capitalName}>{country.capital[0]}</Text>
			</View>
		</Link>
	);
};

const styles = StyleSheet.create({
	countryContainer: {
		alignItems: "center",
		justifyContent: "flex-start",
		width: "100%",
		flexDirection: "row",
		paddingHorizontal: 5,
		paddingVertical: 15,
		gap: 10,
	},
	countryName: {
		color: "#fff",
		textOverflow: "ellipsis",
		width: 200,
	},
	capitalName: {
		color: "#aaa",
		fontSize: 12,
	},
	flag: {
		width: 50,
		height: 50,
		borderRadius: 10,
	},
	textWrapper: {
		height: 50,
		paddingHorizontal: 10,
	},
});

export default CountryItem;
