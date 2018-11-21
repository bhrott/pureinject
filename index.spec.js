const { createInjector } = require('./index');

test('registered value must resolve', () => {
  const injector = createInjector();

  injector.register('VALUE', injector => 'Frodo');

  const expected = 'Frodo';
  const received = injector.resolve('VALUE');

  expect(received).toBe(expected);
});

test('nested services must resolve', () => {
  class Http {
    constructor(injector) {
      this.apiUrl = injector.resolve('API_URL');
    }
  }

  class Service {
    constructor(injector) {
      this.http = injector.resolve('Http');
    }
  }

  const apiUrl = 'https://thelordoftherings.com/api';

  const injector = createInjector();

  injector.register('API_URL', injector => apiUrl);
  injector.register('Http', injector => new Http(injector));
  injector.register('Service', injector => new Service(injector));

  const serviceInstance = injector.resolve('Service');

  expect(serviceInstance).toBeInstanceOf(Service);
  expect(serviceInstance.http).toBeInstanceOf(Http);
  expect(serviceInstance.http.apiUrl).toBe(apiUrl);
});

test('invalid dependencyName in resolve must throw error', () => {
  const injector = createInjector();
  expect(() => {
    injector.resolve(null);
  }).toThrowError('The parameter dependencyName should be a string.');
});

test('invalid dependencyName in register must throw error', () => {
  const injector = createInjector();
  expect(() => {
    injector.register(null);
  }).toThrowError('The parameter dependencyName should be a string.');
});

test('invalid handler in register must throw error', () => {
  const injector = createInjector();
  expect(() => {
    injector.register('TEST', null);
  }).toThrowError('The parameter handler should be a function.');
});

test('try to resolve an unregistered module must throw error', () => {
  const injector = createInjector();
  expect(() => {
    injector.resolve('TEST');
  }).toThrowError('The dependency TEST is not registered.');
});
