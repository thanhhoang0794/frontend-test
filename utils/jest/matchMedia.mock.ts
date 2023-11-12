// INFO: method using mock matchMedia function for testing with component have using useBreakpointValues hook to get breakpoint value
// More details: https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
})

export {}
