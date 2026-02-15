// UVD RTM Simulation Engine
// Based on Relative Theory of Money (Stéphane Laborde, 2010)

export interface SimulationParams {
  members: number;
  growthRate: number; // c - annual growth rate (e.g. 0.10 for 10%)
  years: number;
  initialMoneySupply: number;
}

export interface YearData {
  year: number;
  moneySupply: number;
  udPerPerson: number;
  cumulativeUdPerPerson: number;
  udShare: number; // percentage of money supply per person
}

export interface InflationComparisonData {
  year: number;
  fiatPrice: number;
  uvdPrice: number;
  fiatPurchasingPower: number;
  uvdPurchasingPower: number;
}

export interface TimeTheftResult {
  yearsWorked: number;
  totalInflationLoss: number;
  lossPercentage: number;
  purchasingPowerRetained: number;
  uvdEquivalentGain: number;
  yearlyData: {
    year: number;
    fiatPurchasingPower: number;
    uvdPurchasingPower: number;
    cumulativeLoss: number;
  }[];
}

// Historical average inflation rates by country (approximate long-term averages)
export const COUNTRY_INFLATION: Record<string, { name: string; rate: number; currency: string }> = {
  DE: { name: "Germany", rate: 0.035, currency: "EUR" },
  US: { name: "United States", rate: 0.038, currency: "USD" },
  UK: { name: "United Kingdom", rate: 0.04, currency: "GBP" },
  JP: { name: "Japan", rate: 0.015, currency: "JPY" },
  TR: { name: "Turkey", rate: 0.25, currency: "TRY" },
  NG: { name: "Nigeria", rate: 0.15, currency: "NGN" },
  BR: { name: "Brazil", rate: 0.08, currency: "BRL" },
  AR: { name: "Argentina", rate: 0.60, currency: "ARS" },
  IN: { name: "India", rate: 0.06, currency: "INR" },
  AE: { name: "UAE", rate: 0.025, currency: "AED" },
};

/**
 * RTM Universal Dividend Formula:
 * UD(t+1) = UD(t) + c² × (M(t) / N(t+1))
 * 
 * Where:
 * - UD = Universal Dividend
 * - c = growth rate (~10% per year)
 * - M = total money supply
 * - N = number of active members
 */
export function simulateRTM(params: SimulationParams): YearData[] {
  const { members, growthRate, years, initialMoneySupply } = params;
  const data: YearData[] = [];

  let moneySupply = initialMoneySupply;
  let udPerPerson = (growthRate * moneySupply) / members;
  let cumulativeUd = 0;

  for (let y = 0; y <= years; y++) {
    cumulativeUd += y === 0 ? 0 : udPerPerson;

    data.push({
      year: y,
      moneySupply: Math.round(moneySupply),
      udPerPerson: Math.round(udPerPerson * 100) / 100,
      cumulativeUdPerPerson: Math.round(cumulativeUd * 100) / 100,
      udShare: (1 / members) * 100,
    });

    // Apply RTM formula for next year
    const nextUd = udPerPerson + growthRate * growthRate * (moneySupply / members);
    moneySupply += nextUd * members;
    udPerPerson = nextUd;
  }

  return data;
}

/**
 * Simulate inflation comparison: Fiat vs UVD basket pricing
 */
export function simulateInflationComparison(
  inflationRate: number,
  growthRate: number,
  years: number,
  initialBasketPrice: number = 1000
): InflationComparisonData[] {
  const data: InflationComparisonData[] = [];
  
  let fiatPrice = initialBasketPrice;
  let uvdPrice = initialBasketPrice;
  const fiatInitial = initialBasketPrice;
  const uvdInitial = initialBasketPrice;

  for (let y = 0; y <= years; y++) {
    data.push({
      year: y,
      fiatPrice: Math.round(fiatPrice * 100) / 100,
      uvdPrice: Math.round(uvdPrice * 100) / 100,
      fiatPurchasingPower: Math.round((fiatInitial / fiatPrice) * 10000) / 100,
      uvdPurchasingPower: Math.round((uvdInitial / uvdPrice) * 10000) / 100,
    });

    // Fiat: prices rise with inflation
    fiatPrice *= 1 + inflationRate;
    // UVD: prices stay stable or decrease slightly due to symmetric money creation
    uvdPrice *= 1 + Math.max(-0.005, (inflationRate - growthRate) * 0.1);
  }

  return data;
}

/**
 * Time-Theft Calculator: How much purchasing power has inflation stolen?
 */
