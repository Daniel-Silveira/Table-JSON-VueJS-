<template>
  <div>
    <div class="container">
      <div class="navbar">
          <div class="button" @click="table1 = true, table2 = false, table3 = false, get()">
              <p>Árvore</p>
          </div>
          <div class="button" @click="table1 = false, table2 = true, table3 = false, get()">
              <p>Campos</p>
          </div>
          <div class="button" @click="table1 = false, table2 = false, table3 = true, get()">
              <p>Tipos de Campos</p>
          </div>
      </div>
      <table-vue v-show="table1"></table-vue>
      <table2-vue v-show="table2"></table2-vue>
      <table3-vue v-show="table3"></table3-vue>
    </div>
  </div>
</template>

<script>
import TableVue from './Table.vue'
import Table2Vue from './Table2.vue'
import Table3Vue from './Table3.vue'
import NavbarVue from './Navbar.vue'
  export default {
    components: {
      TableVue,
      Table2Vue,
      Table3Vue,
      NavbarVue
    },
    data () {
      return {
        table1: true,
        table2: false,
        table3: false
      }
    },

    methods: {
      get () {
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

<style lang="scss">
  .container {
    width: 80%;
    margin: 5% 0% 5% 10%;
    .elevation-1 {
      margin-top: 1%;
    }
    .add {
      border-radius: 1000px;
      min-width: 0px;
      height: 3em;
      width: 3em;
      i {
        line-height: 43px;
      }
    }
  }

  .list-add {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .v-dialog {
    width: 80%;
    &__content {
      height: inherit;
    }
    .v-card {
      overflow: hidden;
      padding: 1% 3% 0% 3%;
      &__actions {
        .v-btn {
          height: inherit;
        }
      }
    }
  }

  .headline {
    padding-bottom: 2%;
  }

  .text-xs-right {
    text-align: left!important;
  }

  .v-toolbar {
    z-index: 0;
  }

  .navbar {
    position: fixed;
    width: 10%;
    left: 0;
    background: gray;
    padding: 2% 1%;
    top: 0;
    border-radius: 0px 0px 10px;
    .button {
        box-shadow: 2px 3px 3px rgba($color: #000000, $alpha: .1);
        border: 1px solid rgba($color: #000000, $alpha: .1);
        background-color: white;
        cursor: pointer;
        margin: 20% 0%;
        padding: 3% 0% 0% 3%;
        border-radius: 10px;
        text-align: center;
    }
  }

  h6 {
    z-index: 10;
    position: absolute;
    margin-top: 2%;
    display: flex;
    font-weight: bolder;
  }
</style>
