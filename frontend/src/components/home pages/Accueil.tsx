import { useEffect, useState } from 'react';

const Typewriter = ({ phrases, delay = 100 }: { phrases: string[]; delay?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    let timeout: number;

    if (!isDeleting && currentIndex <= currentPhrase.length) {
      // Typing
      timeout = setTimeout(() => {
        setDisplayText(currentPhrase.substring(0, currentIndex));
        setCurrentIndex(prev => prev + 1);
      }, delay);
    } else if (!isDeleting) {
      // Pause at the end of typing
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 4000); // 4 second pause after typing
    } else if (currentIndex >= 0) {
      // Deleting
      timeout = setTimeout(() => {
        setDisplayText(currentPhrase.substring(0, currentIndex));
        setCurrentIndex(prev => prev - 1);
      }, delay / 2); // Faster deletion
    } else {
      // Move to next phrase
      setIsDeleting(false);
      setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
      setCurrentIndex(0);
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, currentPhraseIndex, delay, phrases]);

  return <span className="typewriter">{displayText}<span className="animate-pulse">|</span></span>;
};

const Accueil = () => {
    const phrases = [
        "Créez votre compte et livrez votre commande à domicile directement",
        "Soyez à jour et nous vous fournirons ce que vous avez besoin"
    ];
    
    return (
        <div id="home" className="w-full h-screen relative">
            <div className="w-full h-[85vh] relative -z-10">
                <img 
                    src="src/assets/accueil img.jpg" 
                    alt="Accueil" 
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full px-4 z-10">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
                    <Typewriter phrases={phrases} delay={70} />
                </h1>
            </div>
        </div>
    );
};

export default Accueil;