import PocketBase from 'pocketbase';
export function createPocketBase() {
    const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);
  return pb
}