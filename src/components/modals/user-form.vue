<template>
  <div>
    <b-button ref="addEditBtn" v-b-modal.modal-prevent-closing variant="primary">Add budy</b-button>
    <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="User Card"
        @show="resetModal"
        @hidden="hiddenModal"
        @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
            :state="nameState"
            label="Name"
            label-for="name-input"
            invalid-feedback="Name is required & should't be short"
        >
          <b-form-input
              id="name-input"
              v-model.trim="name"
              :state="nameState"
              required
          ></b-form-input>
        </b-form-group>

        <b-form-group
            :state="lastNameState"
            label="Last name"
            label-for="last-name-input"
            invalid-feedback="Last name is required "
        >
          <b-form-input
              id="last-name-input"
              v-model="lastName"
              :state="lastNameState"
              required
          ></b-form-input>
        </b-form-group>

        <b-form-group
            :state="emailState"
            label="Email"
            label-for="email-input"
            invalid-feedback="Email is not correct"
        >
          <b-form-input
              id="email-input"
              v-model="email"
              :state="emailState"
              :disabled="!!budyForEdit.email"
              required
          ></b-form-input>
          <small class="warning_exist" v-if="alreadyExist">This email already exist</small>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import {email, required, minLength} from "vuelidate/lib/validators";


export default {
  props: {
    budies: {
      type: Array
    },
    budyForEdit: {
      type: Object,
      default: () => ({
        name: "",
        lastName: "",
        email: ""
      })
    },
    editCase: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      name: "",
      lastName: "",
      email: "",
      alreadyExist: false,
      budy: {},
      editMode: false
    };
  },
  validations: {
    name: {required, minLength: minLength(3)},
    lastName: {required, minLength: minLength(3)},
    email: {required, email}
  },

  computed: {
    nameState() {
      return this.name.length ? this.$v.name.required && this.$v.name.minLength : null;
    },
    lastNameState() {
      return this.lastName.length ? this.$v.lastName.required && this.$v.lastName.minLength : null;
    },
    emailState() {
      return this.email.length ? this.$v.email.required && this.$v.email.email : null;
    }
  },

  mounted() {
    this.$watch("editCase",
      function () {
        this.name = this.budyForEdit.name;
        this.lastName = this.budyForEdit.lastName;
        this.email = this.budyForEdit.email;
        this.$refs.addEditBtn.click();
      }
    );
  },

  methods: {
    checkEmail() {
      if (!this.budyForEdit.email && this.budies.find((item) => item.email == this.email)) {
        this.alreadyExist = true;
        return true;
      } else this.alreadyExist = false;
      return false;
    },

    resetModal() {
      this.alreadyExist = false;
      this.nameState = null;
      this.lastNameState = null;
      this.emailState = null;
      if (this.budyForEdit.email) return;
      this.name = "";
      this.lastName = "";
      this.email = "";
    },

    hiddenModal() {
      this.$emit("reset-edit-mode");
      this.resetModal();
    },

    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },

    handleSubmit() {
      if (this.$v.$invalid) {
        return;
      }

      if (this.checkEmail() && !this.budyForEdit.email) {
        return;
      }

      this.budy.name = this.name;
      this.budy.lastName = this.lastName;
      this.budy.email = this.email;


      this.$emit("add-edit-budy", this.budy);
      this.budy = {};
      //this.$emit('reset-edit-mode');
      this.resetModal();
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.warning_exist {
  color: red;
}
</style>