import "bootstrap/dist/css/bootstrap.min.css";
import MainContent from "./containers/MainContent";
import DataProvider from "./context/DataContext";

function App() {
  return (
    <DataProvider>
      <MainContent />
    </DataProvider>
  );
}

export default App;
