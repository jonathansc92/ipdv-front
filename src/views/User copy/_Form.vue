<template>
    <form @submit.prevent="handleSubmit(!v$.$invalid)" class="formgrid grid">
        <div class="field col-12">
            <label for="email">
                Email
            </label>
            <InputText v-model="v$.form.email.$model" class="w-full" :class="{ 'p-invalid': v$.form.email.$invalid }"
                id="email" aria-describedby="text-error" placeholder="Digite seu email" />
            <span v-if="v$.form.email.$error">
                <span id="email-error" v-for="(error, index) of v$.form.email.$errors" :key="index">
                    <small class="p-error">{{ error.$message }}</small>
                </span>
            </span>
            <small v-else-if="(v$.form.email.$invalid) || v$.form.email.$pending.$response" class="p-error">{{
                v$.form.email.required.$message.replace('Value', 'Email') }}</small>
        </div>
        <div class="field col-12">
            <label for="password">
                Senha
            </label>
            <InputText v-model="v$.form.password.$model" class="w-full" :class="{ 'p-invalid': v$.form.password.$invalid }"
                id="password" aria-describedby="text-error" placeholder="Digite sua senha" type="password" />
            <span v-if="v$.form.password.$error">
                <span id="password-error" v-for="(error, index) of v$.form.password.$errors" :key="index">
                    <small class="p-error">{{ error.$message }}</small>
                </span>
            </span>
            <small v-else-if="(v$.form.password.$invalid) || v$.form.password.$pending.$response" class="p-error">{{
                v$.form.password.required.$message.replace('Value', 'Password')
            }}</small>
        </div>
    </form>
</template>

<script>
import { ref } from "vue";
import { email, required, helpers, minLength, maxLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import ButtonComponent from 'primevue/button';
import InputText from 'primevue/inputtext';
import { authStore } from "@/stores/Auth";

export default {
    name: 'UserForm',
    setup: () => ({ v$: useVuelidate() }),
    components: {
        ButtonComponent,
        InputText,
    },
    data() {
        return {
            form: {
                email: ref(null),
                password: ref(null),
            },
            submitted: ref(false),
            disabled: ref(true),
            loading: ref(false),
            store: authStore(),
        }
    },
    validations() {
        return {
            form: {
                email: {
                    required: helpers.withMessage('Campo obrigatório', required),
                    email: helpers.withMessage('Formato inválido', email)
                },
                password: {
                    required: helpers.withMessage('Campo obrigatório', required),
                    minLength: helpers.withMessage('Número minímo de caracteres 4', minLength(4)),
                    maxLength: helpers.withMessage('Número máximo de caracteres 15', maxLength(15)),
                },
            }
        }
    },
    methods: {
        async handleSubmit(isFormValid) {
            this.submitted = true;
            this.loading = true;

            if (!isFormValid) {
                this.disabled = true;
                this.loading = false;
                return;
            }

            await this.store.login(this.form);
            this.loading = false;
        }
    },
}
</script>

<style lang="scss" scoped>

</style>