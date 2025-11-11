// Dynamic import to avoid top-level require() of ESM-only faker in CommonJS environments
export async function getDemoOutput(): Promise<string> {
	const { faker } = await import('@faker-js/faker');
	return faker.person.fullName();
}

// Convenience synchronous-looking wrapper that returns a Promise
export const demoOutput = getDemoOutput;
