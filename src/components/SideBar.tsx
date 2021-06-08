import { Button } from '../components/Button';

import { useGenre } from '../hooks/genreContext';

import '../styles/sidebar.scss';

export function SideBar() {
  const { genres, handleSelectedGenreIdChange, selectedGenreId } = useGenre();

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleSelectedGenreIdChange(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  )
}