import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const Contact = () => {
  return (
    <div id="contact" className=" text-[#333] max-w-[1200px] mx-auto px-5 py-8">
      <div className="text-center py-16 px-5 bg-gradient-to-br from-[#C2B280] to-[#e4e8eb] rounded-xl mb-10">
        <h1 className="text-4xl text-[#2c3e50] mb-4 ">
          Nous contacter
        </h1>
        <p className="text-lg text-[#555] ">
          Une question, une demande ? Notre équipe est à votre écoute.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 ">
        <div className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-1 transition-transform duration-300 text-center border-[1px] border-[#e4e8eb]">
          <div className="w-[70px] h-[70px] bg-[#007F3F] rounded-full flex items-center justify-center mx-auto mb-5">
            <FaEnvelope className="text-white text-3xl" />
          </div>
          <h3 className="text-xl text-[#2c3e50] mb-4 ">
            Email
          </h3>
          <p className="text-[#555] ">contact@smartfalleh.com</p>
          <p className="text-[#555] ">support@smartfalleh.com</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-1 transition-transform duration-300 text-center border-[1px] border-[#e4e8eb]">
          <div className="w-[70px] h-[70px] bg-[#007F3F] rounded-full flex items-center justify-center mx-auto mb-5">
            <FaPhone className="text-white text-3xl" />
          </div>
          <h3 className="text-xl text-[#2c3e50] mb-4 ">
            Téléphone
          </h3>
          <p className="text-[#555] ">+216 71 580 334</p>
          <p className="text-[#555] ">Service client: 9h-18h</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-1 transition-transform duration-300 text-center border-[1px] border-[#e4e8eb]">
          <div className="w-[70px] h-[70px] bg-[#007F3F] rounded-full flex items-center justify-center mx-auto mb-5">
            <FaMapMarkerAlt className="text-white text-3xl" />
          </div>
          <h3 className="text-xl text-[#2c3e50] mb-4 ">
            Adresse
          </h3>
          <p className="text-[#555] ">5 Rue Abderrahmen Ibn Zied</p>
          <p className="text-[#555] ">2042 Tunis, Tunisie</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-1 transition-transform duration-300 text-center border-[1px] border-[#e4e8eb]">
          <div className="w-[70px] h-[70px] bg-[#007F3F] rounded-full flex items-center justify-center mx-auto mb-5">
            <FaClock className="text-white text-3xl " />
          </div>
          <h3 className="text-xl text-[#2c3e50] mb-4 ">
            Horaires
          </h3>
          <p className="text-[#555] ">Lundi-Vendredi: 9h-18h</p>
          <p className="text-[#555] ">Samedi: 10h-14h</p>
        </div>
      </div>

      <div className="mb-12 bg-[#007F3F] w-[100%] h-[auto] p-5 rounded-[25px]">
        <h2 className="text-3xl text-[#2c3e50] text-center mb-10 text-white ">
          Notre équipe
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Team Member 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
            <div className="w-[120px] h-[120px] rounded-full mb-5 overflow-hidden">
              <img 
                src="/src/assets/profile_picture.jpg" 
                alt="Jesser Ben Salah" 
                className="w-full h-full object-cover object-center sm:w-[150px] sm:h-[150px]"
              />
            </div>
            <h4 className="text-xl text-[#2c3e50] mb-2.5 ">
              Abir Mansour
            </h4>
            <p className="text-[#555] ">Directeur commercial</p>
            <p className="text-[#555] ">abir@smartfalleh.com</p>
          </div>

          {/* Team Member 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
            <div className="w-[120px] h-[120px] rounded-full mb-5 overflow-hidden">
              <img 
                src="/src/assets/profile_picture.jpg" 
                alt="Nawress El Abed" 
                className="w-full h-full object-cover object-center sm:w-[150px] sm:h-[150px] "
              />
            </div>
            <h4 className="text-xl text-[#2c3e50] mb-2.5 ">
              Nawress El Abed
            </h4>
            <p className="text-[#555] ">Responsable clientèle</p>
            <p className="text-[#555] ">nawress@smartfalleh.com</p>
          </div>

          {/* Team Member 3 */}
          <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
            <div className="w-[120px] h-[120px] rounded-full mb-5 overflow-hidden">
              <img 
                src="/src/assets/profile_picture.jpg" 
                alt="Hiba Bouslahi" 
                className="w-full h-full object-cover object-center sm:w-[150px] sm:h-[150px]"
              />
            </div>
            <h4 className="text-xl text-[#2c3e50] mb-2.5 ">
              Hiba Bouslahi
            </h4>
            <p className="text-[#555] ">Support technique</p>
            <p className="text-[#555] ">hiba@smartfalleh.com</p>
          </div>

          {/* Team Member 4 */}
          <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
            <div className="w-[120px] h-[120px] rounded-full mb-5 overflow-hidden">
              <img 
                src="/src/assets/profile_picture.jpg" 
                alt="Sarra Charfi" 
                className="w-full h-full object-cover object-center sm:w-[150px] sm:h-[150px]"
              />
            </div>
            <h4 className="text-xl text-[#2c3e50] mb-2.5 ">
              Sarra Charfi
            </h4>
            <p className="text-[#555] ">Ressources Humaines</p>
            <p className="text-[#555] ">sarra@smartfalleh.com</p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl text-[#2c3e50] text-center mb-8 ">
          Nous trouver
        </h2>
        <div className="h-[400px] w-full rounded-xl overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3190.847517468861!2d10.1555418!3d36.8499143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd33003988e799%3A0xf7e4c8e643cb3c01!2s5%2C%20Rue%20Abderrahmen%20ibn%20ziad%20cit%C3%A9%20Ettahrir!5e0!3m2!1sen!2stn!4v1712345678901!5m2!1sen!2stn"
            width="100%"
            height="100%"
            className="border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps - Notre localisation"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
