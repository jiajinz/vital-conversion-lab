export const devices = {
  pro: {
    name: 'Vital Pro',
    model: 'Pro 1.0',
    price: 479,
    wavelengths: 4,
    timerMinutes: 10,
    source: 'https://vitalredlight.com/products/vital-pro',
  },
  pro2: {
    name: 'Vital Pro 2.0',
    model: 'Pro 2.0',
    price: 599,
    wavelengths: 9,
    timerMinutes: 20,
    source: 'https://vitalredlight.com/products/vital-pro-2-0',
  },
} as const

export const priceDifference = devices.pro2.price - devices.pro.price

const { pro, pro2 } = devices

export const comparisonRows = [
  ['Price', `$${pro.price}`, `$${pro2.price}`],
  ['Light options', 'Red and near infrared', 'Red, near infrared, blue and yellow'],
  ['Controls', 'Basic timer', 'Touchscreen with presets'],
  ['Remote and Bluetooth', 'No Bluetooth', 'Remote included, plus Bluetooth'],
  ['Auto shutoff', `${pro.timerMinutes} minutes`, `${pro2.timerMinutes} minutes by default`],
  ['Panel size and coverage', 'Tabletop, targeted half body', 'Same size and coverage'],
  ['Trial period', '30 days', '30 days'],
  ['Warranty', '3 years', '3 years'],
] as const
