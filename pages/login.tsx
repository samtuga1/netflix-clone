import Head from "next/head";
import Image from "next/image";
import {useState} from 'react';
import {useForm} from 'react-hook-form';

interface FormData {
  email: string,
  password: string,
}

function Login() {
  const [isLogin, setIsLogin] = useState();
  const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormData>();
  const onSubmit = handleSubmit(data => console.log(data));
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
      <form onSubmit={onSubmit} className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:px-14 md:max-w-md" >
        <h1 className="text-4xl font-semibold" >Sign In</h1>
        <div className="space-y-4" >
          <label className="inline-block w-full" >
          <input {...register("email"), {required: true}} type="email" placeholder="Email" className="input"/>
        </label>
        <label className="inline-block w-full" >
        <input {...register("password"), {required: true}} type="password" placeholder="Password" className="input"/>
        </label>
        </div>
        <button type="submit" className="bg-[#e50914] w-full rounded py-3 font-semibold" >
          Sign In
        </button>
      <div className="text-[gray]" >
        New to Netflix?{' '}
        <button className="hover:underline text-white" >
          Sign Up now
        </button>
      </div>
      </form>
    </div>
  );
}

export default Login;
