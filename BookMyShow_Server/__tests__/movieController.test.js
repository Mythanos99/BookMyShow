const movieController = require('../src/controllers/movie');
const movieService = require('../src/services/movie');
const httpMocks = require('node-mocks-http');
const upload = require('../src/utils/imgUpload');

jest.mock('../src/services/movie');
jest.mock('../src/utils/imgUpload', () => jest.fn((req, res, cb) => cb(null)));

describe('Movie Controller', () => {

  describe('getFilteredMovies', () => {
    it('should return filtered movies', async () => {
      const req = httpMocks.createRequest({
        method: 'GET',
        query: { genre: 'Action' },
      });
      const res = httpMocks.createResponse();

      const mockMovies = [{ name: 'Action Movie' }];
      movieService.getFilteredResult.mockResolvedValue(mockMovies);

      await movieController.getFilteredMovies(req, res);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(mockMovies);
    });

    it('should handle errors in getFilteredMovies', async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();

      movieService.getFilteredResult.mockRejectedValue(new Error('Failed to fetch movies'));

      await movieController.getFilteredMovies(req, res);

      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toEqual({ message: 'Failed to fetch movies' });
    });
  });

  describe('getMovieById', () => {
    it('should return a movie by ID', async () => {
      const req = httpMocks.createRequest({
        method: 'GET',
        params: { id: '123' },
      });
      const res = httpMocks.createResponse();

      const mockMovie = { id: '123', name: 'Test Movie' };
      movieService.getById.mockResolvedValue(mockMovie);

      await movieController.getMovieById(req, res);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(mockMovie);
    });

    it('should handle errors in getMovieById', async () => {
      const req = httpMocks.createRequest({
        method: 'GET',
        params: { id: '123' },
      });
      const res = httpMocks.createResponse();

      movieService.getById.mockRejectedValue(new Error('Failed to fetch movie'));

      await movieController.getMovieById(req, res);

      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toEqual({ message: 'Failed to fetch movie' });
    });
  });

  describe('addMovie', () => {
    it('should add a movie successfully', async () => {
      const req = httpMocks.createRequest({
        method: 'POST',
        body: { name: 'New Movie' },
        file: { path: 'image.jpg' },
      });
      const res = httpMocks.createResponse();

      const mockMovie = { id: '123', name: 'New Movie', image_url: 'image.jpg' };
      movieService.addMovie.mockResolvedValue(mockMovie);

      await movieController.addMovie(req, res);

      expect(res.statusCode).toBe(201);
      expect(res._getJSONData()).toEqual(mockMovie);
    });

    it('should handle errors in addMovie', async () => {
      const req = httpMocks.createRequest({
        method: 'POST',
        body: { name: 'New Movie' },
      });
      const res = httpMocks.createResponse();

      movieService.addMovie.mockRejectedValue(new Error('Failed to add movie'));

      await movieController.addMovie(req, res);

      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toEqual({ message: 'Failed to add movie' });
    });
  });

  // Similarly, add tests for other controller methods...

});
