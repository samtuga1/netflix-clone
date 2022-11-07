import Head from "next/head";
import Image from "next/image";

function Login() {
  return (
    <div className="flex h-screen w-screen relative flex-col bg-black md:justify-center md:items-center md:bg-transparent">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        alt=""
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />
      <img
        src="https://rb.gy/ulxxee"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        height={150}
      />
      <form>
        <h1>Sign In</h1>
        <div>
          <label>
          <input type="email" placeholder="Email"/>
        </label>
        <label>
          <input />
        </label>
        </div>
      </form>
    </div>
  );
}

export default Login;
