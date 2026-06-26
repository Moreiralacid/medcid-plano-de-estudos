# MEDCID Planner — versão instalável para celular

Esta pasta já está preparada como PWA, ou seja, um site instalável na tela inicial do celular.

## Opção 1 — Instalar como app no Android sem APK

1. Envie esta pasta para o GitHub.
2. Ative o GitHub Pages no repositório.
3. Abra o link do site no Chrome do Android.
4. Toque em **Instalar app** ou no menu **⋮ > Adicionar à tela inicial**.
5. Depois da primeira abertura, o app funciona offline para os arquivos principais.

## Opção 2 — Instalar no iPhone

1. Abra o link do site no Safari.
2. Toque no botão **Compartilhar**.
3. Escolha **Adicionar à Tela de Início**.
4. Confirme o nome **MEDCID**.

Observação: no iPhone, a instalação estilo PWA funciona melhor quando o site está hospedado em HTTPS, como GitHub Pages, Netlify ou Vercel. Abrir por arquivo local não ativa tudo.

## Opção 3 — Gerar APK Android com Capacitor

Requisitos: Node.js instalado e Android Studio instalado.

```bash
npm install
npm run cap:init
npm run cap:android
npm run cap:open:android
```

No Android Studio:

1. Aguarde o Gradle sincronizar.
2. Conecte o celular com Depuração USB ativada ou use um emulador.
3. Clique em **Run** para testar.
4. Para gerar APK: **Build > Build Bundle(s) / APK(s) > Build APK(s)**.

## Backup dos dados

O app salva seus dados no navegador/celular usando localStorage. Use o botão **Exportar** dentro do MEDCID Planner para salvar um backup em JSON antes de trocar de aparelho ou limpar cache.
