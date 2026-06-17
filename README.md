# n8n-nodes-google-ads-transparency-api

An [n8n](https://n8n.io/) community node that pulls an advertiser's ads from the Google Ads Transparency Center and returns structured records: advertiser, ad creative ID, format, and run dates. It is backed by the [Google Ads Transparency API](https://apify.com/johnvc/google-ads-transparency-api?fpr=9n7kx3) on [Apify](https://apify.com?fpr=9n7kx3) and bills per result, so there are no subscriptions and no minimums.

[Installation](#installation) · [Credentials](#credentials) · [Operations](#operations) · [Output](#output) · [Example workflows](#example-workflows) · [Pricing](#pricing) · [Resources](#resources)

## What it does

Give the node an advertiser ID, and it returns one item per ad with the advertiser name, ad creative ID, format, first- and last-shown dates, total days shown, and a details link. It also works as an **AI Agent tool**, so an agent can research competitor advertising on demand.

- Pull the ad library for any advertiser by ID
- Optionally filter by region
- Choose how much data to return per ad: Simplified, Raw, or Selected Fields

## Installation

Follow the n8n [community nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/):

1. In n8n, open **Settings > Community Nodes**.
2. Select **Install**.
3. Enter `n8n-nodes-google-ads-transparency-api` as the npm package name.
4. Agree to the risks of using community nodes, then select **Install**.

After it installs, the **Google Ads Transparency** node appears in the nodes panel.

> n8n Cloud only allows verified community nodes. Until this node is verified, install it on a self-hosted n8n instance.

## Credentials

You need a free [Apify account](https://apify.com?fpr=9n7kx3) and an API token.

1. Sign in to the [Apify Console](https://console.apify.com?fpr=9n7kx3).
2. Open **Settings > Integrations** and copy your **Personal API token**.
3. In n8n, create a new **Apify API** credential and paste the token.
4. Use the credential's **Test** button to confirm it works.

The node also supports **Apify OAuth2** if you prefer to connect that way.

## Operations

**Ad > Get** returns ads run by an advertiser.

| Parameter | Description |
| --- | --- |
| Advertiser ID | The Google Ads Transparency advertiser ID. Required. |
| Region | Region code to filter by. Optional. |
| Maximum Results per Advertiser | How many ads to return. |
| Output | How much data to return: Simplified, Raw, or Selected Fields. |

## Output

Each ad is returned as its own n8n item. The **Output** parameter lets you choose how much to return:

- **Simplified** (default): a compact object with `advertiser`, `advertiserId`, `adCreativeId`, `format`, `firstShown`, `lastShown`, `totalDaysShown`, and `detailsLink`. This mode is also used automatically when the node runs as an AI Agent tool, to keep responses small.
- **Raw**: every field the API returns for each ad, using the original field names below.
- **Selected Fields**: pick exactly which fields to include.

### Fields (Raw and Selected Fields)

| Field | Type | Description |
| --- | --- | --- |
| `position` | integer | Rank in the results |
| `ad_creative_id` | string | Ad creative identifier |
| `advertiser` | string | Advertiser name |
| `advertiser_id` | string | Advertiser identifier |
| `format` | string | Ad format, for example `text`, `image`, or `video` |
| `first_shown` | integer | First-shown timestamp (Unix) |
| `last_shown` | integer | Last-shown timestamp (Unix) |
| `total_days_shown` | integer | Total days the ad has been shown |
| `details_link` | string | Link to the ad in the Transparency Center |
| `result_type` | string | Record type, for example `ad` |
| `fetched_at` | string | When the ad was fetched (ISO 8601) |

## Example workflows

### 1. Track a competitor's ad activity

1. **Schedule Trigger**: run weekly.
2. **Google Ads Transparency**: Advertiser ID a competitor, Output `Simplified`.
3. **Google Sheets**: append `adCreativeId`, `format`, and `totalDaysShown`.

### 2. Alert on new ad creatives

1. **Schedule Trigger**: run daily.
2. **Google Ads Transparency**: an advertiser.
3. **Remove Duplicates** then **Slack**: alert on new `adCreativeId` values.

### 3. Let an AI Agent research ads

1. **AI Agent** node.
2. Attach **Google Ads Transparency** as a tool.
3. Ask "What ads is this advertiser currently running?" The agent calls the node (in Simplified mode) and answers.

## Pricing

This node calls the [Google Ads Transparency API](https://apify.com/johnvc/google-ads-transparency-api?fpr=9n7kx3) on Apify, which is billed **pay-per-result**, with no subscription and no minimums. Apify also includes a free monthly usage tier that covers typical volumes. See the [Actor page](https://apify.com/johnvc/google-ads-transparency-api?fpr=9n7kx3) for current rates.

## Resources

- [Google Ads Transparency API on Apify](https://apify.com/johnvc/google-ads-transparency-api?fpr=9n7kx3)
- [npm package](https://www.npmjs.com/package/n8n-nodes-google-ads-transparency-api)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Apify n8n integration guide](https://docs.apify.com/platform/integrations/n8n)

## License

[MIT](LICENSE.md)
