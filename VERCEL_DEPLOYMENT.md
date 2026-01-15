# 🚀 Deploy na Vercel

**Status**: ✅ **DEPLOY CONCLUÍDO COM SUCESSO**

---

## 📍 URLs de Produção

### Domínio Principal
🌐 **https://ploomes-legalone-integration.vercel.app**

### Aliases
- https://ploomes-legalone-integration-leonhatoris-projects.vercel.app
- https://ploomes-legalone-integration-leonhatori-leonhatoris-projects.vercel.app

---

## 🎯 Endpoints Disponíveis

### 1. Painel Demo
**URL**: https://ploomes-legalone-integration.vercel.app/index.html

**Funcionalidades:**
- Interface completa de teste
- Workflow de 3 etapas
- Persistência de API key
- Feedback visual em tempo real
- Limpeza de dados

### 2. Health Check
**URL**: https://ploomes-legalone-integration.vercel.app/api/health

**Resposta:**
```json
{
  "status": "ok",
  "service": "Ploomes & Legal One Integration",
  "version": "0.1.0",
  "timestamp": "2026-01-15T21:34:23.538Z"
}
```

### 3. API Ploomes (Proxy)
**URL**: https://ploomes-legalone-integration.vercel.app/api/ploomes

**Método**: POST

**Headers:**
```
Content-Type: application/json
x-api-key: YOUR_PLOOMES_API_KEY (opcional, usa env var se não fornecido)
```

**Body:**
```json
{
  "action": "createContact",
  "contactData": {
    "Name": "Cliente Teste",
    "Email": "teste@exemplo.com",
    "TypeId": 2
  }
}
```

**Ações Suportadas:**
- `createContact` - Criar contato
- `getContact` - Buscar contato por ID
- `searchContacts` - Buscar contatos com filtro
- `deleteContact` - Deletar contato
- `createDeal` - Criar oportunidade
- `getDeal` - Buscar oportunidade
- `deleteDeal` - Deletar oportunidade

---

## ⚙️ Configuração

### Variáveis de Ambiente
As seguintes variáveis foram configuradas na Vercel:

| Variável | Valor | Ambiente |
|----------|-------|----------|
| `PLOOMES_API_KEY` | ✅ Configurada | Production |

### Arquitetura

```
ploomes-legalone-integration/
├── api/                      # Serverless Functions
│   ├── health.js            # Health check endpoint
│   └── ploomes.js           # Proxy da API Ploomes
├── public/                   # Static files
│   └── index.html           # Painel demo
├── vercel.json              # Configuração Vercel
└── .vercelignore            # Arquivos excluídos do deploy
```

### Recursos Vercel
- **Runtime**: Node.js (serverless)
- **Região**: Washington, D.C., USA (East) - iad1
- **Build Time**: ~10 segundos
- **Framework**: Static + Serverless Functions

---

## 🔧 Como Fazer Deploy

### 1. Via CLI (Recomendado)
```bash
# Deploy para produção
vercel --prod --yes

# Deploy para preview
vercel
```

### 2. Via GitHub (Auto-deploy)
1. Conecte o repositório no dashboard Vercel
2. Configure auto-deploy no branch `main`
3. Cada push fará deploy automático

### 3. Configurar Nova Variável
```bash
# Adicionar variável de ambiente
vercel env add VARIABLE_NAME production

# Listar variáveis
vercel env ls

# Remover variável
vercel env rm VARIABLE_NAME production
```

---

## ✅ Testes de Validação

### 1. Health Check
```bash
curl https://ploomes-legalone-integration.vercel.app/api/health
```

**Resultado Esperado:**
```json
{"status":"ok","service":"Ploomes & Legal One Integration","version":"0.1.0"}
```

### 2. Painel Demo
```bash
# Abrir no navegador
open https://ploomes-legalone-integration.vercel.app/index.html
```

**Checklist:**
- [ ] Painel carrega corretamente
- [ ] Campo de API key está visível
- [ ] Toggle de visibilidade funciona
- [ ] Persistência no localStorage funciona
- [ ] Workflow de 3 etapas carrega

