import Layout from '@components/layouts/Layout';
import React from "react"

import {
	Navbar,
	MobileNav,
	Typography,
	Button,
	IconButton,
} from "@material-tailwind/react";
interface RootLayoutProps {
	children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
	return <Layout>{children}</Layout>;
}
