import { plugin } from './plugin';

describe('${{values.plugin_id}}', () => {
  it('should export plugin', () => {
    expect(plugin).toBeDefined();
  });
});
