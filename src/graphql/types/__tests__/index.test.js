import typeDefs from '../index';

describe('#typeDefs', () => {
  it('should match the Graphql schema', () => {
    expect(typeDefs).toMatchSnapshot();
  });
});
