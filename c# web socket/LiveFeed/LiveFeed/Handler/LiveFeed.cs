using Microsoft.Web.WebSockets;
using Newtonsoft.Json;
using System;
using System.Collections.Specialized;

namespace LiveFeed.Models
{
    public class Feed : WebSocketHandler
    {
        private static UserOperation userOperation = new UserOperation();

        public override void OnOpen()
        {
            NameValueCollection queryDictionary = new NameValueCollection();
            queryDictionary = this.WebSocketContext.QueryString;
            if (queryDictionary.HasKeys())
            {
                User user = new User();
                user.name = queryDictionary.Get("name");
                user.id = queryDictionary.Get("id");
                userOperation.Add(this, user);
                userOperation.NewUserBroadCast(user);
            }
        }

        public override void OnMessage(string message)
        {
            Message messageData = JsonConvert.DeserializeObject<Message>(message);
            userOperation.Message(this, messageData);
        }

        public override void OnClose()
        {
            userOperation.ExitUserBroadCast(this);

        }

        public override void OnError()
        {
            base.OnError();
        }
    }
}
