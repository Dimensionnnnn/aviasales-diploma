export interface AirportData {
  cases: null;
  city_cases: {
    da: string;
    pr: string;
    ro: string;
    su: string;
    tv: string;
    vi: string;
  } | null;
  city_code: string;
  city_name: string;
  code: string;
  coordinates: { lat: number; lon: number };
  country_cases: {
    da: string;
    pr: string;
    ro: string;
    su: string;
    tv: string;
    vi: string;
  } | null;
  country_code: string;
  country_name: string;
  id: string;
  index_strings: string[];
  name: string;
  state_code: string | null;
  type: string;
  weight: number;
}
