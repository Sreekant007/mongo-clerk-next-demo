import Image from "next/image";
import clientPromise from "../../utils/connection";
import client from "../../utils/connection";
import { SignIn, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function Home({ props }: any) {
  // const data = await getData();
  const { userId } = auth();
  console.log(userId);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UserButton afterSignOutUrl="/" />
      <SignIn afterSignOutUrl="/" />
    </main>
  );
}

export async function getData() {
  try {
    await client.connect();
    let db = await client.db("sample_analytics");
    const collection = await db
      .collection("accounts")
      .find()
      .limit(10)
      .toArray();
    console.error("Connected", collection);

    // `await client.connect()` will use the default database passed in the MONGODB_URI
    return {
      props: { collection }
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false }
    };
  }
}
