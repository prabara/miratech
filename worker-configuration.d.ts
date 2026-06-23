/// <reference types="@cloudflare/workers-types" />

declare module '$env/static/private' {
	export const DATABASE_URL: string;
	export const API_KEY: string;
	// Tambahkan environment variables lainnya sesuai kebutuhan
}

declare module '$env/static/public' {
	export const PUBLIC_API_URL: string;
	// Tambahkan public environment variables lainnya
}

interface Env {
	ASSETS: Fetcher;
	// Binding resources dari wrangler.toml/jsonc
	// Contoh:
	// DATABASE: D1Database;
	// KV: KVNamespace;
	// DURABLE_OBJECT: DurableObjectNamespace;
}

declare global {
	namespace App {
		interface Platform {
			env?: Env;
			context?: ExecutionContext;
		}

		interface Locals {
			// Tambahkan properties lokal yang diperlukan
		}
	}
}

export {};
