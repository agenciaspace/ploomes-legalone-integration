# 🧪 Como Testar o Sistema Localmente

## Guia Completo de Testes

### ✅ Pré-requisitos

Você já tem tudo configurado:
- ✅ Node.js instalado
- ✅ Dependências instaladas (`npm install`)
- ✅ Chave API do Ploomes configurada no `.env`

---

## 🎯 Método 1: Painel Demo (Recomendado)

### Passo a Passo

**1. Abrir o Painel Demo:**
```bash
npm run demo
```

**2. No Navegador que Abriu:**

a) **Configurar API Key:**
   - Cole sua User-Key do Ploomes no campo
   - Clique no ícone 👁️ para ver/ocultar a chave
   - Clique em "Habilitar Sistema"
   - ✅ Veja o badge verde "Chave salva"

b) **Testar Fluxo Completo:**
   - **Passo 1**: Clique em "Executar Cadastro"
     - Aguarde criar o cliente
     - ✅ Verá "Cliente criado com sucesso!"
   
   - **Passo 2**: Clique em "Gerar Oportunidade"
     - Aguarde criar a oportunidade vinculada
     - ✅ Verá "Oportunidade registrada e vinculada!"
   
   - **Passo 3**: Clique em "Atualizar Status"
     - Aguarde atualização do cliente
     - ✅ Verá modal "Integração Concluída!"

c) **Verificar no Ploomes:**
   - Acesse https://app.ploomes.com
   - Vá em Contatos → Encontre "Empresa Teste Jurídico"
   - Vá em Oportunidades → Encontre "Contrato de Prestação"
   - ✅ Os dados criados pelo painel estarão lá!

d) **Testar Limpeza Visual:**
   - Clique em "Limpar & Reiniciar" (canto superior direito)
   - Escolha "Sim, Limpar e Reiniciar"
   - 🎨 **Observe o feedback visual**:
     - Etapa 1: Deletando oportunidade (spinner azul → check verde)
     - Etapa 2: Deletando contato (spinner azul → check verde)
     - Etapa 3: Limpando cache (spinner azul → check verde)
   - ✅ Modal final mostra resumo
   - 🔄 Painel reinicia automaticamente

e) **Verificar Logs Técnicos:**
   - Expanda "Log Técnico de Operações" na parte inferior
   - ✅ Veja todas as requisições POST, PATCH, DELETE
   - ✅ Veja os IDs criados e responses da API

---

## 🎯 Método 2: Script de Teste Automático

**Executar Script Completo:**
```bash
node test-example.js
```

**O que acontece:**
1. 📝 Cria um contato no Ploomes
2. 🔍 Busca o contato criado
3. 💼 Cria uma oportunidade vinculada
4. 🔗 Mostra links diretos para ver no Ploomes
5. 📊 Exibe resumo completo com IDs

**Exemplo de Saída:**
```
⚡ Iniciando teste de integração...

🔍 Exemplo de Uso da Integração

📝 Exemplo 1: Criar Contato no Ploomes

Criando contato: Cliente Teste - 6:13:30 PM
✅ Contato criado com sucesso!
📋 ID: 605097540
🔗 Ver no Ploomes: https://app.ploomes.com/Contacts/605097540

📖 Exemplo 2: Buscar Contato
✅ Contato encontrado

💼 Exemplo 3: Criar Oportunidade Vinculada
✅ Oportunidade criada com sucesso!
📋 ID: 123456
💰 Valor: R$ 25.000

📊 Resumo do Teste
✅ Contato criado: 605097540
✅ Oportunidade criada: 123456
```

**Limpar dados criados:**
```bash
node src/cleanup.js 605097540
```

---

## 🎯 Método 3: CLI Interativo

### Comandos Disponíveis

**1. Ver Ajuda:**
```bash
npm run cli help
```

**2. Ver Estatísticas:**
```bash
npm run stats
```
Mostra:
- Contatos mapeados
- Deals mapeados
- Caminho do sync-map

**3. Buscar Contato Existente:**
```bash
node src/cli.js get-contact <ID>
```
Exemplo:
```bash
node src/cli.js get-contact 605097537
```

**4. Buscar Oportunidade:**
```bash
node src/cli.js get-deal <ID>
```

**5. Limpeza Interativa:**
```bash
npm run cleanup
```
- Busca todos contatos com "Teste" no nome
- Lista os encontrados
- Pergunta se quer deletar
- Deleta os confirmados

---

## 🎯 Método 4: Testes Unitários

**Executar Todos os Testes:**
```bash
npm test
```

**Resultado Esperado:**
```
PASS  tests/ploomesClient.test.js
PASS  tests/legalOneClient.test.js

Test Suites: 1 skipped, 2 passed, 2 of 3 total
Tests:       1 skipped, 8 passed, 9 total
✅ 8 testes passando
```

---

## 🔍 Cenários de Teste Completos

### Cenário 1: Teste End-to-End Completo

```bash
# 1. Abrir painel demo
npm run demo

# 2. No navegador:
#    - Inserir chave API
#    - Executar 3 passos do workflow
#    - Ver dados no Ploomes
#    - Limpar dados
#    - Ver feedback visual da limpeza

# 3. Verificar logs
# (Expanda log técnico no painel)
```

