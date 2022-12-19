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
