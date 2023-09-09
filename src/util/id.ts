import { v4 as uuid } from 'uuid';

export class Id {
  static create(): string {
    const byteString = uuid().replaceAll('-', '');
    const bytes = Buffer.from(byteString, 'hex');
    return bytes
      .toString('base64')
      .replaceAll('+', '-')
      .replaceAll('/', '_')
      .replaceAll('=', '');
  }
}
