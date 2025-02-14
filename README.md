# Country Mobile Application

This is a React Native mobile application that provides information about different countries. The app fetches data from a public API and displays details such as the country's name, capital, population, and more.

## Features

- List of countries with basic information
- Detailed view of each country
- Search functionality to find countries quickly
- Offline support for previously viewed countries

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/country-app.git
   ```
2. Navigate to the project directory:
   ```sh
   cd country-app
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Run the application:
   ```sh
   npm start
   ```

## Usage

- Open the app on your mobile device or emulator.
- Browse the list of countries or use the search bar to find a specific country.
- Tap on a country to view detailed information.

# Code Explanation

#### index.tsx

This code provides a functional React Native component that fetches and displays a list of countries, allows searching through them, and supports toggling between light and dark themes.

```TypeScript
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
				<TouchableOpacity onPress={toggleColorScheme}>
					<MaterialCommunityIcons
						name="theme-light-dark"
						size={24}
						color={colorScheme === "dark" ? "white" : "purple"}
					/>
				</TouchableOpacity>
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

```

#### \_layout.tsx

This component dynamically adjusts the appearance of the status bar and navigation headers based on the user's color scheme preference. It sets up navigation with two screens: one for listing all countries and another for displaying details of a specific country.

#### country[name].tsx

This component effectively fetches and displays detailed information about a country, handling loading states and errors gracefully.

```TypeScript
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

```

#### types.coountry.ts

hese interfaces help ensure that objects conform to a specific structure, making the code more predictable and easier to work with.

```TypeScript
export interface CountryType {
	id: string;
	name: {
		common: string;
	};
	capital: string[];
	population: number;
	area: number;
	flags: {
		png: string;
	};
	continents: [string];
	languages: [any];
	currencies: [any];
}

export interface SectionType {
	title: keyof CountryType;
	data: string | number | string[];
}
```

#### CountryList.tsx

This code defines a React Native component called CountryList that displays a list of countries using a FlatList component.

```TypeScript
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
```

#### CountryItem.tsx

This component is designed to display a country's name, flag, and capital in a styled, navigable list item.

```TypeScript
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
```

#### Loader.tsx

This component is designed to show a loading spinner with a customizable text message. It adapts its colors based on the current color scheme (light or dark mode). The styles ensure that the content is centered both vertically and horizontally.

```TypeScript
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

```

#### CountryInfoSection

This component is designed to display a section of country information with adaptive styling based on the device's color scheme.

```TypeScript
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
```

#### +not-found.tsx

This component displays a "Not Found" screen with a title and a link that navigates back to the home screen. The styles ensure the link is centered on the screen with a specific appearance.

```TypeScript
import { View, StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";
import React from "react";

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: "Oops! Not Found" }} />
			<View style={styles.container}>
				<Link href="/" style={styles.button}>
					Go back to Home screen!
				</Link>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#25292e",
		justifyContent: "center",
		alignItems: "center",
	},

	button: {
		fontSize: 20,
		textDecorationLine: "underline",
		color: "#fff",
	},
});
```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Rest Countries API](https://restcountries.com) for providing the country data.
- React Native community for their excellent documentation and support.
