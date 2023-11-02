//comps
import TopTenList from "components/pages/home/TopTenList";
import Timeline from "components/pages/home/Timeline";

const Home = () => {
  return (
    <div className="profile main">
      <TopTenList />
      <Timeline />
    </div>
  );
};

export default Home;
