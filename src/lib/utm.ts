export type UtmKey = "utm_source" | "utm_medium" | "utm_campaign" | "utm_content" | "utm_term";

export type UtmParams = {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
};

export function readUtm(search: URLSearchParams | string): UtmParams {
  const params = typeof search === "string" ? new URLSearchParams(search.startsWith("?") ? search.slice(1) : search) : search;
  return {
    utmSource: params.get("utm_source"),
    utmMedium: params.get("utm_medium"),
    utmCampaign: params.get("utm_campaign"),
    utmContent: params.get("utm_content"),
    utmTerm: params.get("utm_term"),
  };
}

export function appendUtmToUrl(rawUrl: string, utm: UtmParams) {
  try {
    const url = new URL(rawUrl);
    const entries: [UtmKey, string | null][] = [
      ["utm_source", utm.utmSource],
      ["utm_medium", utm.utmMedium],
      ["utm_campaign", utm.utmCampaign],
      ["utm_content", utm.utmContent],
      ["utm_term", utm.utmTerm],
    ];
    for (const [key, value] of entries) {
      if (value) url.searchParams.set(key, value);
    }
    return url.toString();
  } catch {
    return rawUrl;
  }
}

export function utmFromWindow() {
  if (typeof window === "undefined") {
    return { utmSource: null, utmMedium: null, utmCampaign: null, utmContent: null, utmTerm: null };
  }
  return readUtm(window.location.search);
}
