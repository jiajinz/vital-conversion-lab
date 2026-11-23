
export const experimentSkillUrl = 'https://www.skills.sh/coreyhaines31/marketingskills/ab-testing'

const events = [
  ['experiment_assigned', 'Save the visitor’s assigned version.'],
  ['experiment_exposure', 'Check that the purchase area loaded in both versions.'],
  ['device_compare_opened', 'See how often shoppers open the comparison in B.'],
  ['view_item', 'Record which model page the shopper visits.'],
  ['add_to_cart', 'Record which model was added to the cart.'],
  ['begin_checkout', 'Record whether the shopper starts checkout.'],
  ['purchase', 'Use a unique Shopify order ID to count each purchase once.'],
] as const

const copy = {
  kicker: 'Test plan',
  title: 'How we would test it on Vital',
  intro: 'Split eligible Vital Pro page visitors 50/50 and keep each person in the same group. Test whether showing the upgrade by the price and opening a short comparison in place helps shoppers choose and raises revenue per visitor. Both versions use the same prices and checkout.',
  metrics: [
    { heading: 'What decides the test', body: 'Sales from both Pro models divided by all assigned visitors. If a shopper clicks through and buys the Pro 2.0, that sale counts toward their original group.' },
    { heading: 'What explains the result', body: 'Check purchase rate, which model sold, and whether returns or contribution margin got worse.' },
    { heading: 'When to decide', body: 'Set the sample size, purchase window, and minimum worthwhile lift using Vital’s baseline data. Read the result at the planned end, with the uncertainty and return rate in view.' },
  ],
  tracking: 'Tracking details',
  trackingNote: 'Link orders to the assignment as shoppers move between model pages. Check the split and match orders between GA4 and Shopify before reading the result.',
  method: 'Experiment checklist',
} as const

export function StudyMeasurement() {
  const t = copy

  return (
    <section className="study-section" id="measurement" aria-labelledby="measurement-title">
      <header className="study-header">
        <p className="study-kicker">{t.kicker}</p>
        <h2 id="measurement-title">{t.title}</h2>
        <p className="study-intro">{t.intro}</p>
      </header>
      <div className="study-grid">
        {t.metrics.map(metric => (
          <article className="study-card" key={metric.heading}>
            <h3>{metric.heading}</h3>
            <p>{metric.body}</p>
          </article>
        ))}
      </div>
      <details className="study-detail">
        <summary>{t.tracking}</summary>
        <div className="study-detail-inner">
          <p>{t.trackingNote}</p>
          <dl className="study-events">
            {events.map(([name, description]) => (
              <div key={name}>
                <dt><code>{name}</code></dt>
                <dd>{description}</dd>
              </div>
            ))}
          </dl>
          <a className="source-link" href={experimentSkillUrl}>{t.method}</a>
        </div>
      </details>
    </section>
  )
}
