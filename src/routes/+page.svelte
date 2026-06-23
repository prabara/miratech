<script lang="ts">
	import { onMount } from 'svelte';
	import { 
		Code, Wrench, Shield, Check, ArrowRight, Star, 
		ChevronDown, Send, CheckCircle2, Award, Zap, 
		DollarSign, Phone, Laptop, Camera, Lock
	} from '@lucide/svelte';

	// WhatsApp Configurations
	const waNumber = '6281255556666';
	const baseWaUrl = `https://wa.me/${waNumber}`;

	// FAQ interactive state
	let activeFaqIndex = $state<number | null>(0);

	// Contact Form state (Svelte 5 Runes)
	let clientName = $state('');
	let clientWhatsApp = $state('');
	let clientEmail = $state('');
	let selectedService = $state('Software Custom');
	let clientMessage = $state('');

	// Validation errors
	let errors = $state({
		name: '',
		whatsapp: '',
		message: ''
	});

	// Service Tabs for portfolio filtering or general display
	let activeTab = $state('semua');

	// Form Submission validation & redirect
	function handleFormSubmit(e: SubmitEvent) {
		e.preventDefault();

		// Reset errors
		errors.name = '';
		errors.whatsapp = '';
		errors.message = '';

		let isValid = true;

		if (!clientName.trim()) {
			errors.name = 'Nama lengkap wajib diisi';
			isValid = false;
		}

		if (!clientWhatsApp.trim()) {
			errors.whatsapp = 'Nomor WhatsApp wajib diisi';
			isValid = false;
		} else if (!/^\+?[0-9\s-]{8,15}$/.test(clientWhatsApp.trim())) {
			errors.whatsapp = 'Format nomor WhatsApp tidak valid';
			isValid = false;
		}

		if (!clientMessage.trim()) {
			errors.message = 'Pesan konsultasi wajib diisi';
			isValid = false;
		}

		if (!isValid) return;

		// Form WA Message Format
		const textMessage = `Halo Miratech, saya ingin berkonsultasi mengenai layanan IT:

Nama: ${clientName.trim()}
WhatsApp: ${clientWhatsApp.trim()}
Email: ${clientEmail.trim() || '-'}
Jenis Layanan: ${selectedService}

Pesan:
${clientMessage.trim()}`;

		const redirectUrl = `${baseWaUrl}?text=${encodeURIComponent(textMessage)}`;
		window.open(redirectUrl, '_blank');
	}

	// Dynamic scroll animations using IntersectionObserver
	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('opacity-100', 'translate-y-0');
						entry.target.classList.remove('opacity-0', 'translate-y-10');
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1 }
		);

		document.querySelectorAll('.scroll-reveal').forEach((el) => {
			observer.observe(el);
		});
	});

	// Dynamic FAQ toggle
	function toggleFaq(index: number) {
		if (activeFaqIndex === index) {
			activeFaqIndex = null;
		} else {
			activeFaqIndex = index;
		}
	}
</script>

<!-- HERO SECTION -->
<section id="beranda" class="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 bg-gradient-to-b from-blue-50/50 to-white dark:from-slate-900/30 dark:to-[#0B0F19]">
	<!-- Background glow circles -->
	<div class="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-primary/10 blur-3xl dark:bg-primary/5"></div>
	<div class="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-accent/10 blur-3xl dark:bg-accent/5"></div>

	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
			<!-- Hero Text -->
			<div class="lg:col-span-7 flex flex-col items-start text-left scroll-reveal transition-all duration-700 opacity-0 translate-y-10">
				<!-- Tagline / Badge -->
				<span class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide text-primary bg-blue-50 dark:bg-blue-950/40 dark:text-accent border border-blue-100 dark:border-blue-900 mb-6">
					<span class="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
					Solusi Teknologi Terbaik untuk Bisnis Anda
				</span>

				<h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
					Solusi IT Profesional untuk <span class="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Bisnis Modern</span>
				</h1>
				
				<p class="mt-6 text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
					Kami membantu bisnis berkembang melalui layanan pembuatan software custom, perbaikan komputer dan laptop, serta pemasangan CCTV profesional.
				</p>

				<!-- Hero CTA Buttons -->
				<div class="mt-8 flex flex-wrap gap-4 w-full sm:w-auto">
					<a
						href="{baseWaUrl}?text={encodeURIComponent('Halo Miratech, saya ingin konsultasi gratis melalui WhatsApp.')}"
						target="_blank"
						rel="noopener noreferrer"
						class="btn-ripple bg-primary hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-2xl flex items-center justify-center gap-2.5 shadow-md w-full sm:w-auto text-base"
						id="hero-cta-primary"
					>
						<!-- WhatsApp Icon -->
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.63-1.02-5.101-2.871-6.956C16.608 1.93 14.135.91 11.51.91c-5.44 0-9.863 4.42-9.865 9.864 0 1.902.5 3.708 1.45 5.304l-.995 3.639 3.733-.978zm11.567-5.282c-.313-.156-1.854-.915-2.131-1.016-.277-.1-.478-.15-.68.15-.2.3-.777.98-.952 1.18-.175.2-.35.225-.663.069-.313-.156-1.323-.486-2.52-1.553-.931-.83-1.56-1.853-1.742-2.164-.183-.313-.02-.482.137-.638.14-.14.313-.365.47-.547.156-.183.21-.313.313-.52.103-.207.05-.389-.026-.547-.076-.157-.68-1.637-.931-2.245-.245-.59-.494-.51-.68-.52-.176-.008-.377-.01-.58-.01-.202 0-.53.076-.807.38-.278.3-.53.53-.53 1.29s.56 1.493.638 1.6c.078.106 1.095 1.672 2.653 2.344.37.16.66.255.887.329.373.12.712.102.98.062.3-.044 1.854-.757 2.115-1.45.26-.693.26-1.287.182-1.41-.077-.123-.277-.202-.59-.358z"/></svg>
						Konsultasi Gratis via WhatsApp
					</a>
					<a
						href="#layanan"
						class="btn-ripple flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold px-8 py-4 rounded-2xl w-full sm:w-auto text-base"
						id="hero-cta-secondary"
					>
						Lihat Layanan
						<ArrowRight class="h-5 w-5" />
					</a>
				</div>

				<!-- Statistics grid -->
				<div class="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 w-full pt-8 border-t border-slate-200/60 dark:border-slate-800/60">
					<div>
						<span class="block text-3xl font-extrabold text-primary dark:text-accent">100+</span>
						<span class="block text-xs uppercase tracking-wider text-slate-500 font-bold mt-1.5">Project Selesai</span>
					</div>
					<div>
						<span class="block text-3xl font-extrabold text-primary dark:text-accent">50+</span>
						<span class="block text-xs uppercase tracking-wider text-slate-500 font-bold mt-1.5">Klien Aktif</span>
					</div>
					<div>
						<span class="block text-3xl font-extrabold text-primary dark:text-accent">5+</span>
						<span class="block text-xs uppercase tracking-wider text-slate-500 font-bold mt-1.5">Tahun Pengalaman</span>
					</div>
					<div>
						<span class="block text-3xl font-extrabold text-primary dark:text-accent">24/7</span>
						<span class="block text-xs uppercase tracking-wider text-slate-500 font-bold mt-1.5">Support</span>
					</div>
				</div>
			</div>

			<!-- Hero Image / Illustration -->
			<div class="lg:col-span-5 relative flex justify-center scroll-reveal transition-all duration-700 opacity-0 translate-y-10 delay-200">
				<!-- Decorative backdrop glow -->
				<div class="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-3xl blur-2xl -z-10"></div>
				<!-- Real rendered illustration from generative AI -->
				<div class="relative overflow-hidden rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl glass p-2 hover:scale-[1.02] transition-transform duration-500">
					<img
						src="/hero_illustration.jpg"
						alt="Miratech Technology Services - Software, CCTV, and Computer Repairs"
						class="rounded-2xl max-w-full h-auto object-cover"
						width="800"
						height="450"
					/>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- SERVICES SECTION -->
