import BaseService from './base.service';

class PostsService extends BaseService {
  static get entity() {
    return 'posts';
  }
}

export default new PostsService();
