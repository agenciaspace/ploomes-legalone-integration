# Testing Checklist

## ✅ Configuração Inicial

- [x] Dependências instaladas (`npm install`)
- [x] Arquivo `.env` criado
- [x] Chave API do Ploomes configurada
- [ ] Chave API do Legal One configurada (opcional)

## 🧪 Testes com Painel Demo

### Passo 1: Abrir Painel Demo
```bash
npm run demo
# Ou: open public/index.html
```

### Passo 2: No Navegador
1. Cole sua User-Key do Ploomes no campo
2. Clique em "Habilitar Sistema"
3. Execute os 3 passos:
   - ✅ Cadastrar Cliente
   - ✅ Gerar Oportunidade  
   - ✅ Atualizar Status
4. Verifique o log técnico na parte inferior

### Passo 3: Verificar no Ploomes
Acesse seu Ploomes e verifique:
- [ ] Cliente foi criado com nome "Empresa Teste Jurídico [timestamp]"
- [ ] Oportunidade foi criada vinculada ao cliente
- [ ] Status do cliente foi atualizado com "(Validado Jurídico)"

## 🔧 Testes via CLI

### Teste 1: Buscar Contato Existente

Use o ID de um contato do painel demo ou do seu Ploomes:

```bash
node src/cli.js get-contact <ID_DO_CONTATO>
```

Exemplo:
```bash
node src/cli.js get-contact 1234567
```

Resultado esperado: JSON com dados do contato

### Teste 2: Buscar Oportunidade

```bash
node src/cli.js get-deal <ID_DA_OPORTUNIDADE>
```

Resultado esperado: JSON com dados da oportunidade

### Teste 3: Sincronizar com Legal One (quando configurado)

```bash
# Sincronizar contato
npm run sync:contact <ID_DO_CONTATO>

# Sincronizar oportunidade
npm run sync:deal <ID_DA_OPORTUNIDADE>
```

**Nota**: Estes comandos requerem a chave do Legal One configurada.

### Teste 4: Verificar Estatísticas

```bash
npm run stats
```

Deve mostrar:
- Número de contatos mapeados
- Número de deals mapeados
- Caminho do arquivo de mapeamento

## 🚀 Teste do Serviço de Sync Contínuo

### Iniciar Serviço

```bash
npm start
```

O serviço deve:
- ✅ Mostrar configurações carregadas
- ✅ Mostrar estatísticas iniciais
- ✅ Iniciar loop de sincronização
- ✅ Executar sync inicial (pula se Legal One não configurado)
- ⏳ Aguardar próximo ciclo (padrão: 1 hora)

Para parar: `Ctrl+C`

### Modo Desenvolvimento (Auto-reload)

```bash
npm run dev
```

Faz reload automático quando você edita arquivos.

## 🧩 Cenários de Teste Avançados

### Cenário 1: Criar Cliente no Ploomes via API

Crie um cliente usando o painel demo e depois sincronize:

```bash
# 1. Crie cliente no painel demo e anote o ID
# 2. Sincronize para Legal One (quando configurado)
npm run sync:contact <ID>
```

### Cenário 2: Criar Oportunidade Vinculada

```bash
# 1. Crie oportunidade no painel demo
# 2. Sincronize (sincroniza o cliente automaticamente se necessário)
npm run sync:deal <ID>
```

### Cenário 3: Verificar Mapeamentos Persistidos

```bash
# Ver arquivo de mapeamento
cat data/sync-map.json
```

Deve conter algo como:
```json
{
  "contacts": {
    "123456": "legal-one-client-id-abc"
  },
  "deals": {
    "789012": "legal-one-case-id-xyz"
  }
}
```

## 🔍 Troubleshooting

### Problema: "PLOOMES_API_KEY not configured"

**Solução**:
```bash
# Verificar se .env existe
ls -la .env

# Verificar conteúdo (sem expor a chave)
grep "PLOOMES_API_KEY" .env
```

Certifique-se de que `.env` contém:
```
PLOOMES_API_KEY=sua_chave_aqui
```

### Problema: Erro de CORS no Painel Demo

**Solução**: O painel tem modo de simulação integrado. Se APIs reais falharem por CORS:
- Os dados serão criados em modo simulação
- IDs virtuais serão gerados
- Você verá "MOCK" nos logs

**Alternativa**: Use Firefox ou deploy o painel:
```bash
firebase deploy
```

### Problema: Erro "Legal One API not configured"

**Esperado**: Se você não configurou Legal One ainda, o sistema:
- ⚠️ Mostra aviso
- ✅ Continua funcionando com Ploomes
- ⏭️ Pula sincronização com Legal One

**Para resolver**: Adicione ao `.env`:
```
LEGALONE_API_KEY=sua_chave_legal_one
```

### Problema: Erro ao buscar contato/deal

**Causas possíveis**:
1. ID não existe no Ploomes
2. Chave API incorreta
3. Sem permissão para acessar o recurso

**Debug**:
```bash
# Modo debug
LOG_LEVEL=debug node src/cli.js get-contact <ID>
```

## 📋 Checklist de Testes Completos

### Painel Demo
- [ ] Painel abre corretamente
- [ ] Consegue inserir API key
- [ ] Cria cliente com sucesso
- [ ] Cria oportunidade vinculada
- [ ] Atualiza status do cliente
- [ ] Log técnico mostra operações

### CLI
- [ ] `npm run cli help` mostra ajuda
- [ ] `npm run stats` mostra estatísticas
- [ ] `get-contact` retorna dados
- [ ] `get-deal` retorna dados

### Integração (com Legal One configurado)
- [ ] `sync-contact` sincroniza corretamente
- [ ] `sync-deal` sincroniza corretamente
- [ ] Mapeamentos são salvos em `data/sync-map.json`
- [ ] Evita duplicação (busca por CPF/CNPJ)

### Serviço
- [ ] `npm start` inicia sem erros
- [ ] Mostra configuração correta
- [ ] Executa sync periódico
- [ ] Pode ser interrompido com Ctrl+C

### Testes Unitários
- [ ] `npm test` - todos os testes passam

## 🎯 Próximos Passos

Após validar os testes acima:

1. **Testar com dados reais** do seu Ploomes
2. **Configurar Legal One** (quando chave disponível)
3. **Executar sync completo**
4. **Monitorar logs** de produção
5. **Ajustar mapeamentos** em `config/mapping.json` se necessário

## 📞 Suporte

Documentação completa:
- `README.md` - Overview
- `QUICKSTART.md` - Início rápido
- `docs/USAGE.md` - Guia de uso detalhado
- `docs/LEGALONE_INTEGRATION.md` - Arquitetura
