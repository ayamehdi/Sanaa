module.exports = {
  transpileDependencies: [
    'bootstrap',
  ],
  devServer: {
    host: '0.0.0.0',      // accepte toutes les adresses IP
    port: 8080,
    allowedHosts: 'all',  // autorise l'accès depuis d'autres appareils du réseau
    client: {
      webSocketURL: 'ws://192.168.0.185:8080/ws' // met ton IP ici si nécessaire
    }
  }
};
