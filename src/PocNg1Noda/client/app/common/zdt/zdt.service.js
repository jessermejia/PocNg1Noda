class ZdtService {
  constructor($http) {
    "ngInject";
    this.$http = $http;
  }

  getAll() {
    return this.$http.get('api/zdt')
      .then((response) => {
        return response.data;
      });
  }

  getById(id) {
    return this.$http.get('api/zdt/' + id)
      .then((response) => {
        return response.data;
      });
  }

  create(zdt) {
    return this.$http.post('api/zdt', zdt);
  }

  update(zdt) {
    return this.$http.put('api/zdt/' + zdt.id, zdt);
  }

  delete(id) {
    return this.$http.delete('api/zdt/' + id);
  }
}

export default ZdtService;