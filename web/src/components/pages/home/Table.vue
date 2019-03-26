<template>
    <div>
    <h6> Árvore </h6>
      <v-toolbar flat color="white">
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="100%">
          <template v-slot:activator="{ on }">
            <v-btn  color="primary" dark class="mb-2 add" v-on="on">
              <i class="material-icons">add</i>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <div class="list-add">
              <div v-for="key in getObjectKeys(editedItem)" :key="key" class="input-form">
                <input v-model="editedItem[key]" :placeholder="key" id="first_stage" class="validate">
              </div>

              <div class="type-box">
                <select v-model="editedItem.type">
                  <option value="type" disabled>Type</option>
                  <option v-for="item in types">{{ item.value }}</option>
                </select>
              </div>
            </div>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" flat @click="save">Salvar</v-btn>
            </v-card-actions>

          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :hide-actions="true"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td class="text-xs-right" v-for="key in getObjectKeys(editedItem)" :key="key">{{ props.item[key] }}</td>
        
          <td class="justify-center layout px-0">
            <v-icon
              small
              class="mr-2"
              @click="editItem(props.item)"
            >
              edit
            </v-icon>
            <v-icon
              small
              @click="deleteItem(props.item)"
            >
              delete
            </v-icon>
          </td>
        </template>
      </v-data-table>
    </div>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      api: 'http://localhost:3000/api/v1/config',
      headers: [],
      desserts: [],
      types: [],
      editedIndex: -1,
      editedItem: {},
      defaultItem: {}
    }),


    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Novo item' : 'Editar item'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
      this.getHeaders()
      setTimeout( () => {
        this.defaultItem = this.headers.map(h => h.value).reduce((obj, key) => ({ ...obj, [key]: '' }), {})
        this.editedItem = this.headers.map(h => h.value).reduce((obj, key) => ({ ...obj, [key]: '' }), {})
      },1000)
    },

    // updated() {
    //   setTimeout(() => {
    //     this.getHeaders()
    //   }, 10000)
    // },

    methods: {
      POST () {
        fetch(this.api, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.desserts)
        })
      },

      getObjectKeys(obj) {
        return Object.keys(obj)
      },

      initialize () {
        fetch(this.api)
          .then((response) => response.ok ? response.json() : null)
          .then(result => this.desserts = result )
          .catch(console.error);
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        this.POST ()
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        this.desserts.splice(index, 1)
        this.POST ()
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save (item) {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.POST ()
        this.close()
      },

      getHeaders () {
        fetch('http://localhost:3000/api/v1/table2')
          .then((response) => response.ok ? response.json() : null)
          .then(result => {
            this.headers = result
          } )
          .catch(console.error);

          fetch('http://localhost:3000/api/v1/table3')
          .then((response) => response.ok ? response.json() : null)
          .then(result => {
            this.types = result
          } )
          .catch(console.error);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .type-box {
    order: -1;
    margin-top: -3px;
    select {
      border-bottom: 1px solid rgba($color: #000000, $alpha: .4);
    }
  }
  .input-form {
    margin-left: 2%;
  }
</style>
