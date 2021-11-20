<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-card
        class="d-flex justify-center my-10 card-gradient"
        :loading="loading"
        max-width="450"
      >
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
        <v-col class="text-center">
          <v-alert
      v-if="alertHolder"
      color="#ff3c40"
      dark
      icon="mdi-alert-octagon"
      border="left"
      prominent
      dismissible
      >
        Buy some PAT to play!
      </v-alert>
      <v-alert
      v-if="alert"
      color="#ff3c40"
      dark
      icon="mdi-alert-octagon"
      border="left"
      prominent
      dismissible
      >
        Connect To Binance Smart Chain!
      </v-alert>
          <v-img height="250" contain src="../assets/Logo.png"></v-img>
          <v-card-title class="justify-center">PAT Authenticator</v-card-title>
          <v-divider class="mx-4"></v-divider>
          <v-card-title class="justify-center"
            >To join you must be a PAT holder</v-card-title
          >
          
          <v-card-text v-if="holder"><a :href="link">{{url}}</a></v-card-text>
          <v-progress-circular
          v-if="loading"
            indeterminate
            color="primary"
          ></v-progress-circular>
          <v-card-text>
            <v-btn v-if="!connected" @click="connect">Connect Wallet</v-btn>
            <v-btn v-if="connected" @click="getBal">Check Balance</v-btn>
          </v-card-text>
        </v-col>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import {
  init,
  balance,
} from "@/services/connection"
export default {
  data: () => ({
    loading: false,
    connected: false,
    bal: 0,
    url:'',
    link:'',
    holder: false,
    alertHolder: false,
    alert:false,
    chain:"",
  }),

methods: {
    async connect() {
      this.chain = await init();
      if(this.chain != "56"){
        this.alert = true;
      } else {
        this.alert = false;
        this.connected = true;
      }
    },
    async getBal(){
      if(this.connected){
        this.bal = await balance();
        this.getUrl();
        if(this.bal > 0) {
          this.holder = true;
        } else {this.alertHolder = true;}
      }
    },
    async getUrl(){
      this.loading = true;
      let res = await this.axios({
        method: "get",
        url: "https://patcordinvite.herokuapp.com/",
      });
      this.url = res.data;
      if (this.url === 'Server is closed') {
        this.link = 'https://patcoin.io'
      } else {
        this.link = this.url;
      }
      this.loading = false;
  },
    }
    
};
</script>
