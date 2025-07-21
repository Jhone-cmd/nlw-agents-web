import { Link } from 'react-router-dom';

export function CreateRoom() {
  return (
    <div>
      Create Room
      <br />
      <Link className="underline" to="/room">
        acessar sala
      </Link>
    </div>
  );
}
