module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: [
          ['react-native-paper/babel'],
          [
            'module:react-native-dotenv',
            {
              envName: 'NODE_ENV', // Pode ser outro nome, dependendo das suas necessidades
              moduleName: '@env', // Nome do módulo que será gerado para importar as variáveis de ambiente
              path: '.env', // Caminho do arquivo .env
              blocklist: null, // Lista de variáveis a serem excluídas
              allowlist: null, // Lista de variáveis permitidas
              blacklist: null, // DEPRECATED
              whitelist: null, // DEPRECATED
              safe: false, // Modo seguro (recomendado)
              allowUndefined: true, // Permite variáveis não definidas
              verbose: false, // Exibe mensagens detalhadas
            },
          ]
        ]
      },
    },
  };
};