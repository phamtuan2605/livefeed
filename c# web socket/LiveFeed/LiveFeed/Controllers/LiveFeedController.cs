using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Microsoft.Web.WebSockets;

namespace LiveFeed.Controllers
{
    public class LiveFeedController : ApiController
    {
        public HttpResponseMessage Get()
        {
            if (HttpContext.Current.IsWebSocketRequest || HttpContext.Current.IsWebSocketRequestUpgrading)
            {
                HttpContext.Current.AcceptWebSocketRequest(new Models.Feed());
                return Request.CreateResponse(HttpStatusCode.SwitchingProtocols);
            }
            else return new HttpResponseMessage(HttpStatusCode.BadRequest);
        }
    }
}
