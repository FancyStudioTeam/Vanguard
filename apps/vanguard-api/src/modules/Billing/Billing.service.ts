import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

import { STRIPE_KEY } from '#lib/Constants/Stripe.js';

@Injectable()
export class BillingService {
	private readonly stripe: Stripe;

	public constructor() {
		this.stripe = new Stripe(STRIPE_KEY);
	}

	public async createCheckout(): Promise<string> {
		const checkoutSession = await this.stripe.checkout.sessions.create({
			mode: 'subscription',
		});
		const checkoutSessionUrl = checkoutSession.url;

		return checkoutSessionUrl ?? '';
	}
}
