# Desafio Meetup: Projeto Mobile

# Projeto criado no Windows
# Esta aplicação foi testada apenas no ANDROID

# Configurações da aplicação

1 - Na pasta "src", pasta "services", arquivo "api.js". Na linha 4, alterar "baseURL" para a URL do servidor backend.
Por padrão, a variável está confugurada como "http://localhost:3000/", que é a URL padrão do servidor no backend.

2 - Durante o desenvolvimento da aplicação em meu computador, realizei o debug através do meu celular Android. Não utilizei um emulador.
Para isso, foi necessário configurar na aplicação o caminho para a pasta de instalação do Java JDK em meu computador.
Caso seja necessário este procedimento em seu computador, ir na pasta "android", arquivo "gradle.properties" e adicionar:
"org.gradle.java.home=CAMINHO_DO_JAVA_JDK"

3 - Como utilizei meu celular Android para debugar a aplicação, foi necessário executar os seguintes comandos no cmd do Windows:

a) adb devices // Para comunicação com o celular

b) adb reverse tcp:3000 tcp:3000 // Para comunicação com o servidor configurado no backend. Sendo 3000 a porta padrão da aplicação backend.
// Caso tenha configurado outra porta para o backend, alterar o comando para a nova porta.

# Executar a aplicação

Para executar a aplicação, basta executar: react-native run-android

# Usuários configurados disponíveis para navegação no App

email: user01@meetup.com
senha: 123456

email: user02@meetup.com
senha: 123456
