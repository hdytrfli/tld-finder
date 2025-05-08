'use client';

import * as React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useVirtualizer } from '@tanstack/react-virtual';
import DomainCard from '@/components/domain-card';
import { cn } from '@/lib/utils';

interface DomainGridProps {
	tlds: string[];
}

const css = (props: Record<string, string | number>) => {
	return props as unknown as React.CSSProperties;
};

const ITEM_HEIGHT = 82;
const OVERSCAN = 5;

export default function DomainGrid({ tlds }: DomainGridProps) {
	const parent = React.useRef<HTMLDivElement>(null);

	const virtualizer = useVirtualizer({
		count: tlds.length,
		getScrollElement: () => parent.current,
		estimateSize: () => ITEM_HEIGHT,
		overscan: OVERSCAN,
		scrollToFn: (offset, { behavior }) => {
			const element = parent.current;
			if (!element) return;

			const height = ITEM_HEIGHT;
			const nearest = Math.round(offset / height) * height;

			element.scrollTo({
				top: nearest,
				behavior: behavior ?? 'smooth',
			});
		},
	});

	React.useEffect(() => {
		const element = parent.current;
		if (!element) return;

		let timeout: NodeJS.Timeout;

		const handleScroll = () => {
			clearTimeout(timeout);

			timeout = setTimeout(() => {
				const height = ITEM_HEIGHT;
				const scroll = element.scrollTop;
				const nearest = Math.round(scroll / height) * height;

				if (scroll !== nearest) {
					element.scrollTo({
						top: nearest,
						behavior: 'smooth',
					});
				}
			}, 150);
		};

		element.addEventListener('scroll', handleScroll);

		return () => {
			element.removeEventListener('scroll', handleScroll);
			clearTimeout(timeout);
		};
	}, []);

	if (tlds.length === 0) {
		return (
			<div className='grid justify-center items-center h-80 bg-card rounded-xl border p-4'>
				<div className='flex items-center gap-2 text-muted-foreground'>
					<AlertTriangle className='size-4' />
					<span>No results found</span>
				</div>
			</div>
		);
	}

	return (
		<React.Fragment>
			<div ref={parent} className='h-[700px] overflow-auto relative'>
				<div className='fixed bottom-0 size-full z-10 bg-gradient-to-t from-background from-10% to-transparent to-30% pointer-events-none' />

				<div
					style={css({
						'--virtual-height': virtualizer.getTotalSize() + 'px',
					})}
					className={cn(' h-[var(--virtual-height)] ', 'relative groupw-full')}>
					{virtualizer.getVirtualItems().map((items) => (
						<div
							key={items.key}
							style={css({
								'--virtual-height': items.size + 'px',
								'--virtual-start': items.start + 'px',
							})}
							className={cn('absolute  left-0 w-full', 'top-[var(--virtual-start)]')}>
							<DomainCard tld={tlds[items.index]} />
						</div>
					))}
				</div>
			</div>
		</React.Fragment>
	);
}
