import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
	@Get()
	@HttpCode(HttpStatus.OK)
	public handleIndex(): object {
		return {
			now: Date.now(),
		};
	}
}
