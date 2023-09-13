import { PostsService, Post } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      { id: '1', text: 'Post 1' },
      { id: '2', text: 'Post 2' },
      { id: '3', text: 'Post 3' },
      { id: '4', text: 'Post 4' },
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      // реализуйте тест-кейс
      const result = postsService.findMany();
      expect(result).toEqual(posts);
    });

    it('should return correct posts for skip and limit options', () => {
      const result = postsService.findMany({ skip: 1, limit: 2 });
      expect(result).toEqual([{ id: '2', text: 'Post 2' }, { id: '3', text: 'Post 3' }]);
    });

    it('should return correct posts for skip option', () => {
      const result = postsService.findMany({ skip: 2 });
      expect(result).toEqual([{ id: '3', text: 'Post 3' }, { id: '4', text: 'Post 4' }]);
    });

    it('should return correct posts for limit option', () => {
      const result = postsService.findMany({ limit: 3 });
      expect(result).toEqual([{ id: '1', text: 'Post 1' }, { id: '2', text: 'Post 2' }, { id: '3', text: 'Post 3' }]);
    });

    it('should return an empty array if skip is greater than the number of posts', () => {
      const result = postsService.findMany({ skip: 5 });
      expect(result).toEqual([]);
    });

    it('should return an empty array if limit is 0', () => {
      const result = postsService.findMany({ limit: 0 });
      expect(result).toEqual([]);
    });

    it('should return an empty array if skip and limit are greater than the number of posts', () => {
      const result = postsService.findMany({ skip: 5, limit: 3 });
      expect(result).toEqual([]);
    });

  });
});