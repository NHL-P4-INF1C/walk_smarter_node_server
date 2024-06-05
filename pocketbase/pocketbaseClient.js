const PocketBase = require('pocketbase/cjs');
const BASE_URL = process.env.BASE_URL;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

class PocketBaseClient
{
  constructor()
  {
    if (!PocketBaseClient.instance)
    {
      this.client = new PocketBase(BASE_URL);
      PocketBaseClient.instance = this;
    }
    return PocketBaseClient.instance;
  }

  async loginAsAdmin()
  {
    try
    {
      await this.client.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
      console.log('Admin login successful');
    }
    catch (error)
    {
      console.error('Admin login failed:', error);
    }
  }

  async logoutAdmin()
  {
    try
    {
      await this.client.admins.authRefresh();
      this.client.authStore.clear();
      console.log('Admin logout successful');
    }
    catch (error)
    {
      console.error('Admin logout failed:', error);
    }
  }

  getClient()
  {
    return this.client;
  }
}

const instance = new PocketBaseClient();
Object.freeze(instance);

module.exports = instance;
