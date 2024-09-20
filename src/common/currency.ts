import { Currency } from '@prisma/client';

export function mapCurrency(currency: string): Currency {
  switch (currency.toUpperCase()) {
    case 'USD':
      return Currency.USD;
    case 'EUR':
      return Currency.EUR;
    case 'KRW':
      return Currency.KRW;
    case 'JPY':
      return Currency.JPY;
    default:
      throw new Error(`Invalid currency: ${currency}`);
  }
}
