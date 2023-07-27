import Home from './Homepage/Home';
import React, {useState,useEffect} from 'react';
import WelcomePage from './components/WelcomePage/welcome';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000);

    // Clear the timer on unmount to avoid potential memory leaks
    return () => clearTimeout(timer);
  }, []);
  return (
    <main className='main-container'>
      <div className="app">
        {showWelcome ? <WelcomePage /> : <Home />}
      </div>
    </main>
  );
}

export default App;
