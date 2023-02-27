const schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  definitions: {
    EstimationRequest: {
      type: 'object',
      properties: {
        state: {
          type: 'string',
          pattern: '^(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])$'
        },
        estimation: { type: 'string', enum: ['normal', 'premium'] },
        distance: { type: 'number' },
        base_amount: { type: 'number' }
      },
      required: ['state', 'estimation', 'distance', 'base_amount'],
      additionalProperties: false,
      errorMessage: {
        type: 'data should be an object.',
        properties: {
          state: 'state should be a valid US State abbreviation string.',
          estimation: 'estimation should be normal or premium type.',
          distance: 'distance should be number.',
          base_amount: 'base_amount should be number.'
        },
        _: 'data should have properties \'state\', \'estimation\', \'distance\' and \'base_amount\' only.'
      }
    }
  }
} as const
export default schema.definitions
