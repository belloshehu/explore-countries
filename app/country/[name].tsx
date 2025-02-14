import { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	useColorScheme,
	Appearance,
} from "react-native";
import { CountryType } from "../types/country.types";
import { useLocalSearchParams } from "expo-router";
import Loader from "../components/loader";
import CountryInfoSection from "../components/CountryInfoSection";

export const CountryDetailScreen = () => {
	const [country, setCountry] = useState<CountryType | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const colorScheme = useColorScheme();
	const { name } = useLocalSearchParams();
	const backgroundColor =
		colorScheme === "dark" ? "purple" : "rgba(0, 0, 0, 0.02)";

	const fetchCountry = async (countryName: string) => {
		setLoading(true);
		try {
			const response = await fetch(
				`https://restcountries.com/v3.1/name/${countryName}?fullText=true&fields=name,area,flags,capital,region,languages,population,code,continents,currencies`
			);
			const data = await response.json();
			if (data.status === 404) {
				setError("Country not found");
				setCountry(null);
			} else {
				setCountry(data[0]);
				setError("");
			}
		} catch (error) {
			setError("An error occurred");
			setCountry(null);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchCountry(name as string);
	}, []);

	if (error) {
		return (
			<View style={styles.container}>
				<Text style={styles.error}>{error}</Text>
			</View>
		);
	}
	if (loading) return <Loader text={name as string} />;

	if (!country) {
		return (
			<View style={styles.container}>
				<Text>No country found</Text>
			</View>
		);
	}

	return (
		<View style={[styles.container, { backgroundColor }]}>
			{country && (
				<View style={[styles.countryContainer, { backgroundColor }]}>
					<Image source={{ uri: country.flags.png }} style={styles.flag} />
					<CountryInfoSection
						section={{ title: "name", data: country.name.common }}
					/>
					<CountryInfoSection
						section={{ title: "capital", data: country.capital }}
					/>
					<CountryInfoSection
						section={{ title: "population", data: country.population }}
					/>

					<CountryInfoSection
						section={{ title: "area", data: `${country.area} km2` }}
					/>
					<CountryInfoSection
						section={{ title: "continents", data: country.continents[0] }}
					/>
					<CountryInfoSection
						section={{
							title: "languages",
							data: Object.values(country.languages).join(", "),
						}}
					/>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "flex-start",
		backgroundColor: "purple",
		padding: 20,
		width: "100%",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		color: "white",
	},
	input: {
		width: "80%",
		borderWidth: 1,
		padding: 10,
		borderRadius: 5,
		marginBottom: 20,
	},
	error: {
		color: "red",
		marginBottom: 20,
	},
	countryContainer: {
		alignItems: "center",
		width: "100%",
		flex: 1,
	},
	countryName: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
		color: "white",
	},
	countryInfo: {
		marginBottom: 5,
	},
	flag: {
		width: "100%",
		height: 200,
		borderRadius: 10,
		resizeMode: "cover",
		marginBottom: 10,
	},
});

export default CountryDetailScreen;
