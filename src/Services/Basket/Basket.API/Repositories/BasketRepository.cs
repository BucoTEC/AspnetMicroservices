using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Basket.API.Entities;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;

namespace Basket.API.Repositories
{
    public class BasketRepository : IBasketRepository
    {
        private readonly IDistributedCache _redis;
        public BasketRepository(IDistributedCache redis)
        {
            _redis = redis ?? throw new ArgumentOutOfRangeException(nameof(redis));
        }

        public async Task DeleteBasket(string userName)
        {
            await _redis.RemoveAsync(userName);
        }

        public async Task<ShoppingCart> GetBasket(string userName)
        {
            var basket = await _redis.GetStringAsync(userName);

            if (basket != null)
            {
                return JsonConvert.DeserializeObject<ShoppingCart>(basket);
            }
            return new ShoppingCart(userName);
        }

        public async Task<ShoppingCart> UpdateBasket(ShoppingCart basket)
        {

            await _redis.SetStringAsync(basket.UserName, JsonConvert.SerializeObject(basket));

            return await GetBasket(basket.UserName);
        }
    }
}
