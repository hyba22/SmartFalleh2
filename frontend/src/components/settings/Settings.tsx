import { Input } from "@material-tailwind/react";

const Settings = () => {
  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Paramètres</h1>
      
      <div className="space-y-4">
       <input type="text" placeholder="Username" />
       <input type="email" placeholder="Email" />
       <input type="password" placeholder="Password" />
       <input type="text" placeholder="Nom" />
       <input type="text" placeholder="Prénom" />
       <input type="tel" placeholder="Téléphone" />
       <input type="text" placeholder="Adresse" />
       <input type="text" placeholder="Région" />
       <input type="number" placeholder="Surface de ferme (hectares)" />
       <input type="number" placeholder="Nombre de vaches" />
       <button className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
      </div>
    </div>
  );
};

export default Settings;