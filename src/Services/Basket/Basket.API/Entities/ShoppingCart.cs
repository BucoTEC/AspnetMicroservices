using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Basket.API.Entities
{
    public class ShoppingCart
    {


        public string UserName { get; set; } = null!;

        public List<ShoppingCartItem> Items { get; set; } = new List<ShoppingCartItems>();
        public ShoppingCart(string UserName)
        {
            UserName = UserName;
        }

        public decimal TotalPrice
        {
            get
            {
                decimal totalPrice = 0;
                foreach (var item in Items)
                {
                    totalPrice += item.Price * item.Quantity;
                }
                return totalPrice;
            }
        }
    }
}
