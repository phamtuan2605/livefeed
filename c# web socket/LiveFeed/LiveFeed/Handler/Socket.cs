using Microsoft.Web.WebSockets;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace LiveFeed.Models
{
    enum MessageType
    {
        Joined,
        Exit,
        Message
    };
    public class User
    {
        public User()
        {
        }

        public string flag { get; set; }
        public string name { get; set; }
        public string id { get; set; }
        public int count { get; set; }

    }
    public class Message
    {
        public string flag { get; set; }
        public string message { get; set; }
        public string name { get; set; }
        public string id { get; set; }
        public string dateTime {get;set;}
    }

    class UserOperation
    {
        private Dictionary<WebSocketHandler, User> users = new Dictionary<WebSocketHandler, User>();
        public void Add(WebSocketHandler webSocketHandler, User user)
        {
            users.Add(webSocketHandler, user);
        }
        public void Remove(WebSocketHandler webSocketHandler)
        {
            users.Remove(webSocketHandler);
        }
        public int GetCount()
        {
            return users.Count;
        }
        public IEnumerator<KeyValuePair<WebSocketHandler, User>> GetEnumerator()
        {
            return users.GetEnumerator();
        }
        public void NewUserBroadCast(User user)
        {
            user.flag = MessageType.Joined.ToString();
            user.count = GetCount();
            var enumerator = GetEnumerator();
            while (enumerator.MoveNext())
            {
                enumerator.Current.Key.Send(JsonConvert.SerializeObject(user, Newtonsoft.Json.Formatting.None,
                            new JsonSerializerSettings
                            {
                                NullValueHandling = NullValueHandling.Ignore,
                                DefaultValueHandling = DefaultValueHandling.Ignore
                            }));
            }

        }
        public void ExitUserBroadCast(WebSocketHandler webSocketHandler)
        {
            User user = new User();
            users.TryGetValue(webSocketHandler, out user);
            user.flag = MessageType.Exit.ToString();
            users.Remove(webSocketHandler);
            user.count = GetCount();
            var enumerator = GetEnumerator();
            while (enumerator.MoveNext())
            {
                enumerator.Current.Key.Send(JsonConvert.SerializeObject(user, Newtonsoft.Json.Formatting.None,
                            new JsonSerializerSettings
                            {
                                NullValueHandling = NullValueHandling.Ignore,
                                DefaultValueHandling = DefaultValueHandling.Ignore
                            }));
            }
        }

        public void Message(WebSocketHandler webSocketHandler, Message message)
        {
            message.flag = MessageType.Message.ToString();
            System.DateTime time = DateTime.Now;             // Use current time.
            string format = "HH:mm ddd d";
            message.dateTime = time.ToString(format);
            var enumerator = users.GetEnumerator();
            while (enumerator.MoveNext())
            {
                enumerator.Current.Key.Send(JsonConvert.SerializeObject(message, Newtonsoft.Json.Formatting.None,
                new JsonSerializerSettings
                {
                    NullValueHandling = NullValueHandling.Ignore,
                    DefaultValueHandling = DefaultValueHandling.Ignore
                }));

            }
        }
    }
}

