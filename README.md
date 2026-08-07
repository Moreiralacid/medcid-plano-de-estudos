# MEDCID Planner

Plataforma estática de estudos médicos com planejamento semanal, revisões espaçadas, flashcards próprios, Projeto Angels, Pomodoro e biblioteca pessoal de prompts para uso em IAs externas.

## Abrir localmente

Basta abrir `index.html` no navegador. Os dados são salvos no próprio dispositivo por `localStorage`.

## Publicar no GitHub Pages

Este diretório já está no formato ideal para GitHub Pages: não exige build, Node.js, API paga nem variável de ambiente.

1. Envie **todo o conteúdo desta pasta para a raiz da branch `main`**.
2. No GitHub, abra **Settings → Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**.
4. Selecione **main** e **/ (root)**.
5. Salve.

O site ficará disponível no endereço padrão `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

## Biblioteca de prompts

Inclui, de fábrica:

- Ciclo MEDCID;
- Gerador de compilados;
- Módulo universal;
- Gerador de palácio da memória;
- Simulado adaptativo;
- Feynman clínico;
- Roteiro até a prova;
- Auditor de erros.

Os prompts são adaptados pelo perfil Flowing e podem ser copiados para ChatGPT, Gemini, Claude, Copilot, Perplexity ou outra IA. O usuário também pode criar, editar, excluir e salvar seus próprios prompts.

Variáveis disponíveis nos modelos pessoais:

- `{{materia}}`
- `{{assunto}}`
- `{{objetivo}}`
- `{{material}}`
- `{{perfil}}`

## Dados iniciais e personalização

O primeiro acesso contém matérias, assuntos, revisões e tarefas de demonstração do 6º período. Eles são exemplos editáveis e podem ser excluídos ou substituídos. O XP e o nível começam em zero.

## Flashcards e revisão espaçada

O aluno pode cadastrar manualmente pergunta, resposta e contexto, além de importar flashcards preparados por uma IA externa. A própria aba agenda revisões espaçadas conforme o desempenho registrado.

## Privacidade

O MEDCID não precisa de chave de API para funcionar. Dados acadêmicos e prompts pessoais ficam no navegador do usuário. Use a função de exportação/backup antes de limpar os dados do navegador ou trocar de aparelho.

## Observação médica

Conteúdo produzido por IA deve ser conferido em fontes científicas e institucionais confiáveis. A ferramenta é educacional e não substitui protocolos, supervisão clínica ou julgamento médico.
