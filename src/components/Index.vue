<template>
  <section id="main">
    
    <div class="container">
      <b-navbar toggleable="lg" type="dark" variant="info">
          <b-navbar-brand href="#">BUDIES LIST</b-navbar-brand>
      </b-navbar>

      <b-container class="bv-example-row">
          <b-row  class="text-center header">
          <b-col cols="1">#</b-col>
          <b-col class="text-left" cols="3">First Name</b-col>
          <b-col class="text-left" cols="3">Last Name</b-col>
          <b-col class="text-left" cols="3">Email</b-col>
          <b-col cols="1">Edit</b-col>
          <b-col cols="1">Delete</b-col>
        </b-row>

        <b-row v-for="(budy, i) in budies" :key="budy.email" class="text-center items-of-list">
          <b-col cols="1">{{i+1}}</b-col>
          <b-col class="text-left" cols="3">{{budy.name}}</b-col>
          <b-col class="text-left" cols="3">{{budy.lastName}}</b-col>
          <b-col class="text-left" cols="3">{{budy.email}}</b-col>
          <b-col @click="clickEdit(budy)" class="edit" cols="1"><b-icon icon="pencil-fill"></b-icon></b-col>
          <b-col @click="clickDelete(budy)" class="delete" cols="1"><b-icon icon="trash-fill" aria-hidden="true"></b-icon></b-col>
        </b-row>

      </b-container>
      <b-row  class="text-right add-budy-bar">
          <b-col cols="12">
            <b-button v-show="false" @click="clickDelete">Simple msgBoxConfirm</b-button>
            <userForm  :budyForEdit="budyForEdit" :budies="budies" :editCase="editCase" @reset-edit-mode="resetEditMode"  @add-edit-budy="addEditBudy"></userForm>
          </b-col>
      </b-row>
    </div>
  </section>
</template>

<script>

  import userForm from './modals/user-form.vue'

  export default {
    components: {userForm},
    data() {
      return {
        deleteModal: false,
        editModal: false,
        editCase: 0,
        budies: [ ],
        budyForEdit: {}
      }
    },
    created() {
      this.budies =  JSON.parse(localStorage.getItem('budies')) || []
    },
    methods: {

      clickDelete(budy) {
        this.$bvModal.msgBoxConfirm('Are you sure?')
          .then(value => {
              if(value){
                this.budies = this.budies.filter(item => item.email != budy.email)
                localStorage.setItem('budies', JSON.stringify(this.budies))
                }
          })
      }, 

      resetEditMode () {
        this.budyForEdit = {}
      },

      addEditBudy (budy) {
        if(this.budyForEdit.email != budy.email ) {
          this.budies.push(budy)
        }
        else this.budies = this.budies.map(item => item.email == budy.email ? budy : item)
        this.resetEditMode()
        localStorage.setItem('budies', JSON.stringify(this.budies))
      },

      clickEdit (budy) {
        this.budyForEdit = budy
        this.editCase++
      }
      
    }
  }
</script>
<style lang="scss" scoped >

  .header {
    font-weight: bold;
    height: 2.5rem;
    line-height: 2.5rem;
    background-color: rgba(86,61,124,.15);
    div:not(:last-child) {
      border-right: 1px solid grey ;
    }
  }

  .bv-example-row {
    border: 1px solid grey ;
  }

  .items-of-list {
    border-top: 1px solid grey ;
    line-height: 2rem;
    height: 2rem;
    &:nth-child(odd) {
      background-color: rgba(255,0,0,.1);
      
    }
    div:not(:last-child) {
      border-right: 1px solid grey ;
    }
    
  }

  .add-budy-bar {
    margin-top: 20px
  }


  .edit, .delete {
    cursor: pointer;
  }

</style>

