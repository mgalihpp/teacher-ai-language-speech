import ApiConfig, { type ApiConfigOptions } from "./apiConfig";
import HttpClient, { type ParentObj } from "./httpClient";
import Transaction from "./transaction";

/**
 * CoreApi object able to do API request to Midtrans Core API
 */
class CoreApi implements ParentObj {
  apiConfig: ApiConfig;
  httpClient: HttpClient;
  transaction: Transaction;
  [key: string]: unknown;

  /**
   * Initiate with options
   * @param  {ApiConfigOptions} options - should have these props:
   * isProduction, serverKey, clientKey
   */
  constructor(
    options: ApiConfigOptions = {
      isProduction: false,
      serverKey: "",
      clientKey: "",
    },
  ) {
    this.apiConfig = new ApiConfig(options);
    this.httpClient = new HttpClient(this);
    this.transaction = new Transaction(this);
  }

  /**
   * Do `/v2/charge` API request to Core API
   * @param  {Object} parameter - object of Core API JSON body as parameter, will be converted to JSON (more params detail refer to: https://api-docs.midtrans.com)
   * @return {Promise<unknown>} - Promise contains Object from JSON decoded response
   */
  charge(parameter: Record<string, unknown> = {}): Promise<unknown> {
    const apiUrl = this.apiConfig.getCoreApiBaseUrl() + "/v2/charge";
    return this.httpClient.request(
      "post",
      this.apiConfig.get().serverKey!,
      apiUrl,
      parameter,
    );
  }

  /**
   * Do `/v2/capture` API request to Core API
   * @param  {Object} parameter - object of Core API JSON body as parameter, will be converted to JSON (more params detail refer to: https://api-docs.midtrans.com)
   * @return {Promise<unknown>} - Promise contains Object from JSON decoded response
   */
  capture(parameter: Record<string, unknown> = {}): Promise<unknown> {
    const apiUrl = this.apiConfig.getCoreApiBaseUrl() + "/v2/capture";
    return this.httpClient.request(
      "post",
      this.apiConfig.get().serverKey!,
      apiUrl,
      parameter,
    );
  }

  /**
   * Do `/v2/card/register` API request to Core API
   * @param  {Object} parameter - object of Core API JSON body as parameter, will be converted to JSON (more params detail refer to: https://api-docs.midtrans.com)
   * @return {Promise<unknown>} - Promise contains Object from JSON decoded response
   */
  cardRegister(parameter: Record<string, unknown> = {}): Promise<unknown> {
    const apiUrl = this.apiConfig.getCoreApiBaseUrl() + "/v2/card/register";
    return this.httpClient.request(
      "get",
      this.apiConfig.get().serverKey!,
      apiUrl,
      parameter,
    );
  }

  /**
   * Do `/v2/token` API request to Core API
   * @param  {Object} parameter - object of Core API JSON body as parameter, will be converted to JSON (more params detail refer to: https://api-docs.midtrans.com)
   * @return {Promise<unknown>} - Promise contains Object from JSON decoded response
   */
  cardToken(parameter: Record<string, unknown> = {}): Promise<unknown> {
    const apiUrl = this.apiConfig.getCoreApiBaseUrl() + "/v2/token";
    return this.httpClient.request(
      "get",
      this.apiConfig.get().serverKey!,
      apiUrl,
      parameter,
    );
  }

  /**
   * Do `/v2/point_inquiry/<tokenId>` API request to Core API
   * @param  {String} tokenId - tokenId of credit card (more params detail refer to: https://api-docs.midtrans.com)
   * @return {Promise<unknown>} - Promise contains Object from JSON decoded response
   */
  cardPointInquiry(tokenId: string): Promise<unknown> {
    const apiUrl = `${this.apiConfig.getCoreApiBaseUrl()}/v2/point_inquiry/${tokenId}`;
    return this.httpClient.request(
      "get",
      this.apiConfig.get().serverKey!,
      apiUrl,
      {},
    );
  }

  /**
   * Create `/v2/pay/account` API request to Core API
   * @param  {Object} parameter - object of Core API JSON body as parameter, will be converted to JSON (more params detail refer to: https://api-docs.midtrans.com/#create-pay-account)
   * @return {Promise<unknown>} - Promise contains Object from JSON decoded response
   */
  linkPaymentAccount(
    parameter: Record<string, unknown> = {},
  ): Promise<unknown> {
    const apiUrl = this.apiConfig.getCoreApiBaseUrl() + "/v2/pay/account";
    return this.httpClient.request(
      "post",
      this.apiConfig.get().serverKey!,
      apiUrl,
      parameter,
    );
  }

