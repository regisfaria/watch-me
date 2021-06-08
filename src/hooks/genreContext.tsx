import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';
import { api } from '../services/api';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface GenreContextData {
  genres: GenreResponseProps[];
  selectedGenreId: number;
  handleSelectedGenreIdChange(id: number): void;
  selectedGenre: GenreResponseProps;
}

const GenreContext = createContext<GenreContextData>({} as GenreContextData);

const GenreProvider: React.FC = ({ children }) => {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  const handleSelectedGenreIdChange = useCallback((id: number) => {
    setSelectedGenreId(id);
  }, [])

  return (
    <GenreContext.Provider
      value={{ genres, selectedGenreId, handleSelectedGenreIdChange, selectedGenre }}
    >
      {children}
    </GenreContext.Provider>
  );
};

function useGenre(): GenreContextData {
  const context = useContext(GenreContext);

  if (!context) {
    throw new Error('use Genre must be used within an GenreProvider');
  }

  return context;
}

export { GenreProvider, useGenre };
