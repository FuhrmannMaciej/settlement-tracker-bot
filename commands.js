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
    description: 'Submit gathered materials',
    options: [
      {
        name: 'resource',
        description: 'Select a material',
        type: 3, // STRING
        required: true,
        choices: [
          { name: 'Planks', value: 'Planks' },
          { name: 'Ingots', value: 'Ingots' },
          { name: 'Cloth', value: 'Cloth' },
          { name: 'Bricks', value: 'Bricks' },
          { name: 'Leather', value: 'Leather' },
          { name: 'Citric Berries', value: 'Citric Berries' },
          { name: 'Pebbles', value: 'Pebbles' },
          { name: 'Vials', value: 'Vials' },
          { name: 'Water Buckets', value: 'Water Buckets' },
          { name: 'Resin', value: 'Resin' },
          { name: 'Crop Oil', value: 'Crop Oil' },
          { name: 'Pitch', value: 'Pitch' },
          { name: 'Animal Hair', value: 'Animal Hair' },
          { name: 'Straw', value: 'Straw' },
          { name: 'Braxite', value: 'Braxite' },
          { name: 'Fish Oil', value: 'Fish Oil' },
          { name: 'Gypsite', value: 'Gypsite' },
          { name: 'Crushed Shells', value: 'Crushed Shells' },
          { name: 'Parchment', value: 'Parchment' },
          { name: 'Carvings', value: 'Carvings' },
          { name: 'Pigment', value: 'Pigment' }
        ]
      },
      {
        name: 'tier',
        description: 'Select a tier',
        type: 3, // STRING
        required: true,
        choices: [
          { name: 'T1', value: 'T1' },
          { name: 'T2', value: 'T2' },
          { name: 'T3', value: 'T3' },
          { name: 'T4', value: 'T4' },
          { name: 'T5', value: 'T5' },
          { name: 'T6', value: 'T6' },
          { name: 'T7', value: 'T7' },
          { name: 'T8', value: 'T8' },
          { name: 'T9', value: 'T9' },
          { name: 'T10', value: 'T10' }
        ]
      },
      {
        name: 'quantity',
        description: 'Amount of materials',
        type: 4, // INTEGER
        required: true
      }
    ]
  }
];
