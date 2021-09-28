<template>
<!-- Todo el código HTML -->
<v-app id="app">
    <!-- Navegador lateral -->
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      v-if="logueado"
    >
      <v-list dense>
        <template v-if="logueado">
          <!-- Botón de home -->
          <v-list-item :to="{name: 'HelloWorld'}">
            <v-list-item-action>
              <v-icon>home</v-icon>
            </v-list-item-action>
            <v-list-item-title>
              Inicio
            </v-list-item-title>
          </v-list-item>
          <!-- Fin botón de home -->
        </template>

        <template v-if="logueado">
        <!-- Listado agrupado de Ventas -->
          <v-list-group>
            <!-- Botón Principal de Ventas -->
            <v-list-item slot="activator">
              <v-list-item-content>
                <v-list-item-title>
                  Ventas
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <!-- Fin botón principal de Ventas -->
            <!-- Ventas -->
            <v-list-item :to="{name: ''}">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Ventas
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <!-- Fin Ventas -->
            <!-- Clientes -->
            <v-list-item :to="{name: 'Clientes'}">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Clientes
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <!-- Fin Clientes -->
          </v-list-group>
        <!-- Fin listado agrupado de Ventas -->
        </template>

        <template v-if="logueado">
        <!-- Listado agrupado de Accesos -->
          <v-list-group>
            <!-- Botón principal de Accesos -->
            <v-list-item slot="activator">
              <v-list-item-content>
                <v-list-item-title>
                  Accesos
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <!-- Fin botón principal de accesos -->
            <!-- Usuarios -->
            <v-list-item :to="{name: 'Usuarios'}">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Usuarios
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <!-- Fin Usuarios -->
          </v-list-group>
        <!-- Fin listado agrupado de Accesos -->
        </template>

      </v-list>
    </v-navigation-drawer>
    <!-- Fin del navegador lateral -->

    <!-- Barra superior -->
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="orange darken-3"
      dark
    >
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-3"
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">Sistema FronTienda</span>
      </v-toolbar-title>      
      <v-spacer></v-spacer>
      <v-btn @click="salir()" icon v-if="logueado">
        <v-icon>logout</v-icon>Salir
      </v-btn>
      <v-btn icon v-else :to="{name: 'Login'}">
        <v-icon>login</v-icon>
      </v-btn>
    </v-app-bar>
    <!-- Fin barra superior -->

    <!-- Contenido -->
    <v-main>
      <v-container
        fluid
        fill-height
      >
        <v-slide-y-transition mode="out-in">
          <router-view/> <!--Contenido traido desde el router-->
        </v-slide-y-transition>
      </v-container>
    </v-main>
    <!-- Fin Contenido -->

    <!-- Footer -->
    <v-footer  height="auto">
      <v-layout justify-center>
        <v-flex text-xs-center>
          <v-card flat tile color="light-blue accent-4" class="text-center">
            <v-card-text class="white--text font-italic">
              Ingeniería en Sistemas | Ricardo Fuentes &copy; {{new Date().getFullYear()}}
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-footer>
    <!-- Fin del Footer -->

  </v-app>
</template>

<script>
//Todo el código JS
//import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    //HelloWorld,
  },

  data: () => ({
    //
    drawer: true,
  }),

  computed: {
    logueado(){
      return this.$store.state.token
    }
  },

  created(){
    this.$store.dispatch('autoLogin');
  },

  methods: {
    salir(){
      this.$store.dispatch('salir');
    },
  },
};
</script>
