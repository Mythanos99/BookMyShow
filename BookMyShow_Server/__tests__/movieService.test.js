const movieService = require('../src/services/movie');
const Movie = require('../src/models/movie');
const Show = require('../src/models/show');

jest.mock('../src/models/movie');
jest.mock('../src/models/show');

describe('Movie Service', () => {

  describe('getAll', () => {
    it('should return all movies', async () => {
      const mockMovies = [{ name: 'Movie 1' }, { name: 'Movie 2' }];
      Movie.find.mockResolvedValue(mockMovies);

      const result = await movieService.getAll();

      expect(result).toEqual(mockMovies);
      expect(Movie.find).toHaveBeenCalledWith({});
    });

    it('should throw an error if getAll fails', async () => {
      Movie.find.mockRejectedValue(new Error('Failed to fetch movies'));

      await expect(movieService.getAll()).rejects.toThrow('Error fetching movies');
    });
  });

  describe('getById', () => {
    it('should return a movie by ID', async () => {
      const mockMovie = { id: '123', name: 'Test Movie' };
      Movie.findById.mockResolvedValue(mockMovie);

      const result = await movieService.getById('123');

      expect(result).toEqual(mockMovie);
      expect(Movie.findById).toHaveBeenCalledWith('123', { __v: 0, createdAt: 0, updatedAt: 0 });
    });

    it('should throw an error if getById fails', async () => {
      Movie.findById.mockRejectedValue(new Error('Failed to fetch movie'));

      await expect(movieService.getById('123')).rejects.toThrow('Error fetching movie');
    });
  });

  describe('addMovie', () => {
    it('should add a new movie', async () => {
      const mockMovieData = { name: 'New Movie' };
      const mockMovie = { ...mockMovieData, _id: '123' };
      Movie.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(mockMovie)
      }));

      const result = await movieService.addMovie(mockMovieData);

      expect(result).toEqual(mockMovie);
      expect(Movie.prototype.save).toHaveBeenCalled();
    });

    it('should throw an error if addMovie fails', async () => {
      const mockMovieData = { name: 'New Movie' };
      Movie.mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(new Error('Failed to add movie'))
      }));

      await expect(movieService.addMovie(mockMovieData)).rejects.toThrow('Error adding movie');
    });
  });

  describe('getFilteredResult', () => {
    it('should return filtered movies', async () => {
      const mockShows = [
        {
          _id: '123',
          movieDetails: [{ name: 'Filtered Movie', genre: ['Action'] }],
        },
      ];

      Show.aggregate.mockResolvedValue(mockShows);

      const result = await movieService.getFilteredResult({ genre: 'Action' });

      expect(result).toEqual([
        {
          name: 'Filtered Movie',
          genre: ['Action'],
        },
      ]);
      expect(Show.aggregate).toHaveBeenCalled();
    });

    it('should throw an error if getFilteredResult fails', async () => {
      Show.aggregate.mockRejectedValue(new Error('Failed to fetch movies'));

      await expect(movieService.getFilteredResult({ genre: 'Action' })).rejects.toThrow('Error fetching movies');
    });
  });

  // Similarly, add tests for other service methods...

});
