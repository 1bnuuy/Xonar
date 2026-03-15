import Banner from "./_home/1/main";
import Featured from "./_home/2/main";
import Instruction from "./_home/3/main";
import Testimonials from "./_home/4/main";

export default function Home() {
  return (
    <section className="content flex w-screen flex-col items-center justify-start">
      <Banner />

      <Featured />

      <Instruction />

      <Testimonials />
    </section>
  );
}
