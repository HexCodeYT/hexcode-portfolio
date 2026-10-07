---
title: "Why checkout must revalidate on the server"
description: "A first engineering note from Palermo: treating the cart as intent, validating current prices and stock, and creating an order transactionally."
publishedAt: "2026-10-07"
tags: ["Commerce", "Data integrity", "Architecture"]
relatedProject: "palermo"
canonicalUrl: "https://hexcode.au/engineering/server-authoritative-checkout"
---

A cart describes what a customer wants to buy. It does not prove that the current price, promotion or available stock still permits that purchase.

This initial note follows [Palermo’s checkout boundary](/work/palermo#decisions). Palermo is a controlled commerce demonstration with synthetic data and Stripe test-mode payments. The useful engineering question is how the application turns browser intent into a coherent order.

## Revalidate the state that can change

Palermo’s checkout service revalidates the active cart, current variant prices, promotion, saved addresses, delivery method and available stock in one server transaction.

That list matters because each part can change between browsing and checkout. A price shown earlier is a display value. A promotion selected in the browser is a request to apply a rule. Stock shown on a product page is not a reservation.

The browser submits the intended purchase. The server decides whether the current system state permits it.

## Create the related records together

Successful checkout initiation creates a placed order, a pending payment attempt and short inventory reservations. It does not mark payment complete.

Those records represent different facts:

- The order captures the intended transaction.
- The payment attempt tracks the provider-facing payment workflow.
- The reservation temporarily claims the stock needed by that order.

Creating them in one transaction keeps the application from accepting only part of the initiation. Payment finalisation remains a separate, verified transition.

A conceptual boundary looks like this. This is explanatory pseudocode, not an excerpt from Palermo:

```typescript
await transaction(async (tx) => {
  const purchase = await revalidateCheckout(tx, customer, intent);
  const order = await createOrder(tx, purchase);
  await createPendingPayment(tx, order);
  await reserveInventory(tx, order);
  return order;
});
```

## Give repeated requests a defined result

A customer can resubmit checkout after a delayed response or an interrupted connection. Palermo uses the customer identity plus an idempotency key to replay an identical checkout request safely.

Disabling a submit button helps the interface, but requests can repeat outside that interface. The server needs to recognise the repeated operation within its own boundary.

Idempotency also has to agree with inventory and payment behaviour. Replaying order initiation is useful only if later transitions avoid repeating stock effects.

## Keep payment confirmation separate

A browser redirect or a successful checkout response does not prove that payment completed. Palermo’s verified payment webhook owns the final payment, order and inventory transition.

That separation introduces a recovery question: what happens when payment succeeds after the reservation expires? The companion note on [late payment recovery](/engineering/late-payment-recovery) follows that path.

## Evidence and application

The implementation contract is recorded in the public [checkout authority documentation](https://github.com/Mel-18-Palermo/Palermo-Perfume-System/blob/46133da18ac97659ce06c3411452c449178dcef4/src/modules/commerce/checkout/README.md). The [Palermo case study](/work/palermo) places it alongside sessions, permissions, inventory and delivery evidence.

For an existing application, a useful [production-readiness review](/services#production-readiness) starts by tracing one purchase through these boundaries: which values the browser supplies, which values the server revalidates, and which records must change together.
