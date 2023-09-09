import * as crypto from 'crypto';

export class Id {
  static create(): string {
    return crypto
      .randomBytes(16)
      .toString('base64')
      .replaceAll('+', '-')
      .replaceAll('/', '_')
      .replaceAll('=', '');
  }
}
