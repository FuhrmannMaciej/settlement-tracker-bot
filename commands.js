export const commands = [
  {
    name: 'farming',
    description: 'Get farming information',
    options: [
      {
        name: 'info',
        type: 1, // SUBCOMMAND
        description: 'Get current farming data',
      }
    ]
  },
  {
    name: 'fishing',
    description: 'Get fishing information',
    options: [
      {
        name: 'info',
        type: 1,
        description: 'Get current fishing data',
      }
    ]
  },
  {
    name: 'foraging',
    description: 'Get foraging information',
    options: [
      {
        name: 'info',
        type: 1,
        description: 'Get current foraging data',
      }
    ]
  },
  {
    name: 'carpentry',
    description: 'Get forestry and carpentry information',
    options: [
      {
        name: 'info',
        type: 1,
        description: 'Get current forestry and carpentry data',
      }
    ]
  },
  {
    name: 'leatherworking',
    description: 'Get leatherworking information',
    options: [
      {
        name: 'info',
        type: 1,
        description: 'Get current leatherworking data',
      }
    ]
  },
  {
    name: 'masonry',
    description: 'Get masonry information',
    options: [
      {
        name: 'info',
        type: 1,
        description: 'Get current masonry data',
      }
    ]
  },
  {
    name: 'scholar',
    description: 'Get scholar information',
    options: [
      {
        name: 'info',
        type: 1,
        description: 'Get current scholar data',
      }
    ]
  },
  {
    name: 'smithing',
    description: 'Get smithing information',
    options: [
      {
        name: 'info',
        type: 1,
        description: 'Get current smithing data',
      }
    ]
  },
  {
    name: 'tailoring',
    description: 'Get tailoring information',
    options: [
      {
        name: 'info',
        type: 1,
        description: 'Get current tailoring data',
      }
    ]
  },
  {
  name: 'submit',
  description: 'Submit gathered resource info',
  options: [
    {
      name: 'resource',
      description: 'Resource name (e.g. Planks)',
      type: 3, // STRING
      required: true,
    },
    {
      name: 'tier',
      description: 'Tier of the resource (e.g. T1, T5)',
      type: 3, // STRING
      required: true,
    },
    {
      name: 'quantity',
      description: 'Quantity gathered',
      type: 4, // INTEGER
      required: true,
    },
  ],
}
];
