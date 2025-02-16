import { useEffect, useState } from "react";
import {
	Appearance,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	useColorScheme,
	View,
} from "react-native";
import { CountryType } from "./types/country.types";
import CountryList from "./components/CountryList";
import Loader from "./components/loader";
import React from "react";
import {
	AntDesign,
	MaterialCommunityIcons,
	MaterialIcons,
} from "@expo/vector-icons";

export default function HomeScreen() {
	const [countries, setCountries] = useState<CountryType[] | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [search, setSearch] = useState("");
	const [filteredCountries, setFilteredCountries] = useState<
		CountryType[] | null
	>(null);

	const colorScheme = useColorScheme();
	const color = colorScheme === "dark" ? "white" : "purple";

	const fetchCountry = async () => {
		setLoading(true);
		try {
			const response = await fetch(
				`https://restcountries.com/v3.1/all?fields=name,flags,capital`
			);
			const data = await response.json();
			if (data.status === 404) {
				setError("Failed to fetch countries");
				setCountries(null);
				setFilteredCountries(null);
			} else {
				setCountries(data);
				setFilteredCountries(data);
				setError("");
			}
		} catch (error) {
			setError("An error occurred");
			setCountries(null);
			setFilteredCountries(null);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchCountry();
	}, []);

	const handleSearch = (text: string) => {
		if (!countries) return;
		if (text === "" || text === null) {
			setFilteredCountries(countries);
			return;
		}
		setSearch(text);
		const filtered = countries.filter((country) =>
			country.name.common.toLowerCase().includes(text.toLowerCase())
		);
		setFilteredCountries(filtered);
	};

	const toggleColorScheme = () => {
		Appearance.setColorScheme(colorScheme === "dark" ? "light" : "dark");
	};

	if (error) {
		return (
			<View style={styles.container}>
				<Text style={styles.error}>{error}</Text>
			</View>
		);
	}
	if (loading) return <Loader text="countries" />;
	if (!countries) {
		return (
			<View style={styles.container}>
				<Text>No countries found</Text>
			</View>
		);
	}

	return (
		<View
			style={[
				styles.container,
				{ backgroundColor: colorScheme === "dark" ? "purple" : "white" },
			]}
		>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					width: "80%",
				}}
			>
				<Text style={[styles.title, { color }]}>
					Visit ({filteredCountries?.length}) countries
				</Text>
				{colorScheme === "dark" ? (
					<MaterialIcons
						name="light-mode"
						size={24}
						color="white"
						onPress={toggleColorScheme}
					/>
				) : (
					<MaterialIcons
						name="dark-mode"
						size={24}
						color="purple"
						onPress={toggleColorScheme}
					/>
				)}
			</View>
			<View style={styles.searchBar}>
				<AntDesign
					name="search1"
					size={24}
					style={styles.searchIcon}
					color={colorScheme === "dark" ? "white" : "purple"}
				/>
				<TextInput
					style={[
						styles.input,
						{
							backgroundColor:
								colorScheme === "dark"
									? "rgba(255, 255, 255, 0.1)"
									: "rgba(0, 0, 0, 0.1)",
							color,
						},
					]}
					placeholder="Search country"
					placeholderTextColor={colorScheme === "dark" ? "white" : "purple"}
					onChangeText={handleSearch}
				/>
			</View>
			{/* <Text style={styles.title}>Country App</Text> */}
			<CountryList countries={filteredCountries as CountryType[]} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "purple",
		width: "100%",
		paddingVertical: 10,
	},
	button: {
		width: "100%",
		borderRadius: 10,
		backgroundColor: "green",
		padding: 15,
		color: "white",
		flexDirection: "row",
		justifyContent: "center",
		elevation: 2,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
		color: "#bbb",
		fontFamily: "cursive",
	},
	input: {
		width: "80%",
		borderWidth: 2,
		borderColor: "rgba(255, 255, 255, 0.3)",
		color: "#fff",
		padding: 10,
		borderRadius: 5,
		marginBottom: 20,
		backgroundColor: "rgba(255, 255, 255, 0.1)",
		height: 50,
		paddingLeft: 40,
	},
	error: {
		color: "red",
		marginBottom: 20,
	},
	countryContainer: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
	searchBar: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		marginHorizontal: "auto",
	},
	searchIcon: {
		position: "absolute",
		top: 15,
		left: 45,
	},
});
