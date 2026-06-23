<script lang="ts">
	import './layout.css';
	import logo from '$lib/assets/logo.svg';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';

	// Svelte 5 Runes for Layout State
	let { children } = $props();
	let darkMode = $state(false);
	let isMobileMenuOpen = $state(false);
	let isScrolled = $state(false);

	// WhatsApp configuration
	const waNumber = '6281255556666'; // Default WhatsApp number for Miratech
	const defaultWaMessage = 'Halo Miratech, saya ingin konsultasi gratis mengenai solusi IT untuk bisnis saya.';
	const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(defaultWaMessage)}`;

	// Toggle Dark Mode
	function toggleDarkMode() {
		darkMode = !darkMode;
		if (darkMode) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}

	onMount(() => {
		// Initialize Dark Mode based on preference or system
		const savedTheme = localStorage.getItem('theme');
		if (
			savedTheme === 'dark' ||
			(!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			darkMode = true;
			document.documentElement.classList.add('dark');
		} else {
			darkMode = false;
			document.documentElement.classList.remove('dark');
		}

		// Scroll listener for sticky header styling changes
		const handleScroll = () => {
			isScrolled = window.scrollY > 20;
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	// Smooth scroll helper
	function scrollToSection(id: string) {
		isMobileMenuOpen = false;
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<svelte:head>
	<title>Miratech - Solusi Teknologi Terbaik untuk Bisnis Anda</title>
	<meta name="description" content="Kami membantu bisnis berkembang melalui layanan pembuatan software custom, perbaikan komputer/laptop, serta pemasangan CCTV profesional di Samarinda." />
	<meta name="keywords" content="Miratech, Jasa Pembuatan Software, Custom Software Samarinda, Perbaikan Laptop Samarinda, Pasang CCTV Samarinda, IT Solutions" />
	<link rel="icon" href={favicon} />
	<!-- Preload Outfit & Inter fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
</svelte:head>

<div class="flex min-h-screen flex-col overflow-x-hidden">
	<!-- Header Navigation -->
	<header
		id="header"
		class="fixed top-0 left-0 z-50 w-full transition-all duration-300 {isScrolled ? 'glass shadow-md py-3' : 'bg-transparent py-5'}"
	>
		<div class="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
			<!-- Logo -->
			<a href="#beranda" onclick={(e) => { e.preventDefault(); scrollToSection('beranda'); }} class="flex items-center gap-2">
				<img src={logo} alt="Miratech Logo" class="h-10 w-auto transition-transform duration-300 hover:scale-105" />
			</a>

			<!-- Desktop Nav Menu -->
			<nav class="hidden md:flex items-center gap-8">
				<a href="#beranda" onclick={(e) => { e.preventDefault(); scrollToSection('beranda'); }} class="text-sm font-semibold text-slate-700 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition-colors">Beranda</a>
				<a href="#layanan" onclick={(e) => { e.preventDefault(); scrollToSection('layanan'); }} class="text-sm font-semibold text-slate-700 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition-colors">Layanan</a>
				<a href="#mengapa-kami" onclick={(e) => { e.preventDefault(); scrollToSection('mengapa-kami'); }} class="text-sm font-semibold text-slate-700 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition-colors">Mengapa Kami</a>
				<a href="#portfolio" onclick={(e) => { e.preventDefault(); scrollToSection('portfolio'); }} class="text-sm font-semibold text-slate-700 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition-colors">Portfolio</a>
				<a href="#testimoni" onclick={(e) => { e.preventDefault(); scrollToSection('testimoni'); }} class="text-sm font-semibold text-slate-700 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition-colors">Testimoni</a>
				<a href="#kontak" onclick={(e) => { e.preventDefault(); scrollToSection('kontak'); }} class="text-sm font-semibold text-slate-700 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition-colors">Kontak</a>
			</nav>

			<!-- Right Controls -->
			<div class="hidden md:flex items-center gap-4">
				<!-- Dark Mode Toggle -->
				<button
					onclick={toggleDarkMode}
					class="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
					aria-label="Toggle Dark Mode"
					id="dark-mode-toggle-desktop"
				>
					{#if darkMode}
						<!-- Sun icon -->
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M4.93 4.93l1.41 1.41"/><path d="M17.66 17.66l1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M6.34 17.66l-1.41 1.41"/><path d="M19.07 4.93l-1.41 1.41"/></svg>
					{:else}
						<!-- Moon icon -->
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
					{/if}
				</button>

				<!-- CTA Button -->
				<a
					href={waLink}
					target="_blank"
					rel="noopener noreferrer"
					class="btn-ripple bg-primary hover:bg-blue-700 text-white font-semibold text-sm px-6 py-2.5 rounded-xl inline-flex items-center justify-center"
					id="cta-nav-desktop"
				>
					Konsultasi Gratis
				</a>
			</div>

			<!-- Mobile Menu Controls (Hamburger) -->
			<div class="flex items-center gap-3 md:hidden">
				<!-- Dark Mode Toggle -->
				<button
					onclick={toggleDarkMode}
					class="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
					aria-label="Toggle Dark Mode"
					id="dark-mode-toggle-mobile"
				>
					{#if darkMode}
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M4.93 4.93l1.41 1.41"/><path d="M17.66 17.66l1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M6.34 17.66l-1.41 1.41"/><path d="M19.07 4.93l-1.41 1.41"/></svg>
					{:else}
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
					{/if}
				</button>

				<!-- Hamburger Menu Button -->
				<button
					onclick={() => isMobileMenuOpen = !isMobileMenuOpen}
					class="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
					aria-label="Toggle Menu"
					id="mobile-menu-trigger"
				>
					{#if isMobileMenuOpen}
						<!-- Close X -->
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
					{:else}
						<!-- Menu Hamburger -->
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
					{/if}
				</button>
			</div>
		</div>

		<!-- Mobile Nav Panel -->
		{#if isMobileMenuOpen}
			<div class="md:hidden glass border-t border-slate-200 dark:border-slate-800 py-4 px-6 animate-fade-up">
				<nav class="flex flex-col gap-4">
					<a href="#beranda" onclick={(e) => { e.preventDefault(); scrollToSection('beranda'); }} class="text-base font-semibold text-slate-700 dark:text-slate-300">Beranda</a>
					<a href="#layanan" onclick={(e) => { e.preventDefault(); scrollToSection('layanan'); }} class="text-base font-semibold text-slate-700 dark:text-slate-300">Layanan</a>
					<a href="#mengapa-kami" onclick={(e) => { e.preventDefault(); scrollToSection('mengapa-kami'); }} class="text-base font-semibold text-slate-700 dark:text-slate-300">Mengapa Kami</a>
					<a href="#portfolio" onclick={(e) => { e.preventDefault(); scrollToSection('portfolio'); }} class="text-base font-semibold text-slate-700 dark:text-slate-300">Portfolio</a>
					<a href="#testimoni" onclick={(e) => { e.preventDefault(); scrollToSection('testimoni'); }} class="text-base font-semibold text-slate-700 dark:text-slate-300">Testimoni</a>
					<a href="#kontak" onclick={(e) => { e.preventDefault(); scrollToSection('kontak'); }} class="text-base font-semibold text-slate-700 dark:text-slate-300">Kontak</a>
					<hr class="border-slate-200 dark:border-slate-800 my-1" />
					<a
						href={waLink}
						target="_blank"
						rel="noopener noreferrer"
						class="btn-ripple bg-primary hover:bg-blue-700 text-white text-center font-semibold text-sm px-6 py-3 rounded-xl flex items-center justify-center gap-2"
						id="cta-nav-mobile"
					>
						<!-- WhatsApp SVG -->
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.63-1.02-5.101-2.871-6.956C16.608 1.93 14.135.91 11.51.91c-5.44 0-9.863 4.42-9.865 9.864 0 1.902.5 3.708 1.45 5.304l-.995 3.639 3.733-.978zm11.567-5.282c-.313-.156-1.854-.915-2.131-1.016-.277-.1-.478-.15-.68.15-.2.3-.777.98-.952 1.18-.175.2-.35.225-.663.069-.313-.156-1.323-.486-2.52-1.553-.931-.83-1.56-1.853-1.742-2.164-.183-.313-.02-.482.137-.638.14-.14.313-.365.47-.547.156-.183.21-.313.313-.52.103-.207.05-.389-.026-.547-.076-.157-.68-1.637-.931-2.245-.245-.59-.494-.51-.68-.52-.176-.008-.377-.01-.58-.01-.202 0-.53.076-.807.38-.278.3-.53.53-.53 1.29s.56 1.493.638 1.6c.078.106 1.095 1.672 2.653 2.344.37.16.66.255.887.329.373.12.712.102.98.062.3-.044 1.854-.757 2.115-1.45.26-.693.26-1.287.182-1.41-.077-.123-.277-.202-.59-.358z"/></svg>
						Konsultasi Gratis
					</a>
				</nav>
			</div>
		{/if}
	</header>

	<!-- Main Page Content -->
	<main class="flex-grow pt-24">
		{@render children()}
	</main>

	<!-- Footer -->
	<footer class="bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-800">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
				<!-- Footer Brand -->
				<div class="col-span-12 md:col-span-5 flex flex-col gap-4">
					<div class="flex items-center gap-2">
						<!-- Custom M logo SVG inline for the dark background of the footer -->
						<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-auto text-white" viewBox="0 0 240 80" fill="none">
							<g transform="translate(10, 10)">
								<path d="M5 50 L5 10 L25 35 L45 10 L45 50" stroke="#0066FF" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
								<path d="M15 50 L15 22.5 L25 35 L35 22.5 L35 50" stroke="#4F9DFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
								<circle cx="25" cy="35" r="3.5" fill="#FFFFFF" stroke="#0066FF" stroke-width="2" />
							</g>
							<text x="80" y="48" font-family="'Outfit', 'Inter', system-ui, sans-serif" font-size="24" font-weight="800" fill="#FFFFFF" letter-spacing="2">MIRATECH</text>
							<text x="80" y="62" font-family="'Inter', system-ui, sans-serif" font-size="8" font-weight="600" fill="#4F9DFF" letter-spacing="3.5">TECHNOLOGY</text>
						</svg>
					</div>
					<p class="text-sm leading-relaxed max-w-sm text-slate-400 mt-2">
						Solusi Teknologi Terbaik untuk Bisnis Anda. Kami menyediakan pembuatan software custom, perbaikan komputer/laptop, serta instalasi CCTV berkualitas tinggi.
					</p>
				</div>

				<!-- Quick Menu -->
				<div class="col-span-6 md:col-span-3 flex flex-col gap-4">
					<h3 class="text-white font-bold text-base tracking-wide">Menu Pintas</h3>
					<nav class="flex flex-col gap-2.5 text-sm">
						<a href="#beranda" onclick={(e) => { e.preventDefault(); scrollToSection('beranda'); }} class="hover:text-primary transition-colors">Beranda</a>
						<a href="#layanan" onclick={(e) => { e.preventDefault(); scrollToSection('layanan'); }} class="hover:text-primary transition-colors">Layanan</a>
						<a href="#portfolio" onclick={(e) => { e.preventDefault(); scrollToSection('portfolio'); }} class="hover:text-primary transition-colors">Portfolio</a>
						<a href="#testimoni" onclick={(e) => { e.preventDefault(); scrollToSection('testimoni'); }} class="hover:text-primary transition-colors">Testimoni</a>
						<a href="#kontak" onclick={(e) => { e.preventDefault(); scrollToSection('kontak'); }} class="hover:text-primary transition-colors">Kontak</a>
					</nav>
				</div>

				<!-- Contact Info -->
				<div class="col-span-6 md:col-span-4 flex flex-col gap-4">
					<h3 class="text-white font-bold text-base tracking-wide">Informasi Kontak</h3>
					<ul class="flex flex-col gap-3.5 text-sm">
						<li class="flex items-start gap-3">
							<!-- Mail icon -->
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
							<div>
								<span class="block text-xs uppercase tracking-wider text-slate-500 font-semibold">Email</span>
								<a href="mailto:info@miratech.co.id" class="text-slate-300 hover:text-primary transition-colors">info@miratech.co.id</a>
							</div>
						</li>
						<li class="flex items-start gap-3">
							<!-- Phone icon -->
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
							<div>
								<span class="block text-xs uppercase tracking-wider text-slate-500 font-semibold">WhatsApp</span>
								<a href="https://wa.me/6281255556666" target="_blank" rel="noopener noreferrer" class="text-slate-300 hover:text-primary transition-colors">+62 812-5555-6666</a>
							</div>
						</li>
						<li class="flex items-start gap-3">
							<!-- Map pin icon -->
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
							<div>
								<span class="block text-xs uppercase tracking-wider text-slate-500 font-semibold">Lokasi</span>
								<span class="text-slate-300">Samarinda, Kalimantan Timur</span>
							</div>
						</li>
					</ul>
				</div>
			</div>

			<!-- Footer Bottom -->
			<div class="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-xs text-slate-500">
				<p>© 2026 Miratech. All Rights Reserved.</p>
				<p>Designed with ❤️ for modern businesses.</p>
			</div>
		</div>
	</footer>

	<!-- Floating WhatsApp Button -->
	<a
		href={waLink}
		target="_blank"
		rel="noopener noreferrer"
		class="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg transition-transform duration-300 hover:scale-110 hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-800"
		style="box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4);"
		title="Hubungi Kami di WhatsApp"
		id="floating-whatsapp-btn"
	>
		<!-- Pulse ring visual -->
		<span class="absolute -z-10 h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60"></span>
		<!-- WhatsApp Icon -->
		<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.63-1.02-5.101-2.871-6.956C16.608 1.93 14.135.91 11.51.91c-5.44 0-9.863 4.42-9.865 9.864 0 1.902.5 3.708 1.45 5.304l-.995 3.639 3.733-.978zm11.567-5.282c-.313-.156-1.854-.915-2.131-1.016-.277-.1-.478-.15-.68.15-.2.3-.777.98-.952 1.18-.175.2-.35.225-.663.069-.313-.156-1.323-.486-2.52-1.553-.931-.83-1.56-1.853-1.742-2.164-.183-.313-.02-.482.137-.638.14-.14.313-.365.47-.547.156-.183.21-.313.313-.52.103-.207.05-.389-.026-.547-.076-.157-.68-1.637-.931-2.245-.245-.59-.494-.51-.68-.52-.176-.008-.377-.01-.58-.01-.202 0-.53.076-.807.38-.278.3-.53.53-.53 1.29s.56 1.493.638 1.6c.078.106 1.095 1.672 2.653 2.344.37.16.66.255.887.329.373.12.712.102.98.062.3-.044 1.854-.757 2.115-1.45.26-.693.26-1.287.182-1.41-.077-.123-.277-.202-.59-.358z"/></svg>
	</a>
</div>
