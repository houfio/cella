import { range } from './utils/range';

export const fieldLabels = {
  name: {
    label: 'Naam',
    type: 'text'
  },
  description: {
    label: 'Beschrijving',
    type: 'text'
  },
  purchasePrice: {
    label: 'Inkoopprijs (ex. BTW)',
    type: 'number'
  },
  price: {
    label: 'Verkoopprijs (ex. BTW)',
    type: 'number'
  },
  stock: {
    label: 'Voorraad',
    type: 'number'
  },
  minimumStock: {
    label: 'Minimum voorraad',
    type: 'number'
  },
  color: {
    label: 'Kleur',
    type: 'text'
  },
  size: {
    label: 'Grootte (cm)',
    type: 'number'
  },
  weight: {
    label: 'Gewicht (gram)',
    type: 'number'
  },
  packageAmount: {
    label: 'Aantal',
    type: 'number'
  }
};

export const categoryLabels = {
  clothing: 'Kleding',
  lighting: 'Tierlantijn',
  decoration: 'Decoratie'
};

export const extraFields = {
  clothing: ['color', 'size'],
  lighting: ['weight'],
  decoration: ['size', 'color', 'packageAmount']
};

export const blockages = {
  clothing: [
    ...range(0, 30),
    ...range(91, 104),
    ...range(106, 119),
    ...range(121, 134),
    172, 210, 224
  ],
  lighting: [
    0, 6, 7, 8, 14,
    ...range(95, 100),
    ...range(110, 115),
    ...range(125, 130),
    170, 172, 174
  ],
  decoration: [
    0, 14, 30, 60, 90, 120, 150, 180, 210, 224,
    ...range(95, 100),
    ...range(110, 115),
    ...range(125, 130),
  ]
};
