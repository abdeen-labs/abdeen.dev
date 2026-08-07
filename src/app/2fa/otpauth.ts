// otpauth:// URI construction and parsing — pure logic, no React.
// Reference: https://github.com/google/google-authenticator/wiki/Key-Uri-Format

export type OTPType = 'totp' | 'hotp';

export interface OtpauthBuildInput {
  type: OTPType;
  secret: string;
  label: string;
  issuer: string;
  counter: string;
  includeAdvanced: boolean;
  algorithm: string;
  digits: string;
  period: string;
}

/** Parsed form of an otpauth URI, shaped for the generator form's fields. */
export interface OtpauthFields {
  type: OTPType;
  label: string;
  secret: string;
  issuer: string;
  counter: string;
  /** True when the URI carried any advanced parameter. */
  hasAdvanced: boolean;
  algorithm: string;
  digits: string;
  /** Empty string when absent or the default 30 seconds. */
  period: string;
}

export function buildOtpauthUri({
  type,
  secret,
  label,
  issuer,
  counter,
  includeAdvanced,
  algorithm,
  digits,
  period,
}: OtpauthBuildInput): string {
  // Every interpolated value is percent-encoded, so a pasted secret with
  // base32 padding ("=") or a stray reserved character corrupts nothing.
  // Authenticator apps read these as query parameters and percent-decode
  // them, and parseOtpauthUri below round-trips through the same decoding.
  // Whitespace is stripped from the secret first — pasted secrets arrive
  // with spaces and line breaks, which are never part of the secret itself.
  let s = `otpauth://${type}/${encodeURIComponent(label)}?secret=${encodeURIComponent(secret.replace(/\s+/g, ''))}`;
  if (issuer) s += `&issuer=${encodeURIComponent(issuer)}`;
  if (type === 'hotp') s += `&counter=${encodeURIComponent(counter || '0')}`;
  if (includeAdvanced) {
    s += `&algorithm=${encodeURIComponent(algorithm)}&digits=${encodeURIComponent(digits)}`;
    if (type === 'totp') s += `&period=${encodeURIComponent(period || '30')}`;
  }
  return s;
}

/** Parse an otpauth URI into form fields, or null if it isn't a valid one. */
export function parseOtpauthUri(value: string): OtpauthFields | null {
  try {
    const url = new URL(value);
    if (url.protocol !== 'otpauth:') return null;

    const urlType = url.host || url.pathname.split('/')[2];
    if (urlType !== 'totp' && urlType !== 'hotp') return null;
    if (!url.searchParams.has('secret')) return null;

    // Engines that treat otpauth:// as a hostful URL parse the type into
    // `host` and the label into `pathname` ("/label"); others leave it all
    // in the pathname ("//totp/label"), where "//totp/".length === 7.
    let label = decodeURIComponent(url.pathname.substring(url.host ? 1 : 7));
    const issuer = url.searchParams.get('issuer')
      ? decodeURIComponent(url.searchParams.get('issuer')!)
      : '';

    if (label.startsWith(`${issuer}:`)) {
      label = label.substring(issuer.length + 1);
    }

    const hasAdvanced =
      url.searchParams.has('algorithm') ||
      url.searchParams.has('digits') ||
      url.searchParams.has('period');
    const period = url.searchParams.get('period');

    return {
      type: urlType,
      label,
      secret: url.searchParams.get('secret') || '',
      issuer,
      counter: url.searchParams.get('counter') || '',
      hasAdvanced,
      algorithm: url.searchParams.get('algorithm') || 'SHA1',
      digits: url.searchParams.get('digits') || '6',
      period: period === '30' ? '' : period || '',
    };
  } catch {
    return null;
  }
}
