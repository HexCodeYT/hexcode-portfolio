---
title: "Stripe says paid. Can the order still be fulfilled?"
description: "How Palermo handles payment success when the stock reservation has already expired."
publishedAt: "2026-10-07"
tags: ["Commerce", "Payments", "Data integrity"]
relatedProject: "palermo"
canonicalUrl: "https://hexcode.au/engineering/late-payment-recovery"
---

A payment provider and an application database do not share one transaction. A verified payment event can arrive after the application’s stock reservation has expired.

Palermo’s payment boundary makes that situation explicit. This initial note describes the documented behaviour of its Stripe test-mode integration; it does not claim live commercial payment operation.

## Keep the payment boundary explicit

Palermo uses Stripe test-mode PaymentIntents and Stripe Elements. Card data remains within Stripe-controlled fields. Missing server payment configuration fails closed rather than silently switching to a simulated gateway.

Placing an order, reserving stock and receiving payment are distinct steps. A browser return from checkout is not evidence that the payment completed.

## A verified event still needs valid application state

Palermo verifies a Stripe webhook against the raw request body using Stripe’s official signature verifier. Verification establishes the event’s provider boundary. The application still has to determine whether it can apply the event to its own order and inventory state.

A successful payment finalisation can commit only the order’s complete set of active, unexpired reservations. Reservation claims, balance decrements, inventory movements, payment transition and order confirmation occur in one transaction.

The requirement is stronger than “Stripe said success”. The system also needs to own the stock it is about to commit.

## Preserve the invariant on a late success

If success arrives after reservations expire, Palermo returns a retryable conflict without changing commerce state.

That is a deliberate boundary. Confirming the order while leaving inventory unchanged would make the customer-facing state disagree with the stock model. Decrementing stock without a valid claim would skip the reservation check.

The conflict says that the application cannot finish this transition under its current conditions. It does not erase the provider event.

## Recovery is an explicit operation

An explicit payment retry can atomically reactivate the same released or expired reservation rows when stock remains available. A repeated verified webhook can then finish the original payment attempt safely.

That sequence keeps recovery attached to the original operation:

1. Recheck whether the stock can be reserved.
2. Reactivate the eligible reservations atomically.
3. Let the verified payment transition complete against those reservations.

The stock check remains necessary during recovery. A successful provider payment cannot make unavailable inventory available.

## Idempotency must cover the effects

Duplicate successful events are idempotent. The important effect is the combined transition: payment, order, reservations, balances and inventory movements.

Checking only whether a webhook was received would leave the harder question unanswered. The application needs repeated delivery to have a defined effect on the business records.

This is also why [checkout initiation](/engineering/server-authoritative-checkout) and payment finalisation are distinct. Checkout creates the order and pending attempt; verified payment processing owns the later confirmation.

## Read the implementation boundary

The public [payment authority documentation](https://github.com/Mel-18-Palermo/Palermo-Perfume-System/blob/46133da18ac97659ce06c3411452c449178dcef4/src/modules/commerce/payment/README.md) records these rules. The [regression map](https://github.com/Mel-18-Palermo/Palermo-Perfume-System/blob/46133da18ac97659ce06c3411452c449178dcef4/docs/testing/critical-journey-regression.md) distinguishes database/payment coverage from browser coverage: automated provider tests use deterministic fixtures, and browser checkout stops before payment.

For a system with inconsistent orders or payment failures, a [production-rescue engagement](/services#production-rescue) should trace both provider evidence and local state. The repair has to preserve the same invariants that apply on the successful path.
