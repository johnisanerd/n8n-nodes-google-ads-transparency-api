import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';

/**
 * Build the Apify Actor input from node parameters.
 * Only the real Actor inputs are sent; the Output / Fields parameters shape the
 * data we return, they are not part of the Actor input. Optional fields are only
 * sent when the user provides a value so the Actor keeps its own defaults.
 */
export function buildActorInput(
	context: IExecuteFunctions,
	itemIndex: number,
	defaultInput: Record<string, any>,
): Record<string, any> {
	const input: Record<string, any> = {
		...defaultInput,
		advertiserId: context.getNodeParameter('advertiserId', itemIndex),
		maxResultsPerAdvertiser: context.getNodeParameter('maxResultsPerAdvertiser', itemIndex),
	};

	const region = context.getNodeParameter('region', itemIndex, '') as string;
	if (region) input.region = region;

	return input;
}

const resourceProperties: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Ad',
				value: 'ad',
			},
		],
		default: 'ad',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['ad'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get ads for an advertiser',
				description: 'Get ads run by an advertiser, one item per ad',
			},
		],
		default: 'get',
	},
];

const actorProperties: INodeProperties[] = [
	{
		displayName: 'Advertiser ID',
		name: 'advertiserId',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. AR03136609393588568065',
		description: 'The Google Ads Transparency advertiser ID',
		displayOptions: { show: { resource: ['ad'], operation: ['get'] } },
	},
	{
		displayName: 'Region',
		name: 'region',
		type: 'string',
		default: '',
		placeholder: 'e.g. US',
		description: 'Region code to filter ads by where they ran. Optional.',
		displayOptions: { show: { resource: ['ad'], operation: ['get'] } },
	},
	{
		displayName: 'Maximum Results per Advertiser',
		name: 'maxResultsPerAdvertiser',
		type: 'number',
		default: 50,
		typeOptions: { minValue: 1 },
		description: 'How many ads to return',
		displayOptions: { show: { resource: ['ad'], operation: ['get'] } },
	},
];

const outputProperties: INodeProperties[] = [
	{
		displayName: 'Output',
		name: 'output',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['ad'], operation: ['get'] } },
		options: [
			{
				name: 'Raw',
				value: 'raw',
				description: 'Return every field the API produces for each ad',
			},
			{
				name: 'Selected Fields',
				value: 'selected',
				description: 'Choose exactly which fields to return',
			},
			{
				name: 'Simplified',
				value: 'simplified',
				description: 'Return a compact set of the most useful ad fields',
			},
		],
		default: 'simplified',
		description: 'How much data to return for each ad',
	},
	{
		displayName: 'Fields to Include',
		name: 'fields',
		type: 'multiOptions',
		displayOptions: {
			show: { resource: ['ad'], operation: ['get'], output: ['selected'] },
		},
		options: [
			{ name: 'Ad Creative ID', value: 'ad_creative_id' },
			{ name: 'Advertiser', value: 'advertiser' },
			{ name: 'Advertiser ID', value: 'advertiser_id' },
			{ name: 'Details Link', value: 'details_link' },
			{ name: 'Fetched At', value: 'fetched_at' },
			{ name: 'First Shown', value: 'first_shown' },
			{ name: 'Format', value: 'format' },
			{ name: 'Last Shown', value: 'last_shown' },
			{ name: 'Position', value: 'position' },
			{ name: 'Result Type', value: 'result_type' },
			{ name: 'Total Days Shown', value: 'total_days_shown' },
		],
		default: ['advertiser', 'ad_creative_id', 'format', 'first_shown', 'last_shown'],
		description: 'Which fields to return when Output is set to Selected Fields',
	},
];

const authenticationProperties: INodeProperties[] = [
	{
		displayName: 'Authentication',
		name: 'authentication',
		type: 'options',
		options: [
			{
				name: 'API Key',
				value: 'apifyApi',
			},
			{
				name: 'OAuth2',
				value: 'apifyOAuth2Api',
			},
		],
		default: 'apifyApi',
		description: 'Choose which authentication method to use',
	},
];

export const properties: INodeProperties[] = [
	...resourceProperties,
	...actorProperties,
	...outputProperties,
	...authenticationProperties,
];
