<template>
    <div>
      <h6> Tipos de Campos </h6>
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
              <div>
                <input v-model="editedItem.key" placeholder="Key" id="first_key" type="text" class="validate">
              </div>

              <div>
                <input v-model="editedItem.value" placeholder="Value" id="last_key" type="text" class="validate">
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
          <td>{{ props.item.key }}</td>
          <td class="text-xs-right">{{ props.item.value }}</td>
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
      api: 'http://localhost:3000/api/v1/table3',
      headers: [
        { text: 'Key', value: 'key' },
        { text: 'Value', value: 'value' },
        { text: 'Acão', value: 'actions' },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        key: '',
        value: ''
      },
      defaultItem: {
        key: '',
        value: ''
      }
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

    },

    methods: {
      POST () {
        fetch(this.api, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.desserts)
        })
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
    }
  }
</script>
