'use client';

import * as React from 'react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Github, Moon, Sun } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

interface ActionProps {
	className?: string;
}

const Action: React.FC<ActionProps> = ({ className }) => {
	const { setTheme } = useTheme();

	return (
		<div className={cn('flex flex-col space-y-2', className)}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='outline' size='icon' className='rounded-full'>
						<Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
						<Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
						<span className='sr-only'>Toggle theme</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<TooltipProvider>
				<Tooltip delayDuration={100}>
					<TooltipTrigger asChild>
						<a href='https://github.com/hdytrfli/tld-finder' target='_blank' rel='noopener noreferrer'>
							<Button variant='outline' size='icon' className='rounded-full'>
								<Github className='h-4 w-4' />
								<span className='sr-only'>Help</span>
							</Button>
						</a>
					</TooltipTrigger>

					<TooltipContent side='left' align='end' className='max-w-xs mb-2'>
						<p>
							Checkout the source code on{' '}
							<a
								href='https://github.com/hdytrfli/tld-finder'
								target='_blank'
								rel='noopener noreferrer'
								className='font-medium underline'>
								Github
							</a>
						</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	);
};

export default Action;
