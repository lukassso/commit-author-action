"use strict";
var coreMock = {
    getInput: jest.fn(),
    setOutput: jest.fn(),
    setFailed: jest.fn(),
    info: jest.fn(),
    warning: jest.fn(),
};
jest.mock('@actions/core', function () { return coreMock; });
