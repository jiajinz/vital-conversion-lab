export const devices = {
  pro: {
    name: 'Vital Pro',
    model: 'Pro 1.0',
    price: 479,
    wavelengths: 4,
    wavelengthValues: '630, 660, 830, 850 nm',
    timerMinutes: 10,
    ledCount: 70,
    ratedPower: '350 W',
    listedLifetime: '50,000 hours',
    source: 'https://vitalredlight.com/products/vital-pro',
  },
  pro2: {
    name: 'Vital Pro 2.0',
    model: 'Pro 2.0',
    price: 599,
    wavelengths: 9,
    wavelengthValues: '480, 590, 630, 660, 670, 810, 830, 850, 1060 nm',
    timerMinutes: 20,
    ledCount: 72,
    ratedPower: '360 W',
    listedLifetime: '100,000 hours',
    source: 'https://vitalredlight.com/products/vital-pro-2-0',
  },
} as const

export const priceDifference = devices.pro2.price - devices.pro.price

const { pro, pro2 } = devices
const listedDimensions = '12.5 × 8.5 × 2.3 in'

export const comparisonSections = [
  {
    heading: 'Price and features',
    rows: [
      ['Price', `$${pro.price}`, `$${pro2.price}`],
      ['Red light', 'Yes', 'Yes'],
      ['Near infrared light', 'Yes', 'Yes'],
      ['Blue and yellow light', 'No', 'Yes'],
      ['Preset treatment modes', 'No', 'Yes'],
      ['Touchscreen', 'No', 'Yes'],
      ['Bluetooth', 'No', 'Yes'],
      ['Auto shutoff', `${pro.timerMinutes} min`, `${pro2.timerMinutes} min`],
    ],
  },
  {
    heading: 'Panel specifications',
    rows: [
      ['Wavelengths', pro.wavelengthValues, pro2.wavelengthValues],
      ['LEDs', pro.ledCount, pro2.ledCount],
      ['Listed irradiance', '150–210 mW/cm²', '150–210 mW/cm²'],
      ['Rated power', pro.ratedPower, pro2.ratedPower],
      ['Beam angle', '30°', '30°'],
      ['Coverage', 'Targeted half body', 'Targeted half body'],
      ['Dimensions', listedDimensions, listedDimensions],
      ['Weight', '10 lb', '10 lb'],
      ['Cooling fans', '2', '2'],
      ['Flicker control', 'Yes', 'Yes'],
      ['Listed EMF at treatment distance', '0 µT', '0 µT'],
      ['Listed lifespan', pro.listedLifetime, pro2.listedLifetime],
    ],
  },
  {
    heading: 'In the box and purchase terms',
    rows: [
      ['Tabletop stand', 'Included', 'Included'],
      ['Power cable and protective eyewear', 'Included', 'Included'],
      ['Basic remote', 'Not listed', 'Included (CR2032)'],
      ['Trial period', '30 days', '30 days'],
      ['Warranty', '3 years', '3 years'],
    ],
  },
] as const
