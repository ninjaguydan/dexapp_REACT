//comps
import TopTenList from "components/pages/home/TopTenList";
import Timeline from "components/pages/home/Timeline";

const Home = () => {
  console.count("Home counter");
  return (
    <>
      <TopTenList />
      <Timeline />
    </>
  );
};

export default Home;
