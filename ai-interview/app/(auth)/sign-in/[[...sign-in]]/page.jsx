import { SignIn } from "@clerk/nextjs";

export default function Page() {


    const styling = {
        backgroundImage: `url('https://unsplash.com/photos/white-clouds-P8VMwYFY-Es')`,
        width:"100%",
        height:"100%"
    }

  return(
    <section class="bg-white dark:bg-gray-900">
  <div class="lg:grid lg:min-h-screen lg:grid-cols-1">

    <main
      class="flex items-center justify-center"
    >
      <div class="flex items-center justify-center">

        <h1 class="m-3 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white max-w-[50%] font-Lexend">
        <p className="py-5">Welcome to Your Mock Interview</p>
        <p className="py-5">Sign In for a better Experience</p>
        </h1>

        <SignIn />
      </div>
    </main>
  </div>
</section>
  ) 
}