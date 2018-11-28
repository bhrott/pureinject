export type PureInjector = {
  register(name: string, handler: (injectorInstance: PureInjector) => any) : void
  resolve<T>(name: string): T
}

export function createInjector(): PureInjector