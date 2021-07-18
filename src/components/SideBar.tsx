import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { GenreResponseProps } from '../App';
import { Button } from '../components/Button';

interface SideBarProps {
  selectedGenreId: number;
  setSelectedGenreId: Function;
  setSelectedGenre: Function;
}

export function SideBar({
  selectedGenreId,
  setSelectedGenreId,
  setSelectedGenre
}: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  
  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    });
  }, [selectedGenreId]);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => setSelectedGenreId(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  )

}