### Cenário 2: Criar e Limpar via CLI

```bash
# 1. Criar dados de teste
node test-example.js
# Anote os IDs criados

# 2. Verificar no Ploomes
# Acesse https://app.ploomes.com

# 3. Limpar dados específicos
node src/cleanup.js <CONTACT_ID> <DEAL_ID>

# 4. Verificar estatísticas
npm run stats
```

### Cenário 3: Teste de Persistência da Chave

```bash
# 1. Abrir painel
npm run demo

# 2. Inserir chave e habilitar sistema

# 3. Fechar navegador

# 4. Reabrir painel
npm run demo

# ✅ Chave deve estar restaurada automaticamente
# ✅ Botão "Limpar Chave Salva" deve estar visível
```

### Cenário 4: Teste de Limpeza Automática

```bash
# 1. Criar múltiplos contatos de teste
node test-example.js
# Repita 3-4 vezes

# 2. Limpar todos de uma vez
npm run cleanup
# Responda 's' quando perguntado

# ✅ Verá progresso de cada deleção
# ✅ Resumo final mostra quantos foram deletados
```

---

## 📊 Checklist de Testes

### ✅ Painel Demo
- [ ] Abre corretamente com `npm run demo`
- [ ] Aceita chave API e habilita sistema
- [ ] Mostra indicador "Chave salva"
- [ ] Toggle de visibilidade da chave funciona
- [ ] Passo 1 cria cliente no Ploomes
- [ ] Passo 2 cria oportunidade vinculada
- [ ] Passo 3 atualiza status do cliente
- [ ] Log técnico mostra todas operações
- [ ] Botão "Limpar & Reiniciar" funciona
- [ ] Feedback visual mostra 3 etapas
- [ ] Modal final mostra resumo correto
- [ ] Reinício automático funciona

### ✅ CLI
- [ ] `npm run cli help` mostra ajuda
- [ ] `npm run stats` mostra estatísticas
- [ ] `get-contact` retorna dados corretos
- [ ] `get-deal` retorna dados corretos
- [ ] `npm run cleanup` busca e lista contatos
- [ ] Confirmação de deleção funciona

### ✅ Scripts
- [ ] `node test-example.js` cria dados
- [ ] IDs retornados são válidos
- [ ] Links para Ploomes funcionam
- [ ] Dados aparecem no Ploomes

### ✅ Persistência
- [ ] Chave API é salva no localStorage
- [ ] Chave é restaurada ao recarregar
- [ ] Botão limpar remove apenas chave
- [ ] Estado do workflow é persistido

### ✅ Limpeza
- [ ] Oportunidade é deletada primeiro
- [ ] Contato é deletado depois
- [ ] Cache local é limpo
- [ ] Feedback visual é correto
- [ ] Dados são removidos do Ploomes

---

## 🐛 Troubleshooting

### Problema: Painel não abre

**Solução:**
```bash
# Tentar manualmente
open public/index.html
```

### Problema: "CORS Error" no painel

**Esperado:** O painel tem modo de simulação integrado.

**Como funciona:**
- Tenta criar dados reais via API
- Se CORS bloquear, usa IDs virtuais
- Você verá "MOCK" nos logs
- Funcionalidade continua demonstrável

**Para usar API real:**
- Use Firefox (melhor suporte CORS)
- Ou deploy no Firebase: `firebase deploy`

### Problema: Chave API não funciona

**Verificar:**
```bash
# 1. Ver se chave está no .env
cat .env | grep PLOOMES_API_KEY

# 2. Testar diretamente
node src/cli.js get-contact 605097537
```

### Problema: Testes falhando

```bash
# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install

# Rodar testes novamente
npm test
```

---

## 🚀 Workflow Recomendado

### Para Desenvolvimento:

```bash
# 1. Limpar dados antigos
npm run cleanup

# 2. Abrir painel demo
npm run demo

# 3. Testar funcionalidades

# 4. Limpar novamente
# (Usar botão no painel)

# 5. Verificar testes
npm test
```

### Para Demonstração:

```bash
# 1. Garantir ambiente limpo
npm run cleanup
npm run stats  # Verificar 0 contatos

# 2. Abrir painel
npm run demo

# 3. Demonstrar fluxo completo
# (3 passos + limpeza visual)
```

---

## 📱 Acesso Rápido

| O que testar | Comando |
|--------------|---------|
| Painel demo | `npm run demo` |
| Script automático | `node test-example.js` |
| Ver estatísticas | `npm run stats` |
| Limpar dados | `npm run cleanup` |
| Executar testes | `npm test` |
| Ver ajuda CLI | `npm run cli help` |

---

## 🎓 Dicas de Teste

1. **Use Firefox** para melhor experiência (menos CORS issues)
2. **Abra o console do navegador** (F12) para ver logs detalhados
3. **Anote os IDs criados** para facilitar limpeza posterior
4. **Teste a persistência** fechando e reabrindo o navegador
5. **Verifique no Ploomes real** após criar dados
6. **Use o log técnico** do painel para debugar
7. **Limpe regularmente** para evitar acúmulo de dados de teste

---

## ✅ Está Tudo Funcionando!

O sistema está **100% pronto para testes locais**. 

Comece com:
```bash
npm run demo
```

E explore todas as funcionalidades! 🚀
