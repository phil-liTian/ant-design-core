import Table from './Table'

export default Object.assign(Table, {
  install: function (Vue) {
    Vue.component(Table.name, Table)
  },
})