<section id="layanan" class="py-24 bg-white dark:bg-[#0B0F19]">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Section Header -->
		<div class="text-center max-w-3xl mx-auto mb-16 scroll-reveal transition-all duration-700 opacity-0 translate-y-10">
			<h2 class="text-base font-bold text-primary dark:text-accent uppercase tracking-wider">Layanan Profesional</h2>
			<p class="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
				Solusi IT Lengkap untuk Kebutuhan Anda
			</p>
			<p class="mt-4 text-lg text-slate-500 dark:text-slate-400">
				Kami menyediakan berbagai layanan teknologi untuk membantu operasional bisnis dan keamanan Anda menjadi lebih efisien dan modern.
			</p>
		</div>

		<!-- Services Grid -->
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
			<!-- Service 1: Software Custom -->
			<div class="flex flex-col justify-between rounded-2xl glass p-8 hover-card-trigger glow-primary scroll-reveal transition-all duration-700 opacity-0 translate-y-10">
				<div>
					<div class="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-primary mb-6">
						<Code class="h-6 w-6" />
					</div>
					<h3 class="text-xl font-bold text-slate-900 dark:text-white">Jasa Pembuatan Software Custom</h3>
					<p class="mt-3.5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
						Membantu digitalisasi bisnis dengan aplikasi yang dibuat sesuai kebutuhan alur kerja perusahaan Anda.
					</p>

					<div class="mt-6 border-t border-slate-100 dark:border-slate-800 pt-6">
						<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Sistem & Aplikasi Populer:</h4>
						<ul class="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
							<li class="flex items-center gap-1.5">
								<Check class="h-3.5 w-3.5 text-primary" /> Sistem Toko
							</li>
							<li class="flex items-center gap-1.5">
								<Check class="h-3.5 w-3.5 text-primary" /> Sistem Apotek
							</li>
							<li class="flex items-center gap-1.5">
								<Check class="h-3.5 w-3.5 text-primary" /> Sistem Laundry
							</li>
							<li class="flex items-center gap-1.5">
								<Check class="h-3.5 w-3.5 text-primary" /> POS Kasir
							</li>
							<li class="flex items-center gap-1.5">
								<Check class="h-3.5 w-3.5 text-primary" /> Cuci Motor
							</li>
							<li class="flex items-center gap-1.5">
								<Check class="h-3.5 w-3.5 text-primary" /> Inventory
							</li>
							<li class="flex items-center gap-1.5">
								<Check class="h-3.5 w-3.5 text-primary" /> ERP / HRM
							</li>
							<li class="flex items-center gap-1.5">
								<Check class="h-3.5 w-3.5 text-primary" /> Sistem Custom
							</li>
						</ul>
					</div>
				</div>

				<div class="mt-8 pt-4">
					<a
						href="{baseWaUrl}?text={encodeURIComponent('Halo Miratech, saya ingin berkonsultasi mengenai Jasa Pembuatan Software Custom.')}"
						target="_blank"
						rel="noopener noreferrer"
						class="btn-ripple w-full py-3.5 px-6 rounded-xl bg-primary hover:bg-blue-700 text-white font-semibold text-center text-sm inline-flex items-center justify-center gap-2"
						id="service-cta-1"
					>
						Diskusikan Kebutuhan Anda
						<ArrowRight class="h-4 w-4" />
					</a>
				</div>
			</div>

			<!-- Service 2: Computer & Laptop Repair -->
			<div class="flex flex-col justify-between rounded-2xl glass p-8 hover-card-trigger glow-primary scroll-reveal transition-all duration-700 opacity-0 translate-y-10 delay-100">
				<div>
					<div class="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-primary mb-6">
						<Wrench class="h-6 w-6" />
					</div>
					<h3 class="text-xl font-bold text-slate-900 dark:text-white">Perbaikan Komputer & Laptop</h3>
					<p class="mt-3.5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
						Layanan pemeliharaan, perbaikan, dan upgrade hardware komputer untuk pengguna perorangan maupun perkantoran.
					</p>

					<div class="mt-6 border-t border-slate-100 dark:border-slate-800 pt-6">
						<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Layanan Maintenance:</h4>
						<ul class="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
							<li class="flex items-center gap-1.5">
								<Check class="h-3.5 w-3.5 text-primary" /> Install Ulang
							</li>
							<li class="flex items-center gap-1.5">
								<Check class="h-3.5 w-3.5 text-primary" /> Upgrade SSD
							</li>
							<li class="flex items-center gap-1.5">
								<Check class="h-3.5 w-3.5 text-primary" /> Upgrade RAM
							</li>
							<li class="flex items-center gap-1.5">
								<Check class="h-3.5 w-3.5 text-primary" /> Pembersihan Virus
							</li>
							<li class="flex items-center gap-1.5">
								<Check class="h-3.5 w-3.5 text-primary" /> Ganti Keyboard/LCD
							</li>
							<li class="flex items-center gap-1.5">
								<Check class="h-3.5 w-3.5 text-primary" /> Backup Data
							</li>
							<li class="flex items-center gap-1.5 flex-span-2">
								<Check class="h-3.5 w-3.5 text-primary" /> Maintenance Berkala
							</li>
						</ul>
					</div>
				</div>

				<div class="mt-8 pt-4">
					<a
						href="{baseWaUrl}?text={encodeURIComponent('Halo Miratech, saya butuh bantuan teknisi untuk Perbaikan Komputer & Laptop.')}"
						target="_blank"
						rel="noopener noreferrer"
						class="btn-ripple w-full py-3.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-center text-sm inline-flex items-center justify-center gap-2 dark:bg-slate-700 dark:hover:bg-slate-600"
						id="service-cta-2"
					>
						Hubungi Teknisi
						<Phone class="h-4 w-4" />
					</a>
				</div>
			</div>

			<!-- Service 3: CCTV Installation -->
			<div class="flex flex-col justify-between rounded-2xl glass p-8 hover-card-trigger glow-primary scroll-reveal transition-all duration-700 opacity-0 translate-y-10 delay-200">
				<div>
					<div class="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-primary mb-6">
						<Camera class="h-6 w-6" />
					</div>
					<h3 class="text-xl font-bold text-slate-900 dark:text-white">Pemasangan CCTV</h3>
					<p class="mt-3.5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
						Layanan instalasi kamera pengawas profesional berkualitas tinggi untuk meningkatkan keamanan rumah dan tempat bisnis.
					</p>

					<div class="mt-6 border-t border-slate-100 dark:border-slate-800 pt-6">
						<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Fitur Keamanan CCTV:</h4>
						<ul class="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
							<li class="flex items-center gap-1.5">
								<Check class="h-3.5 w-3.5 text-primary" /> Survey Lokasi
							</li>
							<li class="flex items-center gap-1.5">
								<Check class="h-3.5 w-3.5 text-primary" /> CCTV IP & Analog
							</li>
							<li class="flex items-center gap-1.5">
								<Check class="h-3.5 w-3.5 text-primary" /> Remote Monitoring
							</li>
							<li class="flex items-center gap-1.5">
								<Check class="h-3.5 w-3.5 text-primary" /> Mobile Access (HP)
							</li>
							<li class="flex items-center gap-1.5">
								<Check class="h-3.5 w-3.5 text-primary" /> Setting DVR / NVR
							</li>
							<li class="flex items-center gap-1.5">
								<Check class="h-3.5 w-3.5 text-primary" /> Maintenance CCTV
							</li>
							<li class="flex items-center gap-1.5">
								<Check class="h-3.5 w-3.5 text-primary" /> Upgrade Sistem
							</li>
						</ul>
					</div>
				</div>

				<div class="mt-8 pt-4">
					<a
						href="{baseWaUrl}?text={encodeURIComponent('Halo Miratech, saya ingin menjadwalkan survey untuk Pemasangan CCTV.')}"
						target="_blank"
						rel="noopener noreferrer"
						class="btn-ripple w-full py-3.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-center text-sm inline-flex items-center justify-center gap-2 dark:bg-slate-700 dark:hover:bg-slate-600"
						id="service-cta-3"
					>
						Jadwalkan Survey
						<Camera class="h-4 w-4" />
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- WHY CHOOSE US -->
<section id="mengapa-kami" class="py-24 bg-slate-50 dark:bg-slate-900/50">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Section Header -->
		<div class="text-center max-w-3xl mx-auto mb-16 scroll-reveal transition-all duration-700 opacity-0 translate-y-10">
			<h2 class="text-base font-bold text-primary dark:text-accent uppercase tracking-wider">Mengapa Memilih Kami</h2>
			<p class="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
				Keunggulan Layanan Miratech
			</p>
			<p class="mt-4 text-lg text-slate-500 dark:text-slate-400">
				Kami berkomitmen memberikan hasil pekerjaan terbaik dan layanan purna jual yang terpercaya untuk kelancaran bisnis Anda.
			</p>
		</div>

		<!-- Feature Cards Grid (6 cards) -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			<!-- 1. Profesional -->
			<div class="rounded-2xl glass p-6 hover-card-trigger flex gap-4 scroll-reveal transition-all duration-700 opacity-0 translate-y-10">
				<div class="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-primary shrink-0">
					<Award class="h-5 w-5" />
				</div>
				<div>
					<h3 class="text-lg font-bold text-slate-900 dark:text-white">Profesional</h3>
					<p class="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
						Didukung oleh tim teknisi dan software developer yang berpengalaman dan tersertifikasi di bidangnya.
					</p>
				</div>
			</div>

			<!-- 2. Harga Kompetitif -->
			<div class="rounded-2xl glass p-6 hover-card-trigger flex gap-4 scroll-reveal transition-all duration-700 opacity-0 translate-y-10 delay-75">
				<div class="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-primary shrink-0">
					<DollarSign class="h-5 w-5" />
				</div>
				<div>
					<h3 class="text-lg font-bold text-slate-900 dark:text-white">Harga Kompetitif</h3>
					<p class="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
						Biaya transparan, rincian jelas di awal, dan penawaran harga yang disesuaikan dengan anggaran perusahaan Anda.
					</p>
				</div>
			</div>

			<!-- 3. Konsultasi Gratis -->
			<div class="rounded-2xl glass p-6 hover-card-trigger flex gap-4 scroll-reveal transition-all duration-700 opacity-0 translate-y-10 delay-150">
				<div class="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-primary shrink-0">
					<!-- CheckCircle icon -->
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
				</div>
				<div>
					<h3 class="text-lg font-bold text-slate-900 dark:text-white">Konsultasi Gratis</h3>
					<p class="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
						Diskusikan bebas semua kendala komputer, kebutuhan software, maupun denah CCTV tanpa dikenakan biaya konsultasi awal.
					</p>
				</div>
			</div>

			<!-- 4. Support Cepat -->
			<div class="rounded-2xl glass p-6 hover-card-trigger flex gap-4 scroll-reveal transition-all duration-700 opacity-0 translate-y-10 delay-200">
				<div class="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-primary shrink-0">
					<Zap class="h-5 w-5" />
				</div>
				<div>
					<h3 class="text-lg font-bold text-slate-900 dark:text-white">Support Cepat</h3>
					<p class="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
						Layanan tanggap cepat. Kapan saja Anda membutuhkan bantuan, tim kami siap merespon keluhan Anda melalui WhatsApp.
					</p>
				</div>
			</div>

			<!-- 5. Bergaransi -->
			<div class="rounded-2xl glass p-6 hover-card-trigger flex gap-4 scroll-reveal transition-all duration-700 opacity-0 translate-y-10 delay-250">
				<div class="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-primary shrink-0">
					<Shield class="h-5 w-5" />
				</div>
				<div>
					<h3 class="text-lg font-bold text-slate-900 dark:text-white">Bergaransi</h3>
					<p class="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
						Kami memberikan jaminan garansi hasil pekerjaan hardware, instalasi CCTV, maupun bug-free untuk software yang kami buat.
					</p>
				</div>
			</div>

			<!-- 6. Custom Solution -->
			<div class="rounded-2xl glass p-6 hover-card-trigger flex gap-4 scroll-reveal transition-all duration-700 opacity-0 translate-y-10 delay-300">
				<div class="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-primary shrink-0">
					<!-- Settings icon -->
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
				</div>
				<div>
					<h3 class="text-lg font-bold text-slate-900 dark:text-white">Custom Solution</h3>
					<p class="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
						Tidak ada solusi satu ukuran untuk semua. Kami merancang sistem yang benar-benar cocok dengan alur bisnis Anda.
					</p>
				</div>
			</div>
		</div>

		<!-- Quick Center CTA -->
		<div class="text-center mt-12 scroll-reveal transition-all duration-700 opacity-0 translate-y-10">
			<a
				href="{baseWaUrl}?text={encodeURIComponent('Halo Miratech, saya ingin tahu lebih lanjut mengapa saya harus memilih layanan Anda.')}"
				target="_blank"
				rel="noopener noreferrer"
				class="btn-ripple bg-primary hover:bg-blue-700 text-white font-semibold text-sm px-8 py-3.5 rounded-xl inline-flex items-center gap-2"
				id="why-cta-main"
			>
				Konsultasi Gratis Sekarang
				<Phone class="h-4 w-4" />
			</a>
		</div>
	</div>