export function calculateTimeTheft(
  birthYear: number,
  countryCode: string,
  monthlyIncome: number = 3000,
  currentYear: number = 2025
): TimeTheftResult {
  const country = COUNTRY_INFLATION[countryCode] || COUNTRY_INFLATION.DE;
  const workStartAge = 20;
  const workStartYear = birthYear + workStartAge;
  const yearsWorked = Math.max(0, currentYear - workStartYear);

  if (yearsWorked <= 0) {
    return {
      yearsWorked: 0,
      totalInflationLoss: 0,
      lossPercentage: 0,
      purchasingPowerRetained: 100,
      uvdEquivalentGain: 0,
      yearlyData: [],
    };
  }

  const yearlyData: TimeTheftResult["yearlyData"] = [];
  let cumulativeLoss = 0;
  const annualIncome = monthlyIncome * 12;

  for (let i = 0; i <= yearsWorked; i++) {
    const year = workStartYear + i;
    const fiatPP = Math.pow(1 / (1 + country.rate), i) * 100;
    const uvdPP = Math.min(100 + i * 0.5, 110); // UVD maintains or slightly gains
    const yearLoss = annualIncome * (1 - Math.pow(1 / (1 + country.rate), i));
    cumulativeLoss += annualIncome * country.rate * Math.pow(1 / (1 + country.rate), i);

    yearlyData.push({
      year,
      fiatPurchasingPower: Math.round(fiatPP * 100) / 100,
      uvdPurchasingPower: Math.round(uvdPP * 100) / 100,
      cumulativeLoss: Math.round(cumulativeLoss),
    });
  }

  const totalLoss = cumulativeLoss;
  const purchasingPowerRetained = Math.pow(1 / (1 + country.rate), yearsWorked) * 100;

  return {
    yearsWorked,
    totalInflationLoss: Math.round(totalLoss),
    lossPercentage: Math.round((1 - purchasingPowerRetained / 100) * 10000) / 100,
    purchasingPowerRetained: Math.round(purchasingPowerRetained * 100) / 100,
    uvdEquivalentGain: Math.round(totalLoss * 0.85), // conservative estimate
    yearlyData,
  };
}

// Basket data for different countries
export interface BasketItem {
  name: string;
  unit: string;
  basePrice: number; // in local currency, 2020 prices
}

export interface CountryBasket {
  country: string;
  currency: string;
  items: BasketItem[];
}

export const BASKETS: Record<string, CountryBasket> = {
  DE: {
    country: "Germany",
    currency: "EUR",
    items: [
      { name: "50m² Rent (monthly)", unit: "month", basePrice: 750 },
      { name: "100 kWh Electricity", unit: "100kWh", basePrice: 32 },
      { name: "Public Transport Pass", unit: "month", basePrice: 49 },
      { name: "Basic Groceries", unit: "month", basePrice: 250 },
      { name: "1L Milk", unit: "liter", basePrice: 1.05 },
      { name: "1kg Bread", unit: "kg", basePrice: 2.80 },
    ],
  },
  US: {
    country: "United States",
    currency: "USD",
    items: [
      { name: "50m² Rent (monthly)", unit: "month", basePrice: 1200 },
      { name: "100 kWh Electricity", unit: "100kWh", basePrice: 14 },
      { name: "Public Transport Pass", unit: "month", basePrice: 75 },
      { name: "Basic Groceries", unit: "month", basePrice: 350 },
      { name: "1 Gallon Milk", unit: "gallon", basePrice: 3.50 },
      { name: "1 Loaf Bread", unit: "loaf", basePrice: 3.00 },
    ],
  },
  NG: {
    country: "Nigeria",
    currency: "NGN",
    items: [
      { name: "50m² Rent (monthly)", unit: "month", basePrice: 150000 },
      { name: "100 kWh Electricity", unit: "100kWh", basePrice: 6800 },
      { name: "Public Transport", unit: "month", basePrice: 15000 },
      { name: "Basic Groceries", unit: "month", basePrice: 50000 },
      { name: "1L Milk", unit: "liter", basePrice: 800 },
      { name: "1kg Bread", unit: "kg", basePrice: 1200 },
    ],
  },
  AE: {
    country: "UAE (Dubai)",
    currency: "AED",
    items: [
      { name: "50m² Rent (monthly)", unit: "month", basePrice: 4500 },
      { name: "100 kWh Electricity", unit: "100kWh", basePrice: 38 },
      { name: "Metro Pass", unit: "month", basePrice: 350 },
      { name: "Basic Groceries", unit: "month", basePrice: 1200 },
      { name: "1L Milk", unit: "liter", basePrice: 6.5 },
      { name: "1kg Bread", unit: "kg", basePrice: 5.0 },
    ],
  },
};

/**
 * Calculate basket price over time with inflation
 */
export function simulateBasketPrice(
  countryCode: string,
  years: number = 20
): { year: number; fiatTotal: number; uvdTotal: number; items: { name: string; fiatPrice: number; uvdPrice: number }[] }[] {
  const basket = BASKETS[countryCode] || BASKETS.DE;
  const country = COUNTRY_INFLATION[countryCode] || COUNTRY_INFLATION.DE;
  const data = [];

  for (let y = 0; y <= years; y++) {
    const inflationMultiplier = Math.pow(1 + country.rate, y);
    const uvdMultiplier = Math.pow(1 + 0.002, y); // UVD: near-stable prices

    const items = basket.items.map((item) => ({
      name: item.name,
      fiatPrice: Math.round(item.basePrice * inflationMultiplier * 100) / 100,
      uvdPrice: Math.round(item.basePrice * uvdMultiplier * 100) / 100,
    }));

    data.push({
      year: 2020 + y,
      fiatTotal: items.reduce((sum, i) => sum + i.fiatPrice, 0),
      uvdTotal: items.reduce((sum, i) => sum + i.uvdPrice, 0),
      items,
    });
  }

  return data;
}
