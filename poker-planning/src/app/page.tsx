import Link from 'next/link';

export default function Home() {
  return (
      <div>
        <h1>Poker Planning</h1>
        <p>Choisissez une salle ou créez-en une nouvelle.</p>
        <ul>
          {/* Liste des salles disponibles */}
          <li>
            <Link href="/pages/room/1">Salle 1</Link>
          </li>
          <li>
            <Link href="/pages/room/2">Salle 2</Link>
          </li>
        </ul>
        <button>
          Créer une nouvelle salle
        </button>
      </div>
  );
}