</section>

<!-- PORTFOLIO SECTION -->
<section id="portfolio" class="py-24 bg-white dark:bg-[#0B0F19]">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Section Header -->
		<div class="text-center max-w-3xl mx-auto mb-12 scroll-reveal transition-all duration-700 opacity-0 translate-y-10">
			<h2 class="text-base font-bold text-primary dark:text-accent uppercase tracking-wider">Portfolio Kami</h2>
			<p class="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
				Project yang Telah Kami Kerjakan
			</p>
			<p class="mt-4 text-lg text-slate-500 dark:text-slate-400">
				Lihat beberapa pengerjaan terbaik kami dari aplikasi custom hingga integrasi infrastruktur IT.
			</p>
		</div>

		<!-- Filter Tabs -->
		<div class="flex justify-center gap-2 mb-10 scroll-reveal transition-all duration-700 opacity-0 translate-y-10">
			<button 
				onclick={() => activeTab = 'semua'}
				class="px-5 py-2.5 rounded-full text-sm font-semibold transition-all {activeTab === 'semua' ? 'bg-primary text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}"
			>
				Semua
			</button>
			<button 
				onclick={() => activeTab = 'software'}
				class="px-5 py-2.5 rounded-full text-sm font-semibold transition-all {activeTab === 'software' ? 'bg-primary text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}"
			>
				Software
			</button>
			<button 
				onclick={() => activeTab = 'hardware'}
				class="px-5 py-2.5 rounded-full text-sm font-semibold transition-all {activeTab === 'hardware' ? 'bg-primary text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}"
			>
				Hardware & CCTV
			</button>
		</div>

		<!-- Portfolio Cards Grid (6 cards) -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			<!-- Card 1: Sistem Kasir Toko (Software) -->
			{#if activeTab === 'semua' || activeTab === 'software'}
				<div class="flex flex-col justify-between rounded-2xl glass p-6 hover-card-trigger scroll-reveal transition-all duration-700 opacity-0 translate-y-10">
					<div>
						<!-- Isometric CSS visual representation of dashboard -->
						<div class="w-full h-44 rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400 p-4 flex flex-col justify-between text-white relative overflow-hidden mb-6">
							<div class="absolute -right-8 -bottom-8 w-28 h-28 bg-white/10 rounded-full blur-xl"></div>
							<div class="flex justify-between items-center z-10">
								<span class="text-[10px] uppercase font-bold tracking-widest bg-white/20 px-2.5 py-1 rounded-full">Web SaaS</span>
								<Code class="h-4 w-4 opacity-80" />
							</div>
							<div class="z-10">
								<div class="text-2xl font-black font-sans tracking-tight">$ 18,450.00</div>
								<div class="text-[10px] opacity-70 mt-0.5">Penjualan Bulanan Real-time</div>
							</div>
							<div class="h-8 flex gap-1.5 items-end z-10">
								<div class="w-full bg-white/30 h-1/3 rounded-sm"></div>
								<div class="w-full bg-white/30 h-2/3 rounded-sm"></div>
								<div class="w-full bg-white h-full rounded-sm"></div>
								<div class="w-full bg-white/50 h-1/2 rounded-sm"></div>
								<div class="w-full bg-white/40 h-3/4 rounded-sm"></div>
							</div>
						</div>
						<h3 class="text-lg font-bold text-slate-900 dark:text-white">Sistem Kasir Toko</h3>
						<p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
							Dashboard penjualan digital dan sinkronisasi stok otomatis untuk toko ritel modern.
						</p>
					</div>
					<div class="mt-6 pt-2">
						<a 
							href="{baseWaUrl}?text={encodeURIComponent('Halo Miratech, saya tertarik dengan project Sistem Kasir Toko dan ingin berkonsultasi.')}" 
							target="_blank" 
							rel="noopener noreferrer"
							class="text-sm font-semibold text-primary dark:text-accent hover:underline inline-flex items-center gap-1.5"
						>
							Tanya Detail Project <ArrowRight class="h-4 w-4" />
						</a>
					</div>
				</div>
			{/if}

			<!-- Card 2: Sistem Apotek (Software) -->
			{#if activeTab === 'semua' || activeTab === 'software'}
				<div class="flex flex-col justify-between rounded-2xl glass p-6 hover-card-trigger scroll-reveal transition-all duration-700 opacity-0 translate-y-10 delay-75">
					<div>
						<!-- Isometric visual of health inventory database -->
						<div class="w-full h-44 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-400 p-4 flex flex-col justify-between text-white relative overflow-hidden mb-6">
							<div class="absolute -right-8 -bottom-8 w-28 h-28 bg-white/10 rounded-full blur-xl"></div>
							<div class="flex justify-between items-center z-10">
								<span class="text-[10px] uppercase font-bold tracking-widest bg-white/20 px-2.5 py-1 rounded-full">Sistem Inventori</span>
								<CheckCircle2 class="h-4 w-4 opacity-80" />
							</div>
							<div class="z-10">
								<div class="text-xl font-bold font-sans">98.4% Stok Aman</div>
								<div class="text-[10px] opacity-70 mt-0.5">Manajemen Masa Kadaluarsa Obat</div>
							</div>
							<div class="flex gap-2 z-10">
								<div class="h-4 w-12 bg-white/30 rounded-full"></div>
								<div class="h-4 w-16 bg-white rounded-full"></div>
							</div>
						</div>
						<h3 class="text-lg font-bold text-slate-900 dark:text-white">Sistem Apotek</h3>
						<p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
							Manajemen resep, peringatan otomatis masa kedaluwarsa obat, dan integrasi kasir apoteker.
						</p>
					</div>
					<div class="mt-6 pt-2">
						<a 
							href="{baseWaUrl}?text={encodeURIComponent('Halo Miratech, saya tertarik dengan project Sistem Apotek dan ingin berkonsultasi.')}" 
							target="_blank" 
							rel="noopener noreferrer"
							class="text-sm font-semibold text-primary dark:text-accent hover:underline inline-flex items-center gap-1.5"
						>
							Tanya Detail Project <ArrowRight class="h-4 w-4" />
						</a>
					</div>
				</div>
			{/if}

			<!-- Card 3: Sistem Laundry (Software) -->
			{#if activeTab === 'semua' || activeTab === 'software'}
				<div class="flex flex-col justify-between rounded-2xl glass p-6 hover-card-trigger scroll-reveal transition-all duration-700 opacity-0 translate-y-10 delay-150">
					<div>
						<!-- Isometric Laundry visual -->
						<div class="w-full h-44 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-400 p-4 flex flex-col justify-between text-white relative overflow-hidden mb-6">
							<div class="absolute -right-8 -bottom-8 w-28 h-28 bg-white/10 rounded-full blur-xl"></div>
							<div class="flex justify-between items-center z-10">
								<span class="text-[10px] uppercase font-bold tracking-widest bg-white/20 px-2.5 py-1 rounded-full">Tracking App</span>
								<Zap class="h-4 w-4 opacity-80" />
							</div>
							<div class="z-10">
								<div class="text-xl font-bold font-sans">Cuci & Lipat Aktif</div>
								<div class="text-[10px] opacity-70 mt-0.5">Sms / WhatsApp Notifikasi Otomatis</div>
							</div>
							<div class="w-full bg-white/20 h-2 rounded-full z-10 overflow-hidden">
								<div class="bg-white h-full w-2/3"></div>
							</div>
						</div>
						<h3 class="text-lg font-bold text-slate-900 dark:text-white">Sistem Laundry</h3>
						<p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
							Sistem penimbangan terintegrasi kasir dan tracking progress cucian dengan notifikasi WhatsApp.
						</p>
					</div>
					<div class="mt-6 pt-2">
						<a 
							href="{baseWaUrl}?text={encodeURIComponent('Halo Miratech, saya tertarik dengan project Sistem Laundry dan ingin berkonsultasi.')}" 
							target="_blank" 
							rel="noopener noreferrer"
							class="text-sm font-semibold text-primary dark:text-accent hover:underline inline-flex items-center gap-1.5"
						>
							Tanya Detail Project <ArrowRight class="h-4 w-4" />
						</a>
					</div>
				</div>
			{/if}

			<!-- Card 4: Sistem Pencucian Motor (Software) -->
			{#if activeTab === 'semua' || activeTab === 'software'}
				<div class="flex flex-col justify-between rounded-2xl glass p-6 hover-card-trigger scroll-reveal transition-all duration-700 opacity-0 translate-y-10">
					<div>
						<!-- Visual representation -->
						<div class="w-full h-44 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-400 p-4 flex flex-col justify-between text-white relative overflow-hidden mb-6">
							<div class="absolute -right-8 -bottom-8 w-28 h-28 bg-white/10 rounded-full blur-xl"></div>
							<div class="flex justify-between items-center z-10">
								<span class="text-[10px] uppercase font-bold tracking-widest bg-white/20 px-2.5 py-1 rounded-full">Queue POS</span>
								<Phone class="h-4 w-4 opacity-80" />
							</div>
							<div class="z-10">
								<div class="text-xl font-bold font-sans">Monitoring Antrean</div>
								<div class="text-[10px] opacity-70 mt-0.5">Laporan Transaksi & Absen Karyawan</div>
							</div>
							<div class="flex justify-between items-end z-10">
								<div class="flex -space-x-2">
									<div class="h-6 w-6 rounded-full bg-white/40 border border-white"></div>
									<div class="h-6 w-6 rounded-full bg-white/60 border border-white"></div>
									<div class="h-6 w-6 rounded-full bg-white border border-white"></div>
								</div>
								<span class="text-xs font-bold text-white bg-slate-900/30 px-2 py-0.5 rounded-md">8 Antrean</span>
							</div>
						</div>
						<h3 class="text-lg font-bold text-slate-900 dark:text-white">Sistem Pencucian Motor</h3>
						<p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
							Aplikasi antrean cucian motor/mobil lengkap dengan kalkulasi komisi pencuci dan laporan harian.
						</p>
					</div>
					<div class="mt-6 pt-2">
						<a 
							href="{baseWaUrl}?text={encodeURIComponent('Halo Miratech, saya tertarik dengan project Sistem Pencucian Motor dan ingin berkonsultasi.')}" 
							target="_blank" 
							rel="noopener noreferrer"
							class="text-sm font-semibold text-primary dark:text-accent hover:underline inline-flex items-center gap-1.5"
						>
							Tanya Detail Project <ArrowRight class="h-4 w-4" />
						</a>
					</div>
				</div>
			{/if}

			<!-- Card 5: Instalasi CCTV Kantor (Hardware/CCTV) -->
			{#if activeTab === 'semua' || activeTab === 'hardware'}
				<div class="flex flex-col justify-between rounded-2xl glass p-6 hover-card-trigger scroll-reveal transition-all duration-700 opacity-0 translate-y-10 delay-75">
					<div>
						<!-- Isometric CCTV visual -->
						<div class="w-full h-44 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-600 p-4 flex flex-col justify-between text-white relative overflow-hidden mb-6">
							<div class="absolute -right-8 -bottom-8 w-28 h-28 bg-white/10 rounded-full blur-xl"></div>
							<div class="flex justify-between items-center z-10">
								<span class="text-[10px] uppercase font-bold tracking-widest bg-white/20 px-2.5 py-1 rounded-full">Surveillance</span>
								<Camera class="h-4 w-4 opacity-80" />
							</div>
							<div class="z-10">
								<div class="text-xl font-bold font-sans">Live Feed Active</div>
								<div class="text-[10px] opacity-70 mt-0.5">Kamera IP 4K & Night Vision</div>
							</div>
							<div class="grid grid-cols-2 gap-1 z-10 w-24">
								<div class="h-4 bg-white/20 rounded-sm"></div>
								<div class="h-4 bg-white/40 rounded-sm"></div>
								<div class="h-4 bg-white/30 rounded-sm"></div>
								<div class="h-4 bg-white rounded-sm"></div>
							</div>
						</div>
						<h3 class="text-lg font-bold text-slate-900 dark:text-white">Instalasi CCTV Kantor</h3>
						<p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
							Pemasangan 16 titik kamera CCTV IP beresolusi 4K dengan backup server NVR dan setup remote di smartphone.
						</p>
					</div>
					<div class="mt-6 pt-2">
						<a 
							href="{baseWaUrl}?text={encodeURIComponent('Halo Miratech, saya tertarik dengan project Instalasi CCTV Kantor dan ingin berkonsultasi.')}" 
							target="_blank" 
							rel="noopener noreferrer"
							class="text-sm font-semibold text-primary dark:text-accent hover:underline inline-flex items-center gap-1.5"
						>
							Tanya Detail Project <ArrowRight class="h-4 w-4" />
						</a>
					</div>
				</div>
			{/if}

			<!-- Card 6: Infrastruktur IT (Hardware/CCTV) -->
			{#if activeTab === 'semua' || activeTab === 'hardware'}
				<div class="flex flex-col justify-between rounded-2xl glass p-6 hover-card-trigger scroll-reveal transition-all duration-700 opacity-0 translate-y-10 delay-150">
					<div>
						<!-- Isometric Network visual -->
						<div class="w-full h-44 rounded-xl bg-gradient-to-tr from-indigo-700 to-blue-500 p-4 flex flex-col justify-between text-white relative overflow-hidden mb-6">
							<div class="absolute -right-8 -bottom-8 w-28 h-28 bg-white/10 rounded-full blur-xl"></div>
							<div class="flex justify-between items-center z-10">
								<span class="text-[10px] uppercase font-bold tracking-widest bg-white/20 px-2.5 py-1 rounded-full">Network Setup</span>
								<Laptop class="h-4 w-4 opacity-80" />
							</div>
							<div class="z-10">
								<div class="text-xl font-bold font-sans">MikroTik Router Config</div>
								<div class="text-[10px] opacity-70 mt-0.5">Manajemen Bandwidth & Server Lokal</div>
							</div>
							<div class="flex gap-1 z-10">
								<span class="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
								<span class="text-[9px] font-bold">1 Gbps LAN Link Up</span>
							</div>
						</div>
						<h3 class="text-lg font-bold text-slate-900 dark:text-white">Infrastruktur IT</h3>
						<p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
							Peremajaan server lokal kantor, instalasi kabel LAN terstruktur, dan pembagian bandwidth internet (WiFi).
						</p>
					</div>
					<div class="mt-6 pt-2">
						<a 
							href="{baseWaUrl}?text={encodeURIComponent('Halo Miratech, saya tertarik dengan project Infrastruktur IT dan ingin berkonsultasi.')}" 
							target="_blank" 
							rel="noopener noreferrer"
							class="text-sm font-semibold text-primary dark:text-accent hover:underline inline-flex items-center gap-1.5"
						>
							Tanya Detail Project <ArrowRight class="h-4 w-4" />
						</a>
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>

<!-- TESTIMONIAL SECTION -->
<section id="testimoni" class="py-24 bg-slate-50 dark:bg-slate-900/50">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Section Header -->
		<div class="text-center max-w-3xl mx-auto mb-16 scroll-reveal transition-all duration-700 opacity-0 translate-y-10">
			<h2 class="text-base font-bold text-primary dark:text-accent uppercase tracking-wider">Testimoni Klien</h2>
			<p class="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
				Apa Kata Klien Kami
			</p>
			<p class="mt-4 text-lg text-slate-500 dark:text-slate-400">
				Ulasan tulus dari para pelaku bisnis yang telah bermitra dan mempercayakan solusi teknologi mereka kepada Miratech.
			</p>
		</div>

		<!-- Testimonial Grid -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<!-- Testimonial 1 -->
			<div class="rounded-2xl glass p-8 hover-card-trigger scroll-reveal transition-all duration-700 opacity-0 translate-y-10">
				<!-- Star rating -->
				<div class="flex text-amber-400 gap-1 mb-6">
					<Star class="h-5 w-5 fill-current" />
					<Star class="h-5 w-5 fill-current" />
					<Star class="h-5 w-5 fill-current" />
					<Star class="h-5 w-5 fill-current" />
					<Star class="h-5 w-5 fill-current" />
				</div>
				<p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed italic">
					"Miratech membantu mendigitalisasi kasir toko saya dengan sistem custom. Sekarang stok barang dan laporan penjualan bulanan jadi rapi. Sangat direkomendasikan untuk pemilik toko ritel!"
				</p>
				<!-- Profile -->
				<div class="mt-8 flex items-center gap-4 border-t border-slate-100 dark:border-slate-800 pt-6">
					<div class="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">AW</div>
					<div>
						<h4 class="text-sm font-bold text-slate-900 dark:text-white">Andi Wijaya</h4>
						<span class="text-xs text-slate-500 dark:text-slate-400">Owner Toko Berkah</span>
					</div>
				</div>
			</div>

			<!-- Testimonial 2 -->
			<div class="rounded-2xl glass p-8 hover-card-trigger scroll-reveal transition-all duration-700 opacity-0 translate-y-10 delay-100">
				<!-- Star rating -->
				<div class="flex text-amber-400 gap-1 mb-6">
					<Star class="h-5 w-5 fill-current" />
					<Star class="h-5 w-5 fill-current" />
					<Star class="h-5 w-5 fill-current" />
					<Star class="h-5 w-5 fill-current" />
					<Star class="h-5 w-5 fill-current" />
				</div>
				<p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed italic">
					"Cepat tanggap sekali. Sistem apotek kami sering bermasalah, tapi setelah migrasi ke software buatan Miratech, pelayanan resep obat jadi sangat cepat dan minim kesalahan purna jual."
				</p>
				<!-- Profile -->
				<div class="mt-8 flex items-center gap-4 border-t border-slate-100 dark:border-slate-800 pt-6">
					<div class="h-12 w-12 rounded-full bg-indigo-500/20 flex items-center justify-center font-bold text-indigo-500">RH</div>
					<div>
						<h4 class="text-sm font-bold text-slate-900 dark:text-white">Dr. Rina Handayani</h4>
						<span class="text-xs text-slate-500 dark:text-slate-400">Pemilik Apotek Sehat</span>
					</div>
				</div>
			</div>

			<!-- Testimonial 3 -->
			<div class="rounded-2xl glass p-8 hover-card-trigger scroll-reveal transition-all duration-700 opacity-0 translate-y-10 delay-200">
				<!-- Star rating -->
				<div class="flex text-amber-400 gap-1 mb-6">
					<Star class="h-5 w-5 fill-current" />
					<Star class="h-5 w-5 fill-current" />
					<Star class="h-5 w-5 fill-current" />
					<Star class="h-5 w-5 fill-current" />
					<Star class="h-5 w-5 fill-current" />
				</div>
				<p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed italic">
					"Pemasangan CCTV di 3 cabang kantor kami dikerjakan sangat rapi dan profesional. Monitoring dari HP lancar dan kami diberikan training cara pengoperasiannya sampai paham betul."
				</p>
				<!-- Profile -->
				<div class="mt-8 flex items-center gap-4 border-t border-slate-100 dark:border-slate-800 pt-6">
					<div class="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center font-bold text-emerald-500">BS</div>
					<div>
						<h4 class="text-sm font-bold text-slate-900 dark:text-white">Budi Santoso</h4>
						<span class="text-xs text-slate-500 dark:text-slate-400">Direktur CV Maju Bersama</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- FAQ SECTION -->
<section class="py-24 bg-white dark:bg-[#0B0F19]">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<!-- Section Header -->
		<div class="text-center max-w-3xl mx-auto mb-16 scroll-reveal transition-all duration-700 opacity-0 translate-y-10">
			<h2 class="text-base font-bold text-primary dark:text-accent uppercase tracking-wider">FAQ</h2>
			<p class="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
				Pertanyaan yang Sering Diajukan
			</p>
		</div>

		<!-- FAQ Accordion -->
		<div class="flex flex-col gap-4 scroll-reveal transition-all duration-700 opacity-0 translate-y-10">
			<!-- FAQ Item 1 -->
			<div class="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all {activeFaqIndex === 0 ? 'bg-slate-50/50 dark:bg-slate-900/30' : 'bg-transparent'}">
				<button 
					onclick={() => toggleFaq(0)} 
					class="w-full px-6 py-5 text-left flex justify-between items-center gap-4"
				>
					<span class="font-bold text-slate-900 dark:text-white">Bagaimana proses konsultasi di Miratech?</span>
					<ChevronDown class="h-5 w-5 text-slate-500 transition-transform duration-300 {activeFaqIndex === 0 ? 'rotate-180' : ''}" />
				</button>
				{#if activeFaqIndex === 0}
					<div class="px-6 pb-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-4">
						Konsultasi di Miratech 100% gratis. Anda cukup menghubungi kami melalui WhatsApp, menjelaskan kebutuhan bisnis Anda, dan tim kami akan memberikan solusi teknologi terbaik beserta estimasi biaya dan waktu pengerjaan.
					</div>
				{/if}
			</div>

			<!-- FAQ Item 2 -->
			<div class="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all {activeFaqIndex === 1 ? 'bg-slate-50/50 dark:bg-slate-900/30' : 'bg-transparent'}">
				<button 
					onclick={() => toggleFaq(1)} 
					class="w-full px-6 py-5 text-left flex justify-between items-center gap-4"
				>
					<span class="font-bold text-slate-900 dark:text-white">Berapa lama pengerjaan pembuatan software custom?</span>
					<ChevronDown class="h-5 w-5 text-slate-500 transition-transform duration-300 {activeFaqIndex === 1 ? 'rotate-180' : ''}" />
				</button>
				{#if activeFaqIndex === 1}
					<div class="px-6 pb-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-4">
						Waktu pengerjaan bergantung pada kompleksitas fitur yang Anda butuhkan. Untuk aplikasi POS Kasir atau inventori sederhana biasanya berkisar antara 2-4 minggu, sedangkan sistem ERP custom berskala besar berkisar antara 2-4 bulan.
					</div>
				{/if}
			</div>

			<!-- FAQ Item 3 -->
			<div class="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all {activeFaqIndex === 2 ? 'bg-slate-50/50 dark:bg-slate-900/30' : 'bg-transparent'}">
				<button 
					onclick={() => toggleFaq(2)} 
					class="w-full px-6 py-5 text-left flex justify-between items-center gap-4"
				>
					<span class="font-bold text-slate-900 dark:text-white">Apakah ada garansi untuk perbaikan komputer dan laptop?</span>
					<ChevronDown class="h-5 w-5 text-slate-500 transition-transform duration-300 {activeFaqIndex === 2 ? 'rotate-180' : ''}" />
				</button>
				{#if activeFaqIndex === 2}
					<div class="px-6 pb-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-4">
						Ya, kami memberikan garansi 30 hari untuk setiap perbaikan hardware maupun software. Jika masalah yang sama terjadi kembali dalam masa garansi, teknisi kami akan memperbaikinya kembali secara gratis.
					</div>
				{/if}
			</div>

			<!-- FAQ Item 4 -->
			<div class="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all {activeFaqIndex === 3 ? 'bg-slate-50/50 dark:bg-slate-900/30' : 'bg-transparent'}">
				<button 
					onclick={() => toggleFaq(3)} 
					class="w-full px-6 py-5 text-left flex justify-between items-center gap-4"
				>
					<span class="font-bold text-slate-900 dark:text-white">Apakah CCTV yang dipasang bisa dipantau dari luar kota?</span>
					<ChevronDown class="h-5 w-5 text-slate-500 transition-transform duration-300 {activeFaqIndex === 3 ? 'rotate-180' : ''}" />
				</button>
				{#if activeFaqIndex === 3}
					<div class="px-6 pb-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-4">
						Tentu saja. Semua sistem CCTV yang kami pasang mendukung fitur Remote Monitoring. Anda bisa mengakses live stream kamera dan rekaman CCTV dari HP Android maupun iOS Anda kapan saja selama ada koneksi internet.
					</div>
				{/if}
			</div>

			<!-- FAQ Item 5 -->
			<div class="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all {activeFaqIndex === 4 ? 'bg-slate-50/50 dark:bg-slate-900/30' : 'bg-transparent'}">
				<button 
					onclick={() => toggleFaq(4)} 
					class="w-full px-6 py-5 text-left flex justify-between items-center gap-4"
				>
					<span class="font-bold text-slate-900 dark:text-white">Apakah Miratech melayani maintenance jaringan kantor?</span>
					<ChevronDown class="h-5 w-5 text-slate-500 transition-transform duration-300 {activeFaqIndex === 4 ? 'rotate-180' : ''}" />
				</button>
				{#if activeFaqIndex === 4}
					<div class="px-6 pb-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-4">
						Ya, kami melayani perbaikan dan peningkatan infrastruktur IT jaringan serta maintenance berkala (bulanan/tahunan) untuk ruko, perkantoran, instansi, maupun kafe di Samarinda.
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<!-- CALL TO ACTION (CTA) SECTION -->
<section class="py-20 relative overflow-hidden bg-gradient-to-tr from-slate-900 via-blue-900 to-primary text-white">
	<!-- Background glow shapes -->
	<div class="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-blue-500/20 blur-3xl"></div>
	<div class="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-accent/20 blur-3xl"></div>

	<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10 scroll-reveal transition-all duration-700 opacity-0 translate-y-10">
		<h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight">
			Siap Mengembangkan Bisnis Anda Dengan Teknologi?
		</h2>
		<p class="mt-4 text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
			Konsultasikan kebutuhan software, perbaikan komputer, maupun pemasangan CCTV sekarang juga bersama tim profesional Miratech.
		</p>
		
		<div class="mt-8 pt-2">
			<a
				href="{baseWaUrl}?text={encodeURIComponent('Halo Miratech, saya siap mengembangkan bisnis saya dengan teknologi dan ingin berkonsultasi.')}"
				target="_blank"
				rel="noopener noreferrer"
				class="btn-ripple bg-white hover:bg-slate-100 text-slate-900 font-bold px-8 py-4 rounded-2xl inline-flex items-center gap-2.5 text-base"
				id="cta-section-wa-btn"
				style="box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);"
			>
				<!-- WhatsApp logo SVG green color -->
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 fill-emerald-500" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.63-1.02-5.101-2.871-6.956C16.608 1.93 14.135.91 11.51.91c-5.44 0-9.863 4.42-9.865 9.864 0 1.902.5 3.708 1.45 5.304l-.995 3.639 3.733-.978zm11.567-5.282c-.313-.156-1.854-.915-2.131-1.016-.277-.1-.478-.15-.68.15-.2.3-.777.98-.952 1.18-.175.2-.35.225-.663.069-.313-.156-1.323-.486-2.52-1.553-.931-.83-1.56-1.853-1.742-2.164-.183-.313-.02-.482.137-.638.14-.14.313-.365.47-.547.156-.183.21-.313.313-.52.103-.207.05-.389-.026-.547-.076-.157-.68-1.637-.931-2.245-.245-.59-.494-.51-.68-.52-.176-.008-.377-.01-.58-.01-.202 0-.53.076-.807.38-.278.3-.53.53-.53 1.29s.56 1.493.638 1.6c.078.106 1.095 1.672 2.653 2.344.37.16.66.255.887.329.373.12.712.102.98.062.3-.044 1.854-.757 2.115-1.45.26-.693.26-1.287.182-1.41-.077-.123-.277-.202-.59-.358z"/></svg>
				Konsultasi Gratis via WhatsApp
			</a>
		</div>
	</div>
</section>

<!-- CONTACT SECTION & MAPS -->
<section id="kontak" class="py-24 bg-white dark:bg-[#0B0F19]">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
			<!-- Contact Form -->
			<div class="lg:col-span-7 rounded-2xl glass p-8 shadow-sm border border-slate-200/60 dark:border-slate-800 scroll-reveal transition-all duration-700 opacity-0 translate-y-10">
				<h3 class="text-2xl font-bold text-slate-900 dark:text-white">Form Konsultasi</h3>
				<p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
					Isi formulir berikut, data Anda akan diformat dan dikirimkan langsung ke WhatsApp teknisi kami.
				</p>

				<form onsubmit={handleFormSubmit} class="mt-8 flex flex-col gap-6" id="contact-form">
					<!-- Name field -->
					<div>
						<label for="name" class="block text-sm font-semibold text-slate-700 dark:text-slate-300">Nama Lengkap *</label>
						<input 
							type="text" 
							id="name"
							bind:value={clientName}
							placeholder="Masukkan nama lengkap Anda"
							class="mt-2 w-full px-4 py-3 rounded-xl border {errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 focus:ring-primary focus:border-primary dark:border-slate-800'} bg-transparent text-sm focus:ring-2 focus:outline-none dark:text-white"
						/>
						{#if errors.name}
							<p class="mt-1 text-xs text-red-500">{errors.name}</p>
						{/if}
					</div>

					<!-- WhatsApp & Email -->
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
						<div>
							<label for="whatsapp" class="block text-sm font-semibold text-slate-700 dark:text-slate-300">Nomor WhatsApp *</label>
							<input 
								type="text" 
								id="whatsapp"
								bind:value={clientWhatsApp}
								placeholder="Contoh: 081255556666"
								class="mt-2 w-full px-4 py-3 rounded-xl border {errors.whatsapp ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 focus:ring-primary focus:border-primary dark:border-slate-800'} bg-transparent text-sm focus:ring-2 focus:outline-none dark:text-white"
							/>
							{#if errors.whatsapp}
								<p class="mt-1 text-xs text-red-500">{errors.whatsapp}</p>
							{/if}
						</div>
						<div>
							<label for="email" class="block text-sm font-semibold text-slate-700 dark:text-slate-300">Alamat Email (Opsional)</label>
							<input 
								type="email" 
								id="email"
								bind:value={clientEmail}
								placeholder="Contoh: nama@domain.com"
								class="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 focus:ring-primary focus:border-primary bg-transparent text-sm focus:ring-2 focus:outline-none dark:text-white focus:ring-blue-500/20"
							/>
						</div>
					</div>

					<!-- Service Selection Dropdown -->
					<div>
						<label for="service" class="block text-sm font-semibold text-slate-700 dark:text-slate-300">Jenis Layanan</label>
						<select 
							id="service"
							bind:value={selectedService}
							class="mt-2 w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-primary focus:outline-none dark:text-white"
						>
							<option value="Software Custom">Jasa Pembuatan Software Custom</option>
							<option value="Perbaikan Komputer & Laptop">Perbaikan Komputer & Laptop</option>
							<option value="Pemasangan CCTV">Pemasangan CCTV</option>
							<option value="Lainnya">Lainnya</option>
						</select>
					</div>

					<!-- Message message -->
					<div>
						<label for="message" class="block text-sm font-semibold text-slate-700 dark:text-slate-300">Pesan Konsultasi / Masalah Anda *</label>
						<textarea 
							id="message"
							bind:value={clientMessage}
							rows="4"
							placeholder="Jelaskan kebutuhan software atau kendala hardware Anda..."
							class="mt-2 w-full px-4 py-3 rounded-xl border {errors.message ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 focus:ring-primary focus:border-primary dark:border-slate-800'} bg-transparent text-sm focus:ring-2 focus:outline-none dark:text-white"
						></textarea>
						{#if errors.message}
							<p class="mt-1 text-xs text-red-500">{errors.message}</p>
						{/if}
					</div>

					<!-- Submit Button -->
					<button
						type="submit"
						class="btn-ripple w-full py-4 bg-primary hover:bg-blue-700 text-white font-bold rounded-xl text-center text-sm inline-flex items-center justify-center gap-2 shadow-md mt-2"
						id="submit-consultation-btn"
					>
						Kirim Konsultasi
						<Send class="h-4 w-4" />
					</button>
				</form>
			</div>

			<!-- Location & Maps Integration -->
			<div class="lg:col-span-5 flex flex-col gap-8 scroll-reveal transition-all duration-700 opacity-0 translate-y-10 delay-150">
				<div class="rounded-2xl glass p-8 border border-slate-200/60 dark:border-slate-800">
					<h3 class="text-xl font-bold text-slate-900 dark:text-white">Lokasi Kantor Kami</h3>
					<p class="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
						Silakan kunjungi workshop kami atau hubungi tim sales kami untuk menjadwalkan kunjungan teknisi ke tempat Anda.
					</p>

					<!-- Google Maps Embed for Samarinda -->
					<div class="mt-6 w-full h-64 rounded-xl overflow-hidden shadow-inner border border-slate-200/50 dark:border-slate-800">
						<iframe 
							title="Miratech Workshop Location"
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127641.16439603099!2d117.07943542289456!3d-0.49182390885145885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df67fddb1b369c7%3A0x3030303030303030!2sSamarinda%2C%20Samarinda%20City%2C%20East%20Kalimantan!5e0!3m2!1sen!2sid!4v1719119561000!5m2!1sen!2sid" 
							width="100%" 
							height="100%" 
							style="border:0;" 
							allowfullscreen={false} 
							loading="lazy" 
							referrerpolicy="no-referrer-when-downgrade"
						></iframe>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>