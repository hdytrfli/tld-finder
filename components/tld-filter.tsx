'use client';

import * as React from 'react';
import { ArrowRight } from 'lucide-react';
import { useQueryState, parseAsInteger } from 'nuqs';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DomainGrid from '@/components/domain-grid';
import { Card, CardContent } from '@/components/ui/card';

type TLD = string;

interface TLDFilter {
	tlds: TLD[];
}

export default function TLDFilter({ tlds }: TLDFilter) {
	const [domain, setDomain] = useQueryState('domain', { defaultValue: '' });
	const [filter, setFilter] = useQueryState('filter', { defaultValue: '' });
	const [length, setLength] = useQueryState('length', parseAsInteger.withDefault(0));

	const filtered = tlds
		.filter((tld) => {
			const input = filter.toLowerCase();
			const check = tld.toLowerCase();
			return check.includes(input);
		})
		.filter((tld) => {
			if (length === 0) return true;
			return tld.length >= length;
		})
		.map((tld) => {
			if (domain.length > 0) return domain + tld;
			return tld;
		});

	return (
		<div className='grid lg:grid-cols-5 gap-8'>
			<div className='flex flex-col gap-6 lg:col-span-2'>
				<div className='flex justify-between items-center h-10'>
					<h2 className='text-xl font-semibold'>Search</h2>
				</div>

				<Card>
					<CardContent className='p-6'>
						<div className='grid gap-6'>
							<div className='flex flex-col gap-2'>
								<Label>Name</Label>
								<Input
									placeholder='Add domain name'
									type='text'
									value={domain}
									onChange={(e) => setDomain(e.target.value)}
									className='w-full'
								/>
								<span className='text-sm text-muted-foreground'>
									Domain name to prepend to the TLD.
								</span>
							</div>

							<div className='flex flex-col gap-2'>
								<Label>Search</Label>
								<Input
									placeholder='Search TLD...'
									type='text'
									value={filter}
									onChange={(e) => setFilter(e.target.value)}
									className='w-full'
								/>
								<span className='text-sm text-muted-foreground'>Search for TLD by name.</span>
							</div>

							<div className='flex flex-col gap-2'>
								<Label>Minimum Length</Label>
								<Input
									placeholder='Minimum Length'
									type='number'
									value={length}
									onChange={(e) => setLength(parseInt(e.target.value))}
									className='w-full'
								/>
								<span className='text-sm text-muted-foreground'>
									Only show TLDs with a length greater than or equal to the minimum length.
								</span>
							</div>

							<Button onClick={() => setFilter('')} className='w-full'>
								<span>Find Top Level Domains</span>
								<ArrowRight className='size-4' />
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>

			<div className='flex flex-col gap-6 lg:col-span-3'>
				<div className='flex justify-between items-center h-10'>
					<h2 className='text-xl font-semibold'>Results</h2>
				</div>

				<DomainGrid tlds={filtered} />
			</div>
		</div>
	);
}
