// import fs from "fs";
// import pdf from 'pdf-parse';
import { reader } from '../uploads/automate.js';

describe('Test reader function', function () {
  it('should return data buffer', function () {
    const filePath = 'sample.pdf';
    let dataBuffer = reader(filePath);
    assert.notEqual(dataBuffer, undefined);
  });
});
