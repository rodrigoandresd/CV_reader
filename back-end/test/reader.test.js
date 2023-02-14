const fs = require('fs');
const pdf = require('pdf-parse');

jest.mock('fs', () => {
  return {
    readFileSync: jest.fn().mockImplementation(() => {
      return new Buffer('test pdf content');
    })
  };
});

jest.mock('pdf-parse', () => {
  return jest.fn().mockImplementation(() => {
    return Promise.resolve({ text: 'test pdf content' });
  });
});

const reader = require('./index').reader;

describe('reader', () => {
  it('reads the file and processes the data', async () => {
    await reader('test.pdf');

    expect(fs.readFileSync).toHaveBeenCalledWith('test.pdf');
    expect(pdf).toHaveBeenCalledWith(Buffer.from('test pdf content'));
  });
});
