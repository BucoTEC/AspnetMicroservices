using AutoMapper;
using Basket.API.Entities;
using EventBus.Messages.Events;

namespace Basket.API.Mapper
{
    public class BasketProfile : Profile
    {
        protected BasketProfile()
        {
            CreateMap<BasketCheckoutEvent,BasketCheckout>().ReverseMap();
        }
    }
}
