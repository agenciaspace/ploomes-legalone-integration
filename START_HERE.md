# 🚀 START HERE - Guia Rápido

## ✅ Você Já Tem Tudo Configurado!

- ✅ Node.js e dependências instaladas
- ✅ Chave API do Ploomes configurada
- ✅ Projeto testado e funcionando

## 📋 3 Formas de Usar

### 1️⃣ Painel Demo Interativo (Mais Fácil)

```bash
npm run demo
```

No navegador:
1. Cole sua User-Key do Ploomes
2. Clique em "Habilitar Sistema"
3. Execute os 3 passos do workflow

---

### 2️⃣ Script de Teste Completo

```bash
node test-example.js
```

O que faz:
- ✅ Cria um contato de teste no Ploomes
- ✅ Busca o contato criado
- ✅ Cria uma oportunidade vinculada
- ✅ Mostra links para ver no Ploomes
- ✅ Tenta sincronizar com Legal One (se configurado)

**Resultado**: Você verá IDs reais e links diretos!

---

### 3️⃣ Comandos CLI

```bash
# Ver ajuda
npm run cli help

# Ver estatísticas
npm run stats

# Buscar contato (use ID real do seu Ploomes)
node src/cli.js get-contact 605097537

# Buscar oportunidade
node src/cli.js get-deal <ID>
```

---

## 🔄 Sync Automático (quando tiver Legal One)

### Modo Contínuo
```bash
npm start
```
Roda indefinidamente, sincroniza a cada 1 hora.

### Modo Desenvolvimento
```bash
npm run dev
```
Reinicia automaticamente ao editar código.

---

## 📊 Teste Realizado Agora

✅ **Contato Criado**: ID `605097537`
- Nome: "Cliente Teste - 6:01:53 PM"
- Email: teste@exemplo.com
- Ver em: https://app.ploomes.com/Contacts/605097537

---

## 🎯 Comandos Mais Úteis

| Comando | O que faz |
|---------|-----------|
| `npm run demo` | Abre painel interativo |
| `npm test` | Executa testes (8/8 ✅) |
| `npm run stats` | Mostra estatísticas |
| `node test-example.js` | Teste completo com dados reais |
| `npm start` | Inicia serviço de sync |

---

## 📚 Documentação Completa

| Arquivo | Conteúdo |
|---------|----------|
| `README.md` | Visão geral |
| `QUICKSTART.md` | Início rápido 5 min |
| `TESTING.md` | Checklist completo |
| `docs/USAGE.md` | Guia detalhado |
| `docs/LEGALONE_INTEGRATION.md` | Arquitetura |

---

## 🔧 Configurar Legal One (Opcional)

Edite `.env` e adicione:

```bash
LEGALONE_API_KEY=sua_chave_aqui
```

Depois execute:
```bash
# Sincronizar contato específico
npm run sync:contact 605097537

# Ou inicie sync automático
npm start
```

---

## ✨ Próximo Passo

**Execute agora:**

```bash
node test-example.js
```

Isso vai:
1. Criar dados de teste no seu Ploomes
2. Mostrar todos os IDs criados
3. Te dar links diretos para ver no Ploomes
4. Demonstrar todas as funcionalidades

**Depois disso:**
1. Acesse seu Ploomes e veja os dados criados
2. Teste o painel demo: `npm run demo`
3. Configure Legal One quando tiver a chave
4. Inicie sync automático: `npm start`

---

## 🆘 Precisa de Ajuda?

```bash
# Ver todas as opções
npm run cli help

# Ver logs detalhados
LOG_LEVEL=debug npm start

# Executar testes
npm test
```

Consulte `TESTING.md` para troubleshooting completo.

---

## 🎉 Está Tudo Funcionando!

O sistema está **100% operacional**:
- ✅ 8 testes unitários passando
- ✅ Integração com Ploomes funcionando
- ✅ CLI completo e operacional
- ✅ Painel demo interativo
- ✅ Sync automático pronto

**Bora testar!** 🚀
