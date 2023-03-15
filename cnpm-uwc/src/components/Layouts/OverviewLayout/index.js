import Header from "../components/Header";

//Hien cac bang giong nhu bang nhan vien/ Ban do
import Footer from "../components/Footer";

function OverviewLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="content">{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default OverviewLayout;
