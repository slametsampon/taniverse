let MOCK_MODE = true;

export function isMockMode() {
  return MOCK_MODE;
}

export function setMockMode(value: boolean) {
  MOCK_MODE = value;
}
