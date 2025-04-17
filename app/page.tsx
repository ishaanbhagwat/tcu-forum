import Image from "next/image";
import PostList from "./components/user-feed/post-list";

export default function Home() {
  return (
    <div className="">
      <main className="p-2">
        <PostList/>
      </main>
    </div>
  );
}
