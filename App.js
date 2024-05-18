import { PaperProvider } from "react-native-paper";
import Routes from "./src/routes/routes.jsx";
import 'react-native-gesture-handler';

export default function App() {
  return (
    <PaperProvider>
      <Routes />
    </PaperProvider>
  );
}
