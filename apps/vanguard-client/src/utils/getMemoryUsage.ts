import { memoryUsage } from 'node:process';

const CONVERSION_FACTOR = 1_024;

export function getMemoryUsage(): `${string} MB` {
	const { heapUsed } = memoryUsage();
	const heapUsageInMegaBytes = convertToMegaBytes(heapUsed);

	return `${heapUsageInMegaBytes} MB`;
}

function convertToMegaBytes(bytes: number): string {
	return (bytes / CONVERSION_FACTOR ** 2).toFixed(2);
}
