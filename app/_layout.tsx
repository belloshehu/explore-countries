import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const color = colorScheme === "dark" ? "white" : "purple";
	const backgroundColor = colorScheme === "dark" ? "purple" : "white";
	const status = colorScheme === "dark" ? "light" : "dark";
	return (
		<>
			<StatusBar style={status} />
			<Stack
				screenOptions={{
					headerStyle: { backgroundColor },
					headerTintColor: color,
					headerTitleStyle: { fontFamily: "cursive" },
				}}
			>
				<Stack.Screen name="index" options={{ headerTitle: "All Countries" }} />
				<Stack.Screen
					name="country/[name]"
					options={{ headerTitle: "Country Detail" }}
				/>
			</Stack>
		</>
	);
}
