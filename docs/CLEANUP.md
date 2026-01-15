# Guia de Limpeza de Dados

## 🧹 Funcionalidade de Limpeza

O projeto possui **2 formas** de limpar dados de teste do Ploomes:

1. **Painel Demo** - Botão "Limpar & Reiniciar"
2. **Ferramenta CLI** - Script de limpeza automática

---

## 1️⃣ Limpeza via Painel Demo

### Como Usar

1. Abra o painel demo:
   ```bash
   npm run demo
   ```

2. Clique no botão **"Limpar & Reiniciar"** (canto superior direito)

3. Escolha uma das opções:
   - ✅ **"Sim, Limpar e Reiniciar"** - Deleta dados do Ploomes + limpa cache
   - 🔄 **"Apenas Reiniciar"** - Só limpa o cache local (mantém dados no Ploomes)
   - ❌ **"Cancelar"** - Não faz nada

### O Que É Deletado

Quando você escolhe "Sim, Limpar e Reiniciar", o sistema:

✅ Deleta a **Oportunidade** (Deal) do Ploomes  
✅ Deleta o **Contato** do Ploomes  
✅ Limpa o cache local (localStorage)  
✅ Recarrega a página

### Feedback Visual

Você verá:
- 🔄 Modal "Limpando Base..."
- ✅ Confirmação de cada item deletado
- 📊 Resumo final mostrando o que foi removido
- 🔄 Reinício automático do painel

---

## 2️⃣ Limpeza via CLI

A ferramenta CLI oferece **3 modos** de operação:

### Modo 1: Interativo (Busca Automática)

Busca todos os contatos de teste e permite deletar de uma vez:

```bash
npm run cleanup
```

**O que faz:**
1. 🔍 Busca contatos com "Teste" no nome
2. 📋 Lista todos encontrados (até 20)
3. ❓ Pergunta se quer deletar todos
4. 🗑️ Deleta os confirmados
5. 📊 Mostra resumo

**Exemplo de saída:**
```
🔍 Buscando contatos de teste...

📋 Encontrados 4 contatos de teste:

  1. ID: 605097536 - Cliente Teste - 6:01:45 PM (Criado: 15/01/2026, 18:01:47)
  2. ID: 605097537 - Cliente Teste - 6:01:53 PM (Criado: 15/01/2026, 18:01:53)
  3. ID: 605097538 - Empresa Teste Jurídico [6:01:27 PM] (Criado: 15/01/2026, 18:01:27)
  4. ID: 605097539 - Cliente Teste - 6:03:24 PM (Criado: 15/01/2026, 18:03:24)

❓ Deseja deletar TODOS estes contatos de teste? (s/N):
```

### Modo 2: Deletar Contato Específico

```bash
node src/cleanup.js <CONTACT_ID>
```

**Exemplo:**
```bash
node src/cleanup.js 605097537
```

### Modo 3: Deletar Contato + Oportunidade

```bash
node src/cleanup.js <CONTACT_ID> <DEAL_ID>
```

**Exemplo:**
```bash
node src/cleanup.js 605097537 12345
```

**Nota:** Oportunidade é deletada PRIMEIRO para evitar conflitos de chave estrangeira.

---

## 🔐 Segurança

### Painel Demo
- ✅ Só deleta dados que você criou na sessão atual
- ✅ IDs são armazenados no localStorage do navegador
- ✅ Confirmação obrigatória antes de deletar

### CLI Interativo
- ✅ Busca apenas contatos com "Teste" no nome
- ✅ Mostra lista completa antes de deletar
- ✅ Confirmação explícita necessária (s/N)
- ✅ Delay entre deleções para não sobrecarregar API

### CLI Específico
- ⚠️ Deleta IDs fornecidos sem confirmação
- ⚠️ Use com cuidado - ação irreversível

---

## 📊 Exemplos de Uso

### Limpar Tudo Após Testes

```bash
# 1. Buscar e deletar todos contatos de teste
npm run cleanup
# Responda 's' quando perguntado

# 2. Verificar se limpou
npm run stats
# Deve mostrar 0 contatos mapeados
```

### Limpar Contato Específico do Script de Exemplo

```bash
# Se você rodou test-example.js e anotou o ID
node src/cleanup.js 605097537
```

### Limpar Via Painel

```bash
# 1. Abrir painel
npm run demo

# 2. Criar dados de teste (passos 1, 2, 3)

# 3. Clicar em "Limpar & Reiniciar"

# 4. Escolher "Sim, Limpar e Reiniciar"
```

---

## 🆘 Troubleshooting

### Erro: "PLOOMES_API_KEY não configurada"

**Solução:** Configure a chave no `.env`

```bash
echo "PLOOMES_API_KEY=sua_chave" >> .env
```

### Erro: "Erro ao deletar: 404 Not Found"

**Causa:** ID não existe ou já foi deletado

**Solução:** Verifique se o ID está correto:
```bash
node src/cli.js get-contact <ID>
```

### Erro: "Erro ao deletar: 403 Forbidden"

**Causa:** Sem permissão para deletar

**Solução:** 
- Verifique se a API key tem permissões de escrita
- Verifique se você é o dono do contato

### Contatos Não Aparecem no Modo Interativo

**Causa:** Nenhum contato tem "Teste" no nome

**Solução:** Use o modo específico:
```bash
node src/cleanup.js <ID_DO_CONTATO>
```

---

## 💡 Boas Práticas

### Durante Desenvolvimento

```bash
# Antes de criar novos testes
npm run cleanup  # Limpar dados antigos

# Criar dados de teste
node test-example.js

# Após testes
npm run cleanup  # Limpar novamente
```

### Antes de Demonstração

```bash
# Garantir base limpa
npm run cleanup

# Confirmar limpeza
npm run stats
```

### Em Produção

⚠️ **CUIDADO:** Não use a ferramenta de limpeza em produção!

A busca por "Teste" pode pegar contatos reais se tiverem essa palavra.

Para produção, use sempre IDs específicos:
```bash
node src/cleanup.js <ID_ESPECÍFICO>
```

---

## 🔍 Logs e Auditoria

### Painel Demo

Logs aparecem na seção "Log Técnico" (parte inferior):

```
[18:01:47] DELETE: /Deals(12345)
[18:01:47] SUCCESS: Oportunidade ID 12345 excluída com sucesso
[18:01:48] DELETE: /Contacts(605097537)
[18:01:48] SUCCESS: Contato ID 605097537 excluído com sucesso
```

### CLI

Saída no terminal:

```
🗑️  Deletando oportunidade 12345...
✅ Oportunidade deletada com sucesso!

🗑️  Deletando contato 605097537...
✅ Contato deletado com sucesso!

═══════════════════════════════════════════════════════════
✅ Limpeza concluída!
```

---

## 📚 Comandos de Referência Rápida

| Ação | Comando |
|------|---------|
| Abrir painel demo | `npm run demo` |
| Limpeza interativa | `npm run cleanup` |
| Deletar contato específico | `node src/cleanup.js <ID>` |
| Deletar contato + deal | `node src/cleanup.js <ID> <DEAL_ID>` |
| Ver ajuda | `node src/cleanup.js --help` |
| Buscar contato | `node src/cli.js get-contact <ID>` |

---

## ✅ Resumo

✅ **Painel Demo**: Deleta dados criados na sessão (automático)  
✅ **CLI Interativo**: Busca e deleta todos contatos de teste  
✅ **CLI Específico**: Deleta IDs fornecidos  
✅ **Seguro**: Confirmações e feedbacks claros  
✅ **Flexível**: Múltiplas formas de uso  

**A limpeza de dados está totalmente funcional e segura!** 🎉
