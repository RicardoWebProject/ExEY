<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/FT.png')"
          class="my-3"
          contain
          height="350"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          ¡Bienvenido a FronTienda!
        </h1>

        <p class="subheading font-weight-regular">
          Una tienda para tí, para todos, 
          <a class="d-inline pa-2 pink darken-1 white--text">
            SIN FRONTERAS.
          </a> 
        </p>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          ¿Quiénes somos?
        </h2>
        <p>
          FronTienda es una tienda especializada en la comercialización de los productos
          más importantes y necesarios para los negocios y sus clientes.
          <br>
          Con nosotros puedes comprar todo lo que necesites en un sólo instante.
        </p>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Enlaces Importantes
        </h2>

        <v-row justify="center">
          <a
            v-for="(link, i) in importantLinks"
            :key="i"
            :href="link.href"
            class="subheading mx-3"
            target="_blank"
          >
            <v-btn color="primary">
              {{ link.text }}
            </v-btn>
          </a>
        </v-row>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Ecosistema
        </h2>

        <p>
          Este proyecto está desarrollado gracias a la implementación de VueJS 
          <v-img
            :src="require('../assets/logo.png')"
            class="my-1"
            contain
            height="40"
          ></v-img>
          <br>
          un framework escrito en JavaScript perfecto para el desarrollo de aplicaciones
          single page.
        </p>

        <v-row justify="center">
          <a
            v-for="(eco, i) in ecosystem"
            :key="i"
            :href="eco.href"
            class="subheading mx-3"
            target="_blank"
          >
            <v-btn color="success">
              {{ eco.text }}
            </v-btn>
          </a>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {

    data: () => ({
      ecosystem: [
        {
          text: 'vuetify-loader',
          href: 'https://github.com/vuetifyjs/vuetify-loader',
        },
        {
          text: 'github',
          href: 'https://github.com/vuetifyjs/vuetify',
        },
        {
          text: 'awesome-vuetify',
          href: 'https://github.com/vuetifyjs/awesome-vuetify',
        },
      ],
      importantLinks: [
        {
          text: 'Vuetify',
          href: 'https://vuetifyjs.com',
        },
        {
          text: 'Facebook',
          href: 'https://www.facebook.com/ricardo.fuentes.73307',
        },
        {
          text: 'LinkedIn',
          href: 'https://www.linkedin.com/in/ricardo-fuentes-9b0a99168',
        },
        {
          text: 'Twitter',
          href: 'https://twitter.com/vuetifyjs',
        },
      ],
    }),
  }
</script>
