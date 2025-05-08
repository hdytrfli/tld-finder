import { Star } from 'lucide-react';

import TLDFilter from '@/components/tld-filter';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import React from 'react';

export default async function Page() {
	const [version, ...result] = await fetch('https://data.iana.org/TLD/tlds-alpha-by-domain.txt')
		.then((res) => res.text())
		.then((text) => text.split('\n'));

	const tlds = result
		.slice(2)
		.filter((line) => line.trim() !== '')
		.filter((line) => !line.startsWith('XN--'))
		.map((line) => '.' + line.trim().toLowerCase());

	return (
		<main className='container max-w-7xl py-16 px-4 grid gap-8'>
			<div className='flex flex-row justify-between items-center gap-6'>
				<div>
					<h1 className='text-4xl font-bold'>Top Level Domain Finder</h1>
					<p className='text-muted-foreground mt-2'>
						Discover and Search ICANN approved top level domains with ease.
					</p>
				</div>

				<div className='flex items-center gap-2'>
					<ThemeToggle />

					<a href='https://github.com/hdytrfli/tld-finder' target='_blank' rel='noreferrer'>
						<Button variant='outline' className='flex-none'>
							<Star className='size-4 text-amber-500 fill-current' />
							<span>Star on GitHub</span>
						</Button>
					</a>
				</div>
			</div>

			<React.Suspense fallback={<div className='h-96 animate-pulse rounded-md bg-muted' />}>
				<TLDFilter tlds={tlds} />
			</React.Suspense>

			<p className='fixed bottom-8 left-8 text-xs text-muted-foreground'>
				Data source{' '}
				<a
					href='https://data.iana.org/TLD/tlds-alpha-by-domain.txt'
					target='_blank'
					rel='noopener noreferrer'
					className='font-medium underline'>
					ICANN List of TLDs
				</a>
				<span className='sr-only'>{version}</span>
			</p>
		</main>
	);
}
