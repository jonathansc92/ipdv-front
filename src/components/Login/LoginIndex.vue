<template>
    <div class="grid login background h-screen">
        <div class="col-8 flex align-content-center flex-wrap sm:hidden md:hidden lg:inline-flex">
            <div class="col-12 flex align-items-center justify-content-center">
                <div class="text-white secondary font-medium text-xl uppercase">
                    IPDV
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-4 xl:col-4 container flex align-content-center justify-content-center flex-wrap">
            <div class="font-medium text-xl uppercase title">
                Login
            </div>
            <div class="col-12 p-6">
                <form @submit.prevent="handleSubmit(!v$.$invalid)" class="formgrid grid">
                    <div class="field col-12">
                        <label for="email">
                            Email
                        </label>
                        <InputText v-model="v$.form.email.$model" class="w-full"
                            :class="{ 'p-invalid': v$.form.email.$invalid }" id="email" aria-describedby="text-error"
                            placeholder="Digite seu email" />
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
                        <InputText v-model="v$.form.password.$model" class="w-full"
                            :class="{ 'p-invalid': v$.form.password.$invalid }" id="password" aria-describedby="text-error"
                            placeholder="Digite sua senha" type="password" />
                        <span v-if="v$.form.password.$error">
                            <span id="password-error" v-for="(error, index) of v$.form.password.$errors" :key="index">
                                <small class="p-error">{{ error.$message }}</small>
                            </span>
                        </span>
                        <small v-else-if="(v$.form.password.$invalid) || v$.form.password.$pending.$response"
                            class="p-error">{{ v$.form.password.required.$message.replace('Value', 'Password')
                            }}</small>
                    </div>
                    <div class="col-12 flex align-items-center justify-content-center">
                        <ButtonComponent class="w-full" type="submit" label="ENTRAR" :disabled="v$.$invalid"
                            :loading="loading" outlined />
                    </div>
                    <div class="col-12 flex align-items-center justify-content-center mt-4">
                        Ou
                    </div>
                    <div class="col-12 flex align-items-center justify-content-center mt-4">
                        <ButtonComponent class="w-full" type="button" label="CADASTRAR" @click="visible = true"
                            :loading="loading" />
                    </div>
                </form>
            </div>
        </div>
        <Dialog v-model:visible="visible" modal header="Cadastrar" :style="{ width: '50vw' }">
            <user-form />
            <template #footer>
                <ButtonComponent label="No" icon="pi pi-times" @click="visible = false" text />
                <ButtonComponent label="Yes" icon="pi pi-check" @click="visible = false" autofocus />
            </template>
        </Dialog>
    </div>
</template>

<script>
import { ref } from "vue";
import { email, required, helpers, minLength, maxLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import ButtonComponent from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import { authStore } from "@/stores/Auth";
import UserForm from "../../views/User/_Form.vue";

export default {
    setup: () => ({ v$: useVuelidate() }),
    components: {
        ButtonComponent,
        InputText,
        Dialog,
        UserForm
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
            visible: ref(false)
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
.login {
    &.background {
        background-color: var(--color-primary);
    }

    .title {
        color: var(--color-primary);
    }

    .container {
        background: var(--color-white) none repeat scroll 0 0;
    }
}</style>