export enum DeviceEventName {
  Error = 'error',
  Incoming = 'incoming',
  Registered = 'registered',
  Registering = 'registering',
  TokenWillExpire = 'tokenWillExpire',
}

export enum CallEventName {
  Accept = 'accept',
  Disconnect = 'disconnect',
  Reject = 'reject',
  Cancel = 'cancel',
  Mute = 'mute',
}

export enum CallUIState {
  Dialer = 'dialer',
  Dialing = 'dialing',
  InACall = 'inACall',
  OnHold = 'onHold',
  IncomingCall = 'incomingCall',
}
