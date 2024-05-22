import PocketBase from 'pocketbase';

const BASE_URL = process.env.BASE_URL;  

class PocketBaseClient {
  constructor() {
    if (!PocketBaseClient.instance) {
      this.client = new PocketBase(BASE_URL);
      PocketBaseClient.instance = this;
    }
    return PocketBaseClient.instance;
  }

  getClient() {
    return this.client;
  }
}

const instance = new PocketBaseClient();
Object.freeze(instance);

export default instance.getClient();