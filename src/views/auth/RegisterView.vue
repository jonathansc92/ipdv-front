<template>
    <form @submit.prevent="handleSubmit(!v$.$invalid)" class="formgrid grid">
        <div class="field col-12">
            <label for="email">
                Nome
            </label>
            <InputText v-model="v$.form.name.$model" class="w-full" :class="{ 'p-invalid': v$.form.name.$invalid }"
                id="name" aria-describedby="text-error" placeholder="Digite seu Nome" />
            <span v-if="v$.form.name.$error">
                <span id="name-error" v-for="(error, index) of v$.form.name.$errors" :key="index">
                    <small class="p-error">{{ error.$message }}</small>
                </span>
            </span>
            <small v-else-if="(v$.form.name.$invalid) || v$.form.name.$pending.$response" class="p-error">{{
                v$.form.name.required.$message.replace('Value', 'Name') }}</small>
        </div>
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
        <div class="field col-12 w-full">
            <label for="password">
                Senha
            </label>
            <Password v-model="v$.form.password.$model" class="w-full" :feedback="false" toggleMask
                :class="{ 'p-invalid': v$.form.password.$invalid }" id="password" aria-describedby="text-error"
                placeholder="Digite sua senha" />
            <span v-if="v$.form.password.$error">
                <span id="password-error" v-for="(error, index) of v$.form.password.$errors" :key="index">
                    <small class="p-error">{{ error.$message }}</small>
                </span>
            </span>
            <small v-else-if="(v$.form.password.$invalid) || v$.form.password.$pending.$response" class="p-error">{{
                v$.form.password.required.$message.replace('Value', 'Password')
            }}</small>
        </div>
        <div class="col-12 flex align-items-center justify-content-center">
            <ButtonComponent class="w-full" type="submit" label="Cadastrar" :disabled="v$.$invalid" :loading="loading"
                outlined />
        </div>
    </form>
</template>

<script>
import { ref } from "vue";
import { email, required, helpers, minLength, maxLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

import ButtonComponent from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';

import messages from "../../constants/messages";

import { userStore } from "@/stores/User";

export default {
    setup: () => ({ v$: useVuelidate() }),
    components: {
        ButtonComponent,
        InputText,
        Password
    },
    data() {
        return {
            form: {
                name: ref(null),
                email: ref(null),
                password: ref(null),
            },
            submitted: ref(false),
            disabled: ref(true),
            loading: ref(false),
            store: userStore(),
            visible: ref(false)
        }
    },
    validations() {
        return {
            form: {
                name: {
                    required: helpers.withMessage(messages.REQUIRED, required),
                },
                email: {
                    required: helpers.withMessage(messages.REQUIRED, required),
                    email: helpers.withMessage('Formato inválido', email)
                },
                password: {
                    required: helpers.withMessage(messages.REQUIRED, required),
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

            await this.store.create(this.form);
            
            this.loading = false;
        }
    },
}
</script>

<style>
.p-password-input {
    width: 100%;
}
</style>