### 3. API Ploomes (Com API Key no Header)
```bash
curl -X POST \
  https://ploomes-legalone-integration.vercel.app/api/ploomes \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{
    "action": "searchContacts",
    "filter": "contains(Name, '\''Teste'\'')"
  }'
```

### 4. API Ploomes (Usando Env Var)
```bash
curl -X POST \
  https://ploomes-legalone-integration.vercel.app/api/ploomes \
  -H "Content-Type: application/json" \
  -d '{
    "action": "getContact",
    "contactId": 605097657
  }'
```

---

## 🔍 Monitoramento

### Dashboard Vercel
**URL**: https://vercel.com/leonhatoris-projects/ploomes-legalone-integration

**Funcionalidades:**
- Logs em tempo real
- Métricas de performance
- Histórico de deployments
- Configuração de variáveis
- Analytics (se habilitado)

### CLI Commands
```bash
# Listar deployments
vercel ls --prod

# Ver logs do deployment atual
vercel logs https://ploomes-legalone-integration.vercel.app

# Inspecionar deployment
vercel inspect ploomes-legalone-integration.vercel.app

# Ver aliases
vercel alias ls
```

---

## 🐛 Troubleshooting

### Problema: API retorna 401
**Causa**: API key não configurada ou inválida

**Solução:**
```bash
# Verificar se variável existe
vercel env ls

# Adicionar/atualizar variável
vercel env add PLOOMES_API_KEY production

# Fazer novo deploy
vercel --prod --yes
```

### Problema: 404 Not Found
**Causa**: Rota não configurada no vercel.json

**Solução:**
1. Verificar `vercel.json` tem rewrites corretos
2. Confirmar que arquivos estão em `public/`
3. Fazer redeploy

### Problema: Build falha
**Causa**: Dependências ausentes ou erro no código

**Solução:**
```bash
# Ver logs do build
vercel inspect <deployment-url> --logs

# Testar localmente
npm install
npm test
```

### Problema: CORS Error
**Causa**: Headers CORS não configurados

**Solução:**
- Verificar `api/ploomes.js` tem headers CORS
- Adicionar `Access-Control-Allow-Origin: *`
- Fazer redeploy

---

## 📊 Métricas do Deploy

| Métrica | Valor |
|---------|-------|
| Tempo de Build | ~10s |
| Tempo de Deploy | ~15s |
| Tamanho do Build | ~356 pacotes |
| Região | iad1 (USA East) |
| Domínios | 3 aliases |
| Serverless Functions | 2 |
| Static Files | 1 HTML |

---

## 🔐 Segurança

### ✅ Implementado
- API key armazenada como variável de ambiente
- CORS configurado corretamente
- HTTPS automático via Vercel
- Headers de segurança

### ⚠️ Recomendações
- [ ] Implementar rate limiting
- [ ] Adicionar autenticação no painel
- [ ] Implementar logs de auditoria
- [ ] Configurar domínio customizado
- [ ] Habilitar Vercel Web Analytics

---

## 📝 Histórico de Deploys

| Data | Versão | Status | Mudanças |
|------|--------|--------|----------|
| 2026-01-15 | v0.1.0 | ✅ Live | Deploy inicial com serverless functions |

---

## 🎯 Próximos Passos

1. **Domínio Customizado** (Opcional)
   ```bash
   vercel domains add yourdomain.com
   ```

2. **Monitoramento**
   - Habilitar Vercel Analytics
   - Configurar alertas de erro

3. **CI/CD**
   - Conectar GitHub para auto-deploy
   - Configurar preview deployments

4. **Performance**
   - Habilitar Edge Functions (se necessário)
   - Configurar cache headers

---

## 📚 Recursos

- [Vercel Documentation](https://vercel.com/docs)
- [Serverless Functions](https://vercel.com/docs/functions)
- [Environment Variables](https://vercel.com/docs/environment-variables)
- [Custom Domains](https://vercel.com/docs/custom-domains)

---

**Deploy executado por**: Warp AI Agent  
**Data**: 15/01/2026  
**Tempo Total**: ~3 minutos  
**Status**: ✅ **PRODUÇÃO ESTÁVEL**
