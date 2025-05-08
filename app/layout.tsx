import '@/app/globals.css';
import type React from 'react';
import { Metadata } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Bricolage_Grotesque } from 'next/font/google';

import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

const bricolage = Bricolage_Grotesque({
	subsets: ['latin'],
	variable: '--font-bricolage',
});

export const metadata: Metadata = {
	title: 'Top Level Domain Finder',
	description: 'Discover and Search ICANN approved top level domains with ease.',
	authors: {
		name: 'Rafli',
		url: 'https://github.com/hdytrfli',
	},
	openGraph: {
		title: 'Top Level Domain Finder',
		description: 'Discover and Search ICANN approved top level domains with ease.',
		url: 'https://tld-finder.vercel.app',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Top Level Domain Finder',
		description: 'Discover and Search ICANN approved top level domains with ease.',
	},
	robots: 'index, follow',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={cn(bricolage.variable, 'antialiased font-sans')}>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
					<NuqsAdapter>{children}</NuqsAdapter>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
