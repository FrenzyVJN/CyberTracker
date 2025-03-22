import PocketBase from 'pocketbase';
export function createPocketBase() {
    const pb = new PocketBase('https://cyber.pockethost.io');
  return pb
}