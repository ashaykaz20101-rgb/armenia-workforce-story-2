/** Armenia unemployment rate, % of labour force (Armstat, Labour Force Survey, annual average). */
export const unemploymentRates = [
  { year: 2015, rate: 18.5 },
  { year: 2016, rate: 18.0 },
  { year: 2017, rate: 17.8 },
  { year: 2018, rate: 19.0 },
  { year: 2019, rate: 18.3 },
  { year: 2020, rate: 18.2 },
  { year: 2021, rate: 15.5 },
  { year: 2022, rate: 13.5 },
  { year: 2023, rate: 12.4 },
  { year: 2024, rate: 13.4 },
  { year: 2025, rate: 12.8 },
] as const;

/** 2025 quarterly unemployment rate, % (Armstat). */
export const quarterly2025 = [
  { quarter: "I", rate: 14.0 },
  { quarter: "II", rate: 12.3 },
  { quarter: "III", rate: 11.8 },
  { quarter: "IV", rate: 13.1 },
] as const;

export const statsSource =
  "Աղբյուր՝ ՀՀ վիճակագրական կոմիտե (Արմստատ), աշխատուժի հետազոտություն։ 2018-ից կիրառվում է վերանայված մեթոդաբանություն։";
