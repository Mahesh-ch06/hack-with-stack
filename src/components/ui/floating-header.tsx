import React from 'react';
import { Home, FileText, GraduationCap, MenuIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetFooter } from '@/components/ui/sheet';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export function FloatingHeader() {
	const [open, setOpen] = React.useState(false);
	const [isVisible, setIsVisible] = React.useState(true);
	const [lastScrollY, setLastScrollY] = React.useState(0);

	React.useEffect(() => {
		let ticking = false;
		
		const handleScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					const currentScrollY = window.scrollY;
					
					// Hide header when scrolling down, show when scrolling up
					if (currentScrollY > lastScrollY && currentScrollY > 80) {
						setIsVisible(false);
					} else {
						setIsVisible(true);
					}
					
					setLastScrollY(currentScrollY);
					ticking = false;
				});
				ticking = true;
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, [lastScrollY]);

	const links = [
		{
			label: 'Home',
			href: '/',
			icon: Home,
		},
		{
			label: 'Problems',
			href: '/problems',
			icon: FileText,
		},
		{
			label: 'Certificates',
			href: '/certificates',
			icon: GraduationCap,
		},
	];

	return (
		<>
			<header
				className={cn(
					'fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out',
					'border-b backdrop-blur-md bg-white/95 shadow-sm',
					isVisible ? 'translate-y-0' : '-translate-y-full'
				)}
			>
				<div className="container mx-auto px-4 max-w-7xl">
					<nav className="flex items-center justify-between py-2">
						{/* Logo */}
						<Link 
							to="/"
							className="flex items-center gap-2 rounded-lg px-1 py-1 transition-colors hover:bg-gray-100 active:bg-gray-200"
						>
							<img 
								src="/logo.png" 
								alt="AIML Club" 
								className="w-7 h-7 object-contain rounded"
							/>
							<span className="text-sm font-bold text-gray-900 whitespace-nowrap">
								AIML Club
							</span>
						</Link>

						{/* Menu Button */}
						<Button
							size="icon"
							variant="outline"
							onClick={() => setOpen(!open)}
							className="h-8 w-8"
						>
							<MenuIcon className="w-4 h-4" />
						</Button>
					</nav>
				</div>
			</header>

			{/* Mobile Sheet Menu */}
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetContent
					className="bg-white/95 backdrop-blur-lg"
					side="right"
				>
					<div className="flex flex-col gap-4 pt-8">
						{links.map((link) => {
							const Icon = link.icon;
							return (
								<Link
									key={link.href}
									to={link.href}
									onClick={() => setOpen(false)}
									className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900"
								>
									<Icon className="w-5 h-5" />
									<span className="font-medium">{link.label}</span>
								</Link>
							);
						})}
					</div>
					<SheetFooter className="mt-auto">
						<a 
							href="https://hack-with-stack.devfolio.co/application"
							target="_blank"
							rel="noopener noreferrer"
							className="w-full"
						>
							<Button className="w-full" onClick={() => setOpen(false)}>
								Register Now
							</Button>
						</a>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</>
	);
}
