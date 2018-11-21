function validateParamType(paramName, paramValue, paramType) {
  if (typeof paramValue !== paramType) {
    throw new Error(`The parameter ${paramName} should be a ${paramType}.`);
  }
}

class Injector {
  constructor() {
    this._registered = {};
  }

  resolve(dependencyName) {
    validateParamType('dependencyName', dependencyName, 'string');

    const handler = this._registered[dependencyName];

    if (handler) {
      return handler(this);
    }

    throw new Error(`The dependency ${dependencyName} is not registered.`);
  }

  register(dependencyName, handler) {
    validateParamType('dependencyName', dependencyName, 'string');
    validateParamType('handler', handler, 'function');

    this._registered[dependencyName] = handler;
  }
}

function createInjector() {
  return new Injector();
}

module.exports = {
  createInjector,
};
