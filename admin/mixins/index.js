import Model from '@/commons/model.js'

export default {
  options: {
    methods: {
      async setOptions (dicts = []) {
        if (dicts.length) {
          const result = await Model.getDictData(dicts)
          if (result) {
            this.options = result
          }
        }
      }
    }
  },
  page: {
    data () {
      return {
        page: {
          pageIndex: 1,
          pageSize: 20,
          total: 0
        }
      }
    }
  }
}