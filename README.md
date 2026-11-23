# What does the extra $120 buy?

An independent CRO case study for Vital Red Light. Two published A/B tests inform a proposed upgrade comparison on the $479 Vital Pro page, with a model for estimating revenue under different outcomes.

> Independent portfolio case study.

## Evidence and recommendation

Vital lists the Pro at $479 and the Pro 2.0 at $599. Both list the same panel dimensions and targeted coverage. The Pro lists four wavelengths and an automatic timer. The Pro 2.0 lists nine wavelengths, a touchscreen, and preset programs. The current Pro page already lets shoppers switch models and open the full device comparison. The proposal adds the differences between the two Pro models near the price.

- [Vital home device catalog](https://vitalredlight.com/collections/home-devices)
- [Vital Pro product page](https://vitalredlight.com/products/vital-pro)
- [Vital Pro 2.0 product page](https://vitalredlight.com/products/vital-pro-2-0)

Jessica Goldman reports that a comparison of Theragun Elite and PRO raised revenue per visitor by 13% and product page conversion by 12%. The case does not publish sample size or test duration. Convertibles tested an optional comparison of two models for a sports equipment retailer. Revenue per visitor moved from $11.14 to $11.43, but the agency reported only a 62% chance of beating the original. Mobile was flat. The test also hid a redundant control, so the comparison effect was not isolated.

- [Jessica Goldman’s Therabody case](https://www.jessicagoldmandesign.com/therabody-pdp)
- [Convertibles case](https://convertibles.dev/blogs/case-studies/help-me-choose-comparison-modal-case-study)

## Prototype and measurement

A and B recreate the Vital Pro purchase area with the same price, model links, full comparison link, and demo Add to cart button. B shows what the extra $120 buys and lets shoppers open a short comparison in place or continue to the Pro 2.0 page.

The revenue model starts with 10,000 monthly Vital Pro page visitors, a 2% purchase rate across both models, and 20% Pro 2.0 orders. Assuming one device per order at list price, that is $100,600 per month. A shift from 20% to 30% Pro 2.0 orders at the same purchase rate adds $2,400. A 3% relative lift in the purchase rate with Pro 2.0 share dropping to 5% produces six more orders and $690 less revenue. The figures are hypothetical and exclude tax, discounts, margins, returns and changes in traffic.

A future experiment requires Vital’s authorization and analytics access. Randomize eligible visitors 50/50 on the Vital Pro page, preserve their assignment if they click through to the Pro 2.0, and measure sales from both models per assigned visitor. Check purchase rate, model mix, returns, and margin. Agree on the sample size and what result would justify a rollout before starting. [A/B Testing skill](https://www.skills.sh/coreyhaines31/marketingskills/ab-testing)

## Local development

```bash
npm ci
npm run dev
npm run check
npm run build
```

Open the URL printed by Vite to preview the English site.

## Continuous integration and hosting

GitHub Actions installs the locked dependencies on Node.js 24, checks lint and tests, and builds the static site on every pull request and push to `main`.

GitHub Pages serves the production site. When the checks pass on `main`, the workflow publishes `dist`. Select **GitHub Actions** as the publishing source in the repository’s Pages settings. The site needs no backend, secrets, or scheduled requests.

## Illustration

The built in ImageGen tool produced [the original device concept](public/panel-study.jpg). Its appearance is illustrative. The product comparison uses only the linked public specifications.

> Use case: product-mockup. Create a wide landscape hero visual for an editorial CRO portfolio. Two unbranded tabletop red light therapy panels standing next to each other on an off-white studio sweep, comparable in height and width, with softly glowing red LEDs on gridded white rectangular faces, small tilted white tabletop stands, one panel slightly turned to reveal a dark side control display. Keep both devices in the middle with generous off-white space around them, especially at the sides for cropping. Elevated restrained consumer technology product photography, pale lilac reflected light and subtle red floor reflection, believable materials, soft controlled lighting and shadows. Generate a single wide composition with no text, people, logos or watermark. This is a conceptual illustration, not an exact commercial product reproduction.
