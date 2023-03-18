using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Basket.API.Entities;
using Basket.API.Repositories;
using EventBus.Messages.Events;
using MassTransit;
using Microsoft.AspNetCore.Mvc;

namespace Basket.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BasketController : ControllerBase
    {
        private readonly IBasketRepository _repository;
        private readonly IMapper _mapper;
        private readonly IPublishEndpoint _publishEndpoint;
        public BasketController(IBasketRepository basketRepository, IMapper mapper, IPublishEndpoint publishEndpoint = null)
        {
            _repository = basketRepository ?? throw new ArgumentNullException(nameof(basketRepository));
            _mapper = mapper;
            _publishEndpoint = publishEndpoint;
        }


        [HttpGet("{userName}", Name = "GetBasket")]
        [ProducesResponseType(typeof(ShoppingCart), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<ShoppingCart>> GetBasket(string userName)
        {
            var basket = await _repository.GetBasket(userName);
            return Ok(basket);
        }

        [HttpPost]
        [ProducesResponseType(typeof(ShoppingCart), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<ShoppingCart>> UpdateBasket([FromBody] ShoppingCart basket)
        {
            return Ok(await _repository.UpdateBasket(basket));
        }

        [HttpDelete("{userName}", Name = "DeleteBasket")]
        [ProducesResponseType(typeof(void), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DeleteBasket(string userName)
        {
            await _repository.DeleteBasket(userName);
            return Ok();
        }

        [Route("[action]")]
        [HttpPost]
        [ProducesResponseType((int)HttpStatusCode.Accepted)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public async Task<IActionResult> Checkout([FromBody] BasketCheckout basketCheckout)
        {

            // get eisting basket with total price
            var basket  = await _repository.GetBasket(basketCheckout.UserName);

            if(basket is null)
            {
                return BadRequest();
            }

            // Publish the event to a message que
            // TODO check to wich topic it gets published
            var messageEvent = _mapper.Map<BasketCheckoutEvent>(basketCheckout);
            messageEvent.TotalPrice = basketCheckout.TotalPrice;
            await _publishEndpoint.Publish(messageEvent);

            // clear basket that has been added to cue ( topic )

            await _repository.DeleteBasket(basketCheckout.UserName);

            return Accepted();

        }
    }
}
