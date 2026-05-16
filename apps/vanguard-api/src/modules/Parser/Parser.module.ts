import { Module } from '@nestjs/common';

import { ParserService } from './Parser.service.js';

@Module({
	exports: [
		ParserService,
	],
	providers: [
		ParserService,
	],
})
export class ParserModule {}
