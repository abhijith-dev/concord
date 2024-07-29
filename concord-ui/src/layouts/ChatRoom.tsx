import Header from "../components/Header";
import MessageBox from "../components/MessageBox";
import TopicDetails from "../components/TopicDetails";
const ChatRoom = () => {
    
    return (
      <>
      <Header />
        <main className="w-screen h-screen px-40 py-20 chat-box">  
          <section className="w-full h-full border border-[#dfe0e0] bg-white rounded-md flex justify-around">
            <article className="w-1/2 h-full message-box">
                <MessageBox />
            </article>
            <article className="w-1/2 h-full flex justify-center py-4 topic">
                <TopicDetails/>
            </article>
          </section>
        </main>
    </>    
    )
};

export default ChatRoom;