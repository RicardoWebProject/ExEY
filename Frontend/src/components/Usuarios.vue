<template>
<v-layout align-start>
    <v-flex>
        <v-data-table :headers="headers" :items="usuarios" :search="search" class="elevation-1">
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Usuarios</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field
                        class="text-xs-center"
                        v-model="search"
                        append-icon="search"
                        label="Búsqueda"
                        single-line
                        hide-details
                    ></v-text-field>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Nuevo Usuario</v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="nombre" label="Nombre del Usuario"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="rol" label="Rol del Usuario"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="email" label="Correo electrónico"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="password" type="password" label="Contraseña"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="12" md="12">
                                            <div class="red--text" v-for="v in validaMensaje" :key="v" v-text="v">
                                            </div>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                                <v-btn color="blue darken-1" text @click="guardar">Guardar</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog
                        v-model="adModal"
                        max-width="290px"
                        transition="dialog-transition"
                    >
                        <v-card>
                            <v-card-title primary-title class="headline" v-if="adAccion == 1">
                                Activar Usuario
                            </v-card-title>
                            <v-card-title primary-title class="headline" v-if="adAccion == 2">
                                Desactivar Usuario
                            </v-card-title>
                            <v-card-text>
                                Estás a punto de 
                                <span v-if="adAccion == 1"> ACTIVAR</span>
                                <span v-if="adAccion == 2"> DESACTIVAR</span> al usuario: {{adNombre}}
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn @click="activarDesactivarCerrar()" color="orange darken-4" >Cancelar</v-btn>
                                <v-btn v-if="adAccion == 1" @click="activar()" color="green darken-1" >Activar</v-btn>
                                <v-btn v-if="adAccion == 2" @click="desactivar()" color="red" >Desactivar</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <v-data-table
                :headers="headers"
                :items="usuarios"
                :search="search"
                class="elevation-1"
            >
                <template v-slot:items="props">
                <td class="justify-center layout px-0">
                    <v-icon
                    small
                    class="mr-2"
                    @click="editItem(props.item)"
                    >
                    edit
                    </v-icon>
                    <template v-if="props.item.estado">
                        <v-icon
                        small
                        @click="activarDesactivarMostrar(2,props.item)"
                        >
                        block
                        </v-icon>
                    </template>
                    <template v-else>
                        <v-icon
                        small
                        @click="activarDesactivarMostrar(1,props.item)"
                        >
                        check
                        </v-icon>
                    </template>
                </td>
                <td>{{ props.item.nombre }}</td>
                <td>{{ props.item.rol }}</td>
                <td>{{ props.item.email }}</td>
                <td>
                    <div v-if="props.item.estado">
                        <span class="blue--text">Activo</span>
                    </div>
                    <div v-else>
                        <span class="red--text">Inactivo</span>
                    </div>
                </td>                
                </template>
                <template v-slot:no-data>
                <v-btn color="primary" @click="listar()">Resetear</v-btn>
                </template>
            </v-data-table>
        </v-data-table>
    </v-flex>
</v-layout>
</template>

<script>
import axios from 'axios'

