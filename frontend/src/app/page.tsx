import Navbar from "./components/Navbar";
import { BackgroundLines } from "./components/ui/background-lines";
import Squares from "./components/ui/Squares";

export default function Home() {
  return (
    <>
      <div className="fixed h-screen w-full">
        <Squares
          speed={0.5}
          squareSize={40}
          direction="diagonal" // up, down, left, right, diagonal
          borderColor="#1A1A19"
          hoverFillColor="#1A1A19"
        />
      </div>
      <Navbar />
    </>
  );
}
