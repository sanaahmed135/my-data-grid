

namespace kuka.Server.Models
{
    public class JsonReponse
    {
        public bool IsSucessful { get; set; }

        public string Error { get; set; }

        public object Data { get; set; }
    }
}
