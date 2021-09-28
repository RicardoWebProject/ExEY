<template>
    <!-- Etiqueta para centrar el contenido del formulario -->
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6 lg5 xl4>
            <v-form>
                <v-card>
                    <v-toolbar color="blue-grey">
                        <v-toolbar-title class="white--text">
                            Ingresa al Sistema
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <!-- Campo de Nombre de Usuario -->
                        <v-text-field
                            v-model="email"
                            autofocus
                            color="accent"
                            label="Email de Usuario"
                            required
                        ></v-text-field>
                        <!-- Fin Campo de Nombre de Usuario -->
                        <!-- Campo Password -->
                        <v-text-field
                            v-model="password"
                            type="password"
                            color="accent"
                            label="Contraseña"
                            required
                        ></v-text-field>
                        <!-- Fin Campo Password -->
                        <v-flex class="red--text" v-if="errorM">
                            {{errorM}}
                        </v-flex>
                    </v-card-text>
                    <v-card-actions class="px-3 pb-3">
                        <v-flex text-xs-right>
                            <v-btn @click="ingresar()" color="light-green lighten-1">Ingresar</v-btn>
                        </v-flex>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-flex>
    </v-layout>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            password: '',
            errorM: null
        }
    },
    methods: {
        ingresar(){
            axios.post('usuario/login', {
                email: this.email,
                password: this.password
            })
            .then((response) => {
                return response.data;
            })
            .then((data) => {
                this.$store.dispatch('guardarToken', data.tokenReturn);
                this.$router.push({name: 'HelloWorld'});
            })
            .catch((error) => {
                //console.log(error);
                this.errorM = null;
                if(error.response.status == 404){
                    this.errorM = 'No existe el usuario o las credenciales son incorrectas';
                } else {
                    this.errorM = 'Ocurrió un error con el servidor';
                }
            })
        }
    }
}
</script>