  /**
   * Do `/v2/pay/account/<accountId>` API request to Core API
   * @param  {String} accountId - accountId for specific payment channel (more params detail refer to: https://api-docs.midtrans.com/#get-pay-account)
   * @return {Promise<unknown>} - Promise contains Object from JSON decoded response
   */
  getPaymentAccount(accountId: string): Promise<unknown> {
    const apiUrl = `${this.apiConfig.getCoreApiBaseUrl()}/v2/pay/account/${accountId}`;
    return this.httpClient.request(
      "get",
      this.apiConfig.get().serverKey!,
      apiUrl,
      {},
    );
  }

  /**
   * Unbind `/v2/pay/account/<accountId>/unbind` API request to Core API
   * @param  {String} accountId - accountId for specific payment channel (more params detail refer to: https://api-docs.midtrans.com/#unbind-pay-account)
   * @return {Promise<unknown>} - Promise contains Object from JSON decoded response
   */
  unlinkPaymentAccount(accountId: string): Promise<unknown> {
    const apiUrl = `${this.apiConfig.getCoreApiBaseUrl()}/v2/pay/account/${accountId}/unbind`;
    return this.httpClient.request(
      "post",
      this.apiConfig.get().serverKey!,
      apiUrl,
      {},
    );
  }

  /**
   * Create `/v1/subscription` API request to Core API
   * @param  {Object} parameter - object of Core API JSON body as parameter, will be converted to JSON (more params detail refer to: https://api-docs.midtrans.com/#create-subscription)
   * @return {Promise<unknown>} - Promise contains Object from JSON decoded response
   */
  createSubscription(
    parameter: Record<string, unknown> = {},
  ): Promise<unknown> {
    const apiUrl = this.apiConfig.getCoreApiBaseUrl() + "/v1/subscriptions";
    return this.httpClient.request(
      "post",
      this.apiConfig.get().serverKey!,
      apiUrl,
      parameter,
    );
  }

  /**
   * Do `/v1/subscription/<subscriptionId>` API request to Core API
   * @param  {String} subscriptionId - subscriptionId given by Midtrans (more params detail refer to: https://api-docs.midtrans.com/#get-subscription)
   * @return {Promise<unknown>} - Promise contains Object from JSON decoded response
   */
  getSubscription(subscriptionId: string): Promise<unknown> {
    const apiUrl = `${this.apiConfig.getCoreApiBaseUrl()}/v1/subscriptions/${subscriptionId}`;
    return this.httpClient.request(
      "get",
      this.apiConfig.get().serverKey!,
      apiUrl,
      {},
    );
  }

  /**
   * Do `/v1/subscription/<subscriptionId>/disable` API request to Core API
   * @param  {String} subscriptionId - subscriptionId given by Midtrans (more params detail refer to: https://api-docs.midtrans.com/#disable-subscription)
   * @return {Promise<unknown>} - Promise contains Object from JSON decoded response
   */
  disableSubscription(subscriptionId: string): Promise<unknown> {
    const apiUrl = `${this.apiConfig.getCoreApiBaseUrl()}/v1/subscriptions/${subscriptionId}/disable`;
    return this.httpClient.request(
      "post",
      this.apiConfig.get().serverKey!,
      apiUrl,
      {},
    );
  }

  /**
   * Do `/v1/subscription/<subscriptionId>/enable` API request to Core API
   * @param  {String} subscriptionId - subscriptionId given by Midtrans (more params detail refer to: https://api-docs.midtrans.com/#enable-subscription)
   * @return {Promise<unknown>} - Promise contains Object from JSON decoded response
   */
  enableSubscription(subscriptionId: string): Promise<unknown> {
    const apiUrl = `${this.apiConfig.getCoreApiBaseUrl()}/v1/subscriptions/${subscriptionId}/enable`;
    return this.httpClient.request(
      "post",
      this.apiConfig.get().serverKey!,
      apiUrl,
      {},
    );
  }

  /**
   * Do update subscription `/v1/subscription/<subscriptionId>` API request to Core API
   * @param  {String} subscriptionId - subscriptionId given by Midtrans (more params detail refer to: https://api-docs.midtrans.com/#update-subscription)
   * @param  {Object} parameter - object of Core API JSON body as parameter, will be converted to JSON
   * @return {Promise<unknown>} - Promise contains Object from JSON decoded response
   */
  updateSubscription(
    subscriptionId: string,
    parameter: Record<string, unknown> = {},
  ): Promise<unknown> {
    const apiUrl = `${this.apiConfig.getCoreApiBaseUrl()}/v1/subscriptions/${subscriptionId}`;
    return this.httpClient.request(
      "patch",
      this.apiConfig.get().serverKey!,
      apiUrl,
      parameter,
    );
  }
}

export default CoreApi;