export default {
    data: () => ({
        dialog: false,
        search: '',
        usuarios: [],
        headers: [
            { text: 'No.', value: '_id', sortable: true },
            { text: 'Nombre', value: 'nombre', sortable: true },
            { text: 'Rol', value: 'rol', sortable: true },
            { text: 'Email', value: 'email', sortable: false },
            { text: 'Estado', value: 'estado', sortable: false  },
            { text: 'Opciones', value: 'estado', sortable: false },
        ],
        editedIndex: -1,
        _id:'',
        nombre:'',
        rol:'',
        roles: ['Administrador','Almacenero','Vendedor'],
        email: '',
        password:'',
        valida:0,
        validaMensaje:[],
        adModal:0,
        adAccion:0,
        adNombre:'',
        adId:''
    }),
    computed: {
    formTitle () {
            return this.editedIndex === -1 ? 'Nuevo registro' : 'Editar registro'
        },
    },

    watch: {
        dialog (val) {
            val || this.close()
        },
    },

    created () {
        this.listar()
    },

    methods: {
        listar() {
            let me=this;
                let header = {"token" : this.$store.state.token};
                let configuracion = {headers : header};            
                axios.get('usuario/list', configuracion).then(function (response){
                    me.usuarios = response.data;
                }).catch(function(error){
                    console.log(error);
                });
        },

        editItem (item) {
            this._id=item._id;
            this.rol=item.rol;
            this.nombre=item.nombre;
            this.email=item.email;
            this.password=item.password;
            this.dialog = true;
            this.editedIndex=1;
        },

        activarDesactivarMostrar(accion, item){
            this.adModal = 1;
            this.adNombre = item.nombre;
            this.adId = item._id;
            if (accion == 1) {
                this.adAccion = 1;
            } else if (accion == 2) {
                this.adAccion = 2;
            } else {
                this.adModal = 0;
            }
        },

        activarDesactivarCerrar(){
            this.adModal = 0;
        },

        activar(){
            let me = this;
            let header = {"Token" : this.$store.state.token};
            let configuracion = {headers : header};
            axios.put('usuario/activate',{'_id': this.adId}, configuracion)
            .then((response) => {
                console.log(response);
                me.adModal = 0;
                me.adAccion = 0;
                me.adNombre = '';
                me.adId = ''
                me.listar();
            })
            .catch((error) => {
                console.log(error);
            });
        },
        
        desactivar(){
            let cat = this;
            let header = {"Token" : this.$store.state.token};
            let configuracion = {headers : header};
            axios.put('usuario/deactivate',{'_id': this.adId}, configuracion)
            .then((response) => {
                console.log(response);
                cat.adModal = 0;
                cat.adAccion = 0;
                cat.adNombre = '';
                cat.adId = ''
                cat.listar();
            })
            .catch((error) => {
                console.log(error);
            });
        },

        close () {
            this.dialog = false;
        },

        limpiar(){
            this._id='';
            this.nombre='';
            this.email='';
            this.password='';
            this.valida=0;
            this.validaMensaje=[];
            this.editedIndex=-1;
        },

        validar(){
            this.valida = 0;
            this.validaMensaje = [];
            if (this.nombre.length < 1 || this.nombre.length > 50) {
                this.validaMensaje.push('El nombre del usuario debe tener entre 1 a 50 caracteres.');
            }
            if (this.email.length < 1 || this.email.length >50) {
                this.validaMensaje.push('El email del usuario debe tener entre 1 y 50 caracteres.');
            }
            if(this.email){
                let correoValido = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(this.email.value)
                if(!correoValido){
                    this.validaMensaje.push('Debe ingresar un email válido.');
                }
                return console.log(correoValido);
            }
            if (!this.password) {
                this.validaMensaje.push('Ingrese una contraseña.');
            }
            if (this.validaMensaje.length) {
                this.valida = 1;
            }
            return this.valida;
        },

        guardar () {
            let cat = this;
            let header = {"token" : this.$store.state.token};
            let configuracion= {headers : header};

            if (this.validar()) {
                return;
            }

            if (this.editedIndex > -1) {
                //Código para editar datos del registro
                axios.patch('usuario/update',{
                    'rol':this.rol,
                    'nombre':this.nombre,
                    'email':this.email,
                    'password':this.password
                    },configuracion)
                .then((response) => {
                    console.log(response);
                    cat.limpiar();
                    cat.close();
                    cat.listar();
                })
                .catch((error) => {
                    console.log(error);
                });
            } else {
                //Código para guardar un nuevo registro
                axios.post('usuario/add',
                    {
                        'rol':this.rol,
                        'nombre':this.nombre,
                        'email':this.email,
                        'password':this.password
                    },configuracion)
                    .then(function(response){
                        console.log(response);
                        cat.limpiar();
                        cat.close();
                        cat.listar();
                    })
                    .catch(function(error){
                        console.log(error);
                    });
            }
            
        },
    },
}
</script>