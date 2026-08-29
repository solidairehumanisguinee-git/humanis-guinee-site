export default function Footer() {
  return (
    <footer className="bg-humanis-blue text-white text-center py-10">
      <p className="mb-2">
        <a href="mailto:solidairehumanisguinee@gmail.com" className="hover:underline">
          solidairehumanisguinee@gmail.com
        </a>
      </p>
      <p className="text-humanis-yellow font-bold text-lg">
        Humanis – &quot;La Solidarité ici et là-bas&quot;
      </p>
      <p className="text-gray-300 text-sm mt-4">
        © {new Date().getFullYear()} Association Humanis Guinée Solidarité.
      </p>
    </footer>
  );
}
