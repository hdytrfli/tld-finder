'use client';

import * as React from 'react';
import { Copy, Globe } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import clsx from 'clsx';

interface DomainCardProps extends React.HTMLAttributes<HTMLDivElement> {
	tld: string;
}

const DomainCard = React.forwardRef<HTMLDivElement, DomainCardProps>(({ tld, className, ...props }, ref) => {
	const [copied, setCopied] = React.useState<string | null>(null);

	const onCopy = () => {
		navigator.clipboard.writeText(tld);
		setCopied(tld);

		toast({
			title: 'Copied to clipboard',
			description: tld + ' has been copied to your clipboard.',
		});

		setTimeout(() => {
			setCopied(null);
		}, 2000);
	};

	return (
		<Card ref={ref} className={clsx('group', className)} {...props}>
			<CardContent className='flex flex-col gap-2 p-4'>
				<div className='flex items-center justify-between'>
					<div className='font-mono lowercase font-medium flex gap-2 items-center ml-2'>
						<Globe className='size-4' />
						<span>{tld}</span>
					</div>

					<Button size='icon' variant='ghost' disabled={copied === tld} onClick={onCopy}>
						<Copy className='size-4' />
						<span className='sr-only'>Copy</span>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
});

DomainCard.displayName = 'DomainCard';

export default DomainCard;
