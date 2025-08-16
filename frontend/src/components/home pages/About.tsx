
const About = () => {
  return (
    <div id="about" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">À Propos de Nous</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Notre Mission</h3>
            <p className="text-gray-600 mb-6">
              Nous nous engageons à fournir des solutions innovantes et de qualité pour répondre aux besoins de nos clients.
              Notre équipe dévouée travaille sans relâche pour vous offrir la meilleure expérience possible.
            </p>
            <h3 className="text-2xl font-semibold mb-4">Notre Vision</h3>
            <p className="text-gray-600">
              Devenir le leader dans notre domaine en offrant des services exceptionnels et en repoussant constamment
              les limites de l'innovation technologique.
            </p>
          </div>
          <div className="bg-[#679330] p-8 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4 text-white">Nos Valeurs</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-white">Innovation continue</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-white">Satisfaction client</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-white">Intégrité et transparence</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-white">Excellence opérationnelle</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
