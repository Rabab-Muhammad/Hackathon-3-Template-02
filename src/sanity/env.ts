export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-28'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const token = assertValue(
  "skrjfDY78hoFImkWMEcZfoLeVo7Eg2YgclhhAxO5nc84WLPaNneCyMwYyc1i95HKmi4jneafbrAoNyoscrQPoPMKI9NFCHxkYvwQ1vLPgIl7Y5UQXVK7E6iAXvmITVajRRS0SMfYX0bkwPWy65JwITxNwHQTgOhNfpiPYYROGAI852J6taVT",
  'Missing environment variable: SANITY_API_TOKEN